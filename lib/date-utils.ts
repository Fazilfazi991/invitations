export function formatEventDate(date: string) {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

export function formatEventTime(time: string) {
  if (!time) return "";
  const parsed = new Date(`2000-01-01T${time}`);
  if (Number.isNaN(parsed.getTime())) return time;
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(parsed);
}

export function getEventDateTime(date: string, time: string) {
  if (!date || !time) return null;
  const parsed = new Date(`${date}T${time}`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
