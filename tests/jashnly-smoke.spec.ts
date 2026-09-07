import { expect, test } from "@playwright/test";
import { createQrCodeSvg } from "@/lib/qr-code";
import { getEventUrl } from "@/lib/event-url";

const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1366, height: 768 },
];

test.describe("Occazn Wedding MVP", () => {
  test("production invitation and QR target are canonical", async () => {
    const url = getEventUrl("verified-wedding");
    expect(url).toBe("https://occazn.com/i/verified-wedding");
    const encoded = await createQrCodeSvg(url);
    expect(encoded).toBe(await createQrCodeSvg("https://occazn.com/i/verified-wedding"));
    expect(encoded).not.toBe(await createQrCodeSvg("http://localhost:3000/i/verified-wedding"));
  });

  test("homepage and categories stay usable across release viewports", async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await expect(page.getByRole("heading", { name: "One link for every special occasion" })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

      await page.goto("/categories?type=birthday");
      await expect(page.getByRole("heading", { name: "What are you planning?" })).toBeVisible();
      await expect(page.getByText("Coming Soon", { exact: true }).first()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    }
  });

  test("creates, publishes, reloads and RSVPs to a Wedding invitation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.goto("/create-event");

    await page.getByRole("button", { name: "Wedding", exact: true }).click();
    const continueButton = page.getByRole("button", { name: "Continue", exact: true });
    await expect(continueButton).toBeEnabled();
    await continueButton.click();
    await expect(page.getByRole("heading", { name: "Choose Your Wedding Template" })).toBeVisible();

    const royalTemplate = page.locator("article").filter({ hasText: "Classic Royal Wedding" });
    await royalTemplate.getByRole("button", { name: "Select", exact: true }).click();
    await continueButton.click();

    await page.getByLabel("Partner 1 name").fill("Christopher Alexander");
    await page.getByLabel("Partner 2 name").fill("Noor Al Huda");
    await page.getByLabel("Event date").fill("2027-12-24");
    await page.getByLabel("Event time").fill("18:30");
    await page.getByLabel("Venue name").fill("The Grand Ballroom at Emirates Palace");
    await page.getByLabel("Location link").fill("https://maps.google.com/?q=Emirates+Palace");
    await continueButton.click();

    await page.getByRole("button", { name: "Skip for now" }).click();
    await page.getByRole("button", { name: "Create My Invite" }).click();
    await page.waitForURL(/\/event\/[^/]+\/share$/);

    const slug = page.url().match(/\/event\/([^/]+)\/share$/)?.[1];
    expect(slug).toBeTruthy();
    await expect(page.getByRole("heading", { name: "Event QR Code" })).toBeVisible();
    const published = await page.evaluate(() => JSON.parse(localStorage.getItem("jashnly_published_events") || "[]")[0]);
    expect(published.publicUrl).toMatch(new RegExp(`/i/${slug}$`));
    expect(published.qrCodeData).toBe(await createQrCodeSvg(published.publicUrl));

    await page.goto(`/i/${slug}`);
    await expect(page.getByText("Christopher Alexander", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Noor Al Huda", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("The Grand Ballroom at Emirates Palace", { exact: false }).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

    await page.reload();
    await expect(page.getByText("Christopher Alexander", { exact: false }).first()).toBeVisible();
    await page.getByLabel("Your name").fill("Maya Guest");
    await page.getByLabel("Number of guests").fill("3");
    await page.getByLabel("Message (optional)").fill("So excited to celebrate with you!");
    await page.getByRole("button", { name: "Joyfully Accept" }).click();
    await expect(page.getByRole("status")).toContainText("Thank you for your response");
    expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || "[]").length, `occazn_rsvps_${slug}`)).toBe(1);
    expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || "[]")[0], `occazn_rsvps_${slug}`)).toMatchObject({ guestName: "Maya Guest", attendance: "attending", guestCount: 3, message: "So excited to celebrate with you!" });
  });

  test("organizer dashboard and RSVP management use real stored responses", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem("jashnly_published_events", JSON.stringify([{
        eventType: "wedding", title: "Dashboard QA Wedding", primaryName: "Amina", secondaryName: "Yusuf",
        date: "2027-12-24", time: "18:30", venueName: "Garden Hall", address: "", city: "Dubai", mapLink: "", youtubeLink: "", gallery: [],
        rsvpEnabled: true, familyContactsEnabled: false, qrEnabled: true, schedule: [], contacts: [], templateId: "floral-wedding-elegance",
        templateName: "Floral Luxury Wedding", theme: "blush", openingAnimation: "none", music: { enabled: false, trackId: "", url: "" },
        status: "published", slug: "dashboard-qa", publicUrl: `${location.origin}/i/dashboard-qa`, qrCodeData: ""
      }]));
      localStorage.setItem("occazn_rsvps_dashboard-qa", JSON.stringify([
        { guestName: "Attending Guest", attendance: "attending", guestCount: 3, message: "Can't wait!" },
        { guestName: "Declining Guest", attendance: "declined", guestCount: 1, message: "Sending love." }
      ]));
    });
    await page.goto("/register");
    await page.getByLabel("Name").fill("Dashboard QA Organizer");
    await page.getByLabel("Email").fill("dashboard-qa@occazn.test");
    await page.getByLabel("Password", { exact: true }).fill("dashboard-password");
    await page.getByLabel("Confirm password").fill("dashboard-password");
    await page.getByRole("button", { name: "Create account" }).click();
    await page.waitForURL(/\/dashboard$/);
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: "Your Invitations" })).toBeVisible();
    await expect(page.getByText("2 responses")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.getByRole("link", { name: "Manage RSVPs" }).click();
    await expect(page.getByText("Total Responses").locator("..")).toContainText("2");
    await expect(page.getByText("Expected Guests").locator("..")).toContainText("3");
    await expect(page.getByText("Attending Guest")).toBeVisible();
    await expect(page.getByText("Can't wait!")).toBeVisible();
    await page.getByRole("button", { name: "Not Attending" }).click();
    await expect(page.getByText("Declining Guest")).toBeVisible();
    await expect(page.getByText("Attending Guest")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });

  test("published invitation edits preserve the slug and public URL", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.evaluate(() => {
      const id = "edit-qa";
      localStorage.clear();
      localStorage.setItem("jashnly_demo_user", JSON.stringify({ id, name: "Edit QA", email: "edit@occazn.test", createdAt: new Date().toISOString() }));
      localStorage.setItem("jashnly_demo_session", id);
      localStorage.setItem("jashnly_published_events", JSON.stringify([{
        eventType: "wedding", title: "Stable URL Wedding", primaryName: "Sara", secondaryName: "Ibrahim", date: "2027-12-24", time: "18:30",
        venueName: "Original Venue", address: "", city: "Dubai", mapLink: "", youtubeLink: "", gallery: [], rsvpEnabled: true,
        familyContactsEnabled: false, qrEnabled: true, schedule: [], contacts: [], templateId: "minimal-editorial-wedding", templateName: "Minimal Elegant Wedding",
        theme: "blush", openingAnimation: "none", music: { enabled: false, trackId: "", url: "" }, status: "published", slug: "stable-url-wedding",
        publicUrl: "https://occazn.com/i/stable-url-wedding", qrCodeData: "stable-qr"
      }]));
    });
    await page.goto("/create-event?edit=stable-url-wedding");
    await expect(page.getByLabel("Venue name")).toHaveValue("Original Venue");
    await page.getByLabel("Venue name").fill("Updated Garden Venue");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.getByRole("button", { name: "Skip for now" }).click();
    await page.getByRole("button", { name: "Save Invitation" }).click();
    await page.waitForURL(/\/dashboard\/stable-url-wedding$/);
    const edited = await page.evaluate(() => JSON.parse(localStorage.getItem("jashnly_published_events") || "[]")[0]);
    expect(edited.slug).toBe("stable-url-wedding");
    expect(edited.publicUrl).toBe("https://occazn.com/i/stable-url-wedding");
    expect(edited.qrCodeData).toBe("stable-qr");
    expect(edited.venueName).toBe("Updated Garden Venue");
  });

  test("countdown ticks without reload and expired events never go negative", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const future = new Date(Date.now() + 65_000);
    const date = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, "0")}-${String(future.getDate()).padStart(2, "0")}`;
    const time = `${String(future.getHours()).padStart(2, "0")}:${String(future.getMinutes()).padStart(2, "0")}:${String(future.getSeconds()).padStart(2, "0")}`;
    await page.goto("/");
    await page.evaluate(({ date, time }) => {
      localStorage.setItem("jashnly_published_events", JSON.stringify([{
        eventType: "wedding", title: "Countdown Test Wedding", primaryName: "Mohammed Abdul Rahman", secondaryName: "Fathima Zahra",
        date, time, venueName: "Grand Ballroom", address: "Downtown Dubai", city: "Dubai", mapLink: "", youtubeLink: "", gallery: [],
        rsvpEnabled: true, familyContactsEnabled: false, qrEnabled: true, schedule: [], contacts: [], templateId: "minimal-editorial-wedding",
        templateName: "Minimal Elegant Wedding", theme: "blush", openingAnimation: "none", music: { enabled: false, trackId: "", url: "" },
        status: "published", slug: "countdown-test", publicUrl: `${location.origin}/i/countdown-test`, qrCodeData: ""
      }]));
      sessionStorage.setItem("jashnly_intro_seen_countdown-test", "true");
    }, { date, time });
    await page.goto("/i/countdown-test");
    const seconds = page.getByText("Seconds").locator("..").locator("b");
    const before = await seconds.innerText();
    await page.waitForTimeout(1_200);
    const after = await seconds.innerText();
    expect(after).not.toBe(before);

    await page.evaluate(() => {
      const events = JSON.parse(localStorage.getItem("jashnly_published_events") || "[]");
      events[0].date = "2020-01-01";
      events[0].time = "12:00";
      localStorage.setItem("jashnly_published_events", JSON.stringify(events));
    });
    await page.reload();
    await expect(page.getByText("The celebration has begun")).toBeVisible();
    await expect(page.getByText(/-\d/)).toHaveCount(0);
    await page.goto("/");
    await expect(page.getByText("Countdown to celebration")).toHaveCount(0);
  });

  test("anonymous Wedding draft survives the authentication handoff", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/create-event");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByRole("button", { name: "Wedding", exact: true }).click();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.locator("article").filter({ hasText: "Classic Royal Wedding" }).getByRole("button", { name: "Select", exact: true }).click();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.getByLabel("Partner 1 name").fill("Mohammed Abdul Rahman");
    await page.getByLabel("Partner 2 name").fill("Fathima Zahra");
    await page.getByLabel("Venue name").fill("Grand Ballroom, Address Sky View");
    await page.waitForTimeout(700);
    await page.goto("/login?next=%2Fcreate-event");
    await page.getByRole("button", { name: "Continue with Google" }).click();
    await page.waitForURL(/\/create-event$/);
    await expect(page.getByLabel("Partner 1 name")).toHaveValue("Mohammed Abdul Rahman");
    await expect(page.getByLabel("Partner 2 name")).toHaveValue("Fathima Zahra");
    await expect(page.getByLabel("Venue name")).toHaveValue("Grand Ballroom, Address Sky View");
  });

  test("anonymous draft survives signup and publishes from final step", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/create-event");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByRole("button", { name: "Wedding", exact: true }).click();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.locator("article").filter({ hasText: "Floral Luxury Wedding" }).getByRole("button", { name: "Select", exact: true }).click();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.getByLabel("Partner 1 name").fill("Occazn Release");
    await page.getByLabel("Partner 2 name").fill("QA Wedding");
    await page.getByLabel("Event date").fill("2027-12-24");
    await page.getByLabel("Event time").fill("18:30");
    await page.getByLabel("Venue name").fill("Occazn Production QA Venue");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.getByRole("button", { name: "Skip for now" }).click();
    await page.goto("/register?next=%2Fcreate-event");
    await page.getByLabel("Name").fill("Occazn Release QA");
    await page.getByLabel("Email").fill("release-publish@occazn.test");
    await page.getByLabel("Password", { exact: true }).fill("release-password");
    await page.getByLabel("Confirm password").fill("release-password");
    await page.getByRole("button", { name: "Create account" }).click();
    await page.waitForURL(/\/dashboard$/);
    await page.goto("/create-event");
    await expect(page.getByRole("heading", { name: "You're all set!" })).toBeVisible();
    await expect(page.getByText("Occazn Release & QA Wedding", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Save as Draft" }).click();
    await expect(page.getByRole("button", { name: "Draft saved" })).toBeVisible();
    const urlBeforePublish = page.url();
    await page.getByRole("button", { name: "Create My Invite" }).click();
    await expect(page.getByRole("button", { name: "Creating..." })).toBeDisabled();
    await page.waitForURL(/\/event\/[^/]+\/share$/);
    expect(page.url()).not.toBe(urlBeforePublish);
    const slug = page.url().match(/\/event\/([^/]+)\/share$/)?.[1];
    expect(slug).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem("jashnly_event_draft"))).toBeNull();
    await page.goto(`/i/${slug}`);
    await expect(page.getByText("Occazn Release", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("QA Wedding", { exact: false }).first()).toBeVisible();
    await page.reload();
    await expect(page.getByText("Occazn Production QA Venue", { exact: false }).first()).toBeVisible();
  });

  test("public invitation hides empty schedule and location and music pauses", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("jashnly_published_events", JSON.stringify([{
        eventType: "wedding", title: "No Fallback Wedding", primaryName: "Maya", secondaryName: "Omar",
        date: "2027-12-24", time: "18:30", venueName: "", address: "", city: "", mapLink: "", youtubeLink: "", gallery: [],
        rsvpEnabled: true, familyContactsEnabled: false, qrEnabled: true, schedule: [], contacts: [], templateId: "floral-wedding-elegance",
        templateName: "Floral Luxury Wedding", theme: "blush", openingAnimation: "none",
        music: { enabled: true, trackId: "leberch-wedding-romantic-262606", url: "/audio/leberch-wedding-romantic-262606.mp3", autoplay: false },
        status: "published", slug: "no-fallback", publicUrl: `${location.origin}/i/no-fallback`, qrCodeData: ""
      }]));
      sessionStorage.setItem("jashnly_intro_seen_no-fallback", "true");
    });
    await page.goto("/i/no-fallback");
    await expect(page.getByText("Guests arrive and settle in.")).toHaveCount(0);
    await expect(page.getByText("Venue to be announced")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Location" })).toHaveCount(0);
    await page.getByRole("button", { name: "Play Music" }).first().click();
    await expect.poll(() => page.locator("audio").evaluate((audio: HTMLAudioElement) => audio.paused)).toBe(false);
    await page.getByRole("button", { name: "Pause music" }).click();
    await expect.poll(() => page.locator("audio").evaluate((audio: HTMLAudioElement) => audio.paused)).toBe(true);
    await page.waitForTimeout(1_000);
    expect(await page.locator("audio").evaluate((audio: HTMLAudioElement) => audio.paused)).toBe(true);
  });

  test("all five Wedding templates keep long content balanced", async ({ page }) => {
    const templates = [
      "floral-wedding-elegance",
      "royal-nikah-elegance",
      "minimal-editorial-wedding",
      "soft-traditional-wedding",
      "contemporary-luxe-wedding",
    ];
    for (const templateId of templates) {
      for (const viewport of [{ width: 390, height: 844 }, { width: 1366, height: 768 }]) {
        await page.setViewportSize(viewport);
        await page.goto("/");
        await page.evaluate(({ templateId }) => {
          localStorage.setItem("jashnly_published_events", JSON.stringify([{
            eventType: "wedding", title: "Long Content Wedding", primaryName: "Mohammed Abdul Rahman", secondaryName: "Fathima Zahra",
            date: "2027-12-24", time: "18:30", venueName: "Grand Ballroom, Address Sky View, Sheikh Mohammed bin Rashid Boulevard, Downtown Dubai",
            address: "Downtown Dubai", city: "Dubai", mapLink: "https://maps.google.com/?q=Address+Sky+View", youtubeLink: "", gallery: [],
            rsvpEnabled: true, familyContactsEnabled: false, qrEnabled: true,
            schedule: [{ id: "reception", title: "Wedding Reception & Family Celebration", startTime: "18:30", description: "Dinner and family celebration" }],
            contacts: [], templateId, templateName: templateId, theme: "blush", openingAnimation: "none",
            music: { enabled: false, trackId: "none", url: "", autoplay: false }, status: "published", slug: "template-audit",
            publicUrl: `${location.origin}/i/template-audit`, qrCodeData: ""
          }]));
          sessionStorage.setItem("jashnly_intro_seen_template-audit", "true");
        }, { templateId });
        await page.goto("/i/template-audit");
        await expect(page.getByText("Mohammed Abdul Rahman", { exact: false }).first()).toBeVisible();
        await expect(page.getByText("Wedding Reception & Family Celebration", { exact: false }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
        const headingSize = await page.locator("h1").first().evaluate((heading) => Number.parseFloat(getComputedStyle(heading).fontSize));
        expect(headingSize).toBeLessThanOrEqual(60);
      }
    }
  });
});
