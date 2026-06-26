(function initializeInvitationPage() {
  const inviteConfig = {
    couple: "Muhammed Suhaib and Fathima Gafoor",
    date: "2026-07-20",
    startTime: "12:00:00",
    endTime: "15:00:00",
    venue: "T. M. Mahal Auditorium, Thiruvathra",
    mapsQuery: "T. M. Mahal Auditorium, Thiruvathra",
  };

  window.openGoogleMapsLocation = function openGoogleMapsLocation() {
    const url = new URL("https://www.google.com/maps/search/");
    url.searchParams.set("api", "1");
    url.searchParams.set("query", inviteConfig.mapsQuery);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  window.saveTheDate = function saveTheDate() {
    const calendarContent = buildCalendarFile(inviteConfig);
    const blob = new Blob([calendarContent], {
      type: "text/calendar;charset=utf-8",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = "muhammed-suhaib-fathima-gafoor-wedding.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  };

  window.toggleInvitationMusic = function toggleInvitationMusic() {
    console.info("Music support is intentionally disabled until an audio file is added.");
  };

  window.getInviteQrPayload = function getInviteQrPayload() {
    return {
      inviteUrl: window.location.href,
      couple: inviteConfig.couple,
      eventDate: inviteConfig.date,
      venue: inviteConfig.venue,
    };
  };

  function buildCalendarFile(config) {
    const start = toCalendarDate(config.date, config.startTime);
    const end = toCalendarDate(config.date, config.endTime);
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//Muhammed Suhaib and Fathima Gafoor//EN",
      "BEGIN:VEVENT",
      `UID:${config.date}-muhammed-suhaib-fathima-gafoor-wedding`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:Wedding of ${config.couple}`,
      `LOCATION:${escapeCalendarText(config.venue)}`,
      "DESCRIPTION:With full hearts, joyfully invite you to their wedding.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
  }

  function toCalendarDate(date, time) {
    return `${date.replaceAll("-", "")}T${time.replaceAll(":", "")}`;
  }

  function escapeCalendarText(value) {
    return value.replace(/[\\,;]/g, "\\$&").replace(/\n/g, "\\n");
  }
})();
