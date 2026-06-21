export type GuestMemory = {
  id: string;
  guestName: string;
  caption: string;
  image: string;
  createdAt: string;
};

function key(slug: string) {
  return `jashnly_guest_memories_${slug}`;
}

export function loadGuestMemories(slug: string): GuestMemory[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(key(slug)) || "[]");
  } catch {
    return [];
  }
}

export function saveGuestMemory(slug: string, memory: GuestMemory) {
  const current = loadGuestMemories(slug);
  window.localStorage.setItem(key(slug), JSON.stringify([memory, ...current].slice(0, 8)));
}
