import { expect, test, type Page } from "@playwright/test";

const templateIds = [
  "floral-wedding-elegance",
  "royal-nikah-elegance",
  "minimal-editorial-wedding",
  "soft-traditional-wedding",
  "contemporary-luxe-wedding",
];

function eventFor(templateId: string, complete: boolean) {
  return {
    eventType: "wedding", title: "Occazn Visual QA Wedding", primaryName: "Christopher Alexander", secondaryName: "Noor Al Huda",
    date: "2026-12-31", time: "18:30", venueName: complete ? "Grand Ballroom, Address Sky View" : "", address: complete ? "Downtown Dubai" : "", city: complete ? "Dubai" : "",
    mapLink: complete ? "https://maps.google.com/?q=Address+Sky+View" : "", youtubeLink: complete ? "https://youtube.com/live/qa" : "",
    coverImage: complete ? "/templates/wedding/qa-editorial-couple.png" : "", gallery: complete ? ["/templates/wedding/qa-editorial-couple.png"] : [],
    story: complete ? "From friendship to forever, we are grateful to celebrate this chapter surrounded by the people we love." : "",
    rsvpEnabled: true, familyContactsEnabled: false, qrEnabled: true,
    schedule: complete ? [
      { id: "ceremony", title: "Wedding Ceremony", startTime: "18:30", description: "The beginning of forever" },
      { id: "dinner", title: "Dinner & Celebration", startTime: "20:00", description: "An evening with family and friends" },
    ] : [], contacts: [], templateId, templateName: templateId, theme: "blush", openingAnimation: "none",
    music: { enabled: false, trackId: "", url: "", autoplay: false }, status: "published", slug: "visual-template-qa", publicUrl: "http://127.0.0.1:3000/i/visual-template-qa", qrCodeData: "",
  };
}

async function seed(page: Page, templateId: string, complete: boolean) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate((event) => localStorage.setItem("jashnly_published_events", JSON.stringify([event])), eventFor(templateId, complete));
  await page.goto("/i/visual-template-qa");
  await expect(page.locator("h1")).toContainText("Christopher Alexander");
  await expect(page.getByText("Demo", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Guests arrive and settle in.")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
}

test("captures all five templates with complete content", async ({ page }) => {
  for (const templateId of templateIds) {
    for (const viewport of [{ name: "mobile", width: 390, height: 844 }, { name: "desktop", width: 1440, height: 900 }]) {
      await page.setViewportSize(viewport);
      await seed(page, templateId, true);
      await page.screenshot({ path: `.impeccable/review/${templateId}-${viewport.name}.png`, fullPage: true });
    }
  }
});

test("empty optional data produces no empty public sections", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const templateId of templateIds) {
    await seed(page, templateId, false);
    await expect(page.getByRole("heading", { name: /location/i })).toHaveCount(0);
    await expect(page.getByText(/wedding ceremony|dinner & celebration/i)).toHaveCount(0);
  }
});
