import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type GuestMemory = {
  id: string;
  guestName: string;
  caption: string;
  image: string;
  createdAt: string;
};

const localTestMode = process.env.NEXT_PUBLIC_JASHNLY_LOCAL_TEST_MODE === "true";

function key(slug: string) {
  return `jashnly_guest_memories_${slug}`;
}

function loadLocal(slug: string): GuestMemory[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(key(slug)) || "[]");
  } catch {
    return [];
  }
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function loadGuestMemories(slug: string): Promise<GuestMemory[]> {
  if (localTestMode) return loadLocal(slug);
  try {
    const supabase = createSupabaseBrowserClient();
    const { data: event, error: eventError } = await supabase.from("events").select("id").eq("slug", slug).eq("status", "published").maybeSingle();
    if (eventError) throw eventError;
    if (!event) return loadLocal(slug);
    const { data, error } = await supabase
      .from("guest_memories")
      .select("id, guest_name, caption, image_url, created_at")
      .eq("event_id", event.id)
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(24);
    if (error) throw error;
    return (data || []).map((memory: { id: string; guest_name: string; caption: string; image_url: string; created_at: string }) => ({
      id: memory.id,
      guestName: memory.guest_name,
      caption: memory.caption,
      image: memory.image_url,
      createdAt: memory.created_at,
    }));
  } catch (error) {
    console.warn("[occazn memories fallback] Using browser-local guest memories.", error);
    return loadLocal(slug);
  }
}

export async function saveGuestMemory(slug: string, input: { guestName: string; caption: string; file: File }): Promise<GuestMemory> {
  if (localTestMode) {
    const memory = {
      id: crypto.randomUUID(),
      guestName: input.guestName,
      caption: input.caption,
      image: await fileToDataUrl(input.file),
      createdAt: new Date().toISOString(),
    };
    window.localStorage.setItem(key(slug), JSON.stringify([memory, ...loadLocal(slug)].slice(0, 8)));
    return memory;
  }

  const supabase = createSupabaseBrowserClient();
  const { data: event, error: eventError } = await supabase.from("events").select("id").eq("slug", slug).eq("status", "published").single();
  if (eventError) throw eventError;
  const extension = input.file.name.split(".").pop()?.toLowerCase() || "jpg";
  const storagePath = `${slug}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await supabase.storage.from("guest-memories").upload(storagePath, input.file, {
    cacheControl: "3600",
    contentType: input.file.type,
    upsert: false,
  });
  if (uploadError) throw uploadError;
  const { data: publicUrl } = supabase.storage.from("guest-memories").getPublicUrl(storagePath);
  const { data, error } = await supabase
    .from("guest_memories")
    .insert({
      event_id: event.id,
      guest_name: input.guestName,
      caption: input.caption,
      image_url: publicUrl.publicUrl,
      approved: true,
    })
    .select("id, created_at")
    .single();
  if (error) {
    await supabase.storage.from("guest-memories").remove([storagePath]);
    throw error;
  }
  return {
    id: data.id,
    guestName: input.guestName,
    caption: input.caption,
    image: publicUrl.publicUrl,
    createdAt: data.created_at,
  };
}
