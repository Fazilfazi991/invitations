import { expect, test } from "@playwright/test";

test.describe("Jashnly smoke flow", () => {
  test("homepage carousel and birthday create/publish/share flow", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await expect(page.getByRole("link", { name: /Jashnly/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "One Hero. Endless Celebrations." })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

    const header = page.locator("header");
    await header.getByRole("button", { name: "Birthday", exact: true }).click();
    await expect(page.getByText("A joyful birthday page full of smiles.", { exact: true })).toBeVisible();
    await header.getByRole("button", { name: "Wedding", exact: true }).click();
    await expect(page.getByText("A romantic invitation for your special day.", { exact: true })).toBeVisible();

    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login\?next=%2Fdashboard/);
    await page.goto("/register");
    await page.getByLabel("Name").fill("QA Organizer");
    await page.getByLabel("Email").fill("qa@example.com");
    await page.getByLabel("Password", { exact: true }).fill("secret123");
    await page.getByLabel("Confirm password").fill("secret123");
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await page.evaluate(() => {
      localStorage.setItem("jashnly_published_events", JSON.stringify([{
        eventType: "birthday",
        title: "Existing Daniel Birthday",
        primaryName: "Daniel",
        date: "2027-01-01",
        time: "16:00",
        venueName: "Old Venue",
        address: "Old Address",
        city: "Miami",
        mapLink: "",
        youtubeLink: "",
        gallery: [],
        rsvpEnabled: true,
        familyContactsEnabled: false,
        qrEnabled: true,
        schedule: [],
        contacts: [],
        templateId: "pink-teddy-birthday",
        templateName: "Pink Teddy Birthday",
        templateImage: "/templates/previews/birthday/pink-teddy-birthday-preview.png",
        theme: "blush",
        status: "published",
        slug: "daniel-s-5th-birthday",
      }]));
    });

    await page.goto("/categories");
    await expect(page.getByRole("heading", { name: "What are you planning?" })).toBeVisible();
    await page.getByRole("button", { name: "Birthday", exact: true }).click();
    const birthdayCard = page.locator("article").filter({ hasText: "Pink Teddy Birthday" });
    await birthdayCard.getByRole("button", { name: "Use this template" }).click();

    await expect(page.getByLabel("Birthday person name")).toBeVisible();
    expect(await page.getByLabel("Event type: Birthday").inputValue()).toBe("birthday");
    await expect(page.getByLabel("Groom / Host name")).toHaveCount(0);

    await page.getByLabel("Event title").fill("Daniel's 5th Birthday");
    await page.getByLabel("Birthday person name").fill("Daniel");
    await page.getByLabel("Age turning").fill("5");
    await page.getByLabel("Date").fill("2027-05-24");
    await page.getByLabel("Time").fill("16:00");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page).toHaveURL(/\/create\/step-2$/);

    await page.getByLabel("Venue name").fill("Sunshine Party House");
    await page.getByLabel("Address").fill("100 Sunshine Avenue");
    await page.getByLabel("City").fill("Miami");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page).toHaveURL(/\/create\/step-3$/);

    await expect(page.getByRole("heading", { name: "Media & Schedule" })).toBeVisible();
    await page.getByRole("button", { name: "Add", exact: true }).click();
    const scheduleTitles = page.getByPlaceholder("Schedule title");
    await scheduleTitles.nth(1).fill("Cake Cutting");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page).toHaveURL(/\/create\/step-4$/);

    await expect(page.getByRole("heading", { name: "Pink Teddy Birthday" })).toBeVisible();
    await page.getByRole("button", { name: "Royal", exact: true }).click();
    await page.getByRole("button", { name: /Celebration Pop/ }).click();
    await page.getByRole("button", { name: "Publish Event" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByText("Daniel's 5th Birthday", { exact: true })).toBeVisible();
    await expect(page.getByText("82% complete", { exact: true })).toBeVisible();

    await page.goto("/dashboard/daniel-s-5th-birthday-2");
    await expect(page.getByRole("heading", { name: "Analytics preview" })).toBeVisible();
    await expect(page.getByText("Organizer only", { exact: true })).toBeVisible();

    await page.goto("/event/daniel-s-5th-birthday-2");
    await expect(page.getByTestId("event-opening")).toBeVisible();
    await page.getByRole("button", { name: "Open invitation" }).click();
    await expect(page.getByTestId("event-opening")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Daniel's/ })).toBeVisible();
    await expect(page.getByText("The Wedding of", { exact: true })).toHaveCount(0);
    await expect(page.getByText("May 24, 2027", { exact: true })).toBeVisible();
    await expect(page.locator("main").first()).toHaveCSS("background", /rgb\(255, 251, 255\)|rgb\(245, 236, 255\)/);
    await expect(page.getByRole("heading", { name: "Analytics preview" })).toHaveCount(0);
    await page.reload();
    await expect(page.getByTestId("event-opening")).toHaveCount(0);

    await page.goto("/event/daniel-s-5th-birthday-2/share");
    await expect(page.getByRole("heading", { name: "Event QR Code" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "WhatsApp message" })).toBeVisible();
    await page.getByRole("button", { name: "Malayalam", exact: true }).click();
    const message = page.getByLabel("WhatsApp message text");
    await expect(message).toHaveValue(/ജന്മദിന ആഘോഷത്തിലേക്ക്/);
    await expect(message).not.toHaveValue(/വിവാഹ/);
    await expect(message).not.toHaveValue(/�/);

    await page.goto("/event/daniel-s-5th-birthday-2/memories");
    await expect(page.getByRole("heading", { name: "Thank you for celebrating with us" })).toBeVisible();
    await expect(page.getByTestId("event-opening")).toHaveCount(0);
    await page.getByLabel("Guest name").fill("Maya");
    await page.getByLabel("Photo caption").fill("Cake time!");
    await page.locator('input[type="file"]').setInputFiles({
      name: "memory.png",
      mimeType: "image/png",
      buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEAQH/7Xq7WQAAAABJRU5ErkJggg==", "base64"),
    });
    await page.getByRole("button", { name: "Add to memories" }).click();
    await expect(page.getByText("Photo added to the album.")).toBeVisible();
    await expect(page.getByText("Maya", { exact: true })).toBeVisible();
    await expect(page.getByText("Cake time!", { exact: true })).toBeVisible();
    await page.reload();
    await expect(page.getByText("Maya", { exact: true })).toBeVisible();

    await page.goto("/profile");
    await page.getByRole("button", { name: "Logout" }).click();
    await expect(page).toHaveURL(/\/$/);
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login\?next=%2Fdashboard/);
    await page.goto("/event/daniel-s-5th-birthday-2");
    await expect(page.getByRole("heading", { name: /Daniel's/ })).toBeVisible();
  });
});
