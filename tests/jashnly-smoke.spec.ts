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
    await page.getByRole("button", { name: "Will Attend" }).click();
    await expect(page.getByRole("status")).toContainText("RSVP has been saved");
    expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || "[]").length, `occazn_rsvps_${slug}`)).toBe(1);
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
});
