import {
  Baby,
  Cake,
  CalendarDays,
  Gift,
  Heart,
  Home,
  MapPin,
  Music,
  PartyPopper,
  HeartHandshake,
  Sparkles,
  Users,
} from "lucide-react";

export const sampleEvent = {
  id: "afsal-fathima",
  title: "Afsal & Fathima Wedding",
  slug: "afsal-fathima",
  mode: "invite" as "invite" | "memory",
  eventDate: "2025-05-24",
  date: "May 24, 2025",
  time: "6:00 PM",
  location: "Calicut Convention Centre, Kerala, India",
  couple: "Afsal & Fathima",
  eventType: "Wedding",
  liveLink: "https://youtube.com/live/sample",
  rsvpDeadline: "May 10, 2025",
  coverImage: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80",
  coupleImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  invitationImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
};

export const schedule = [
  { title: "Nikah Ceremony", time: "4:00 PM - 5:00 PM", venue: "Juma Masjid, Calicut", icon: HeartHandshake, description: "A heartfelt ceremony with close family and blessings." },
  { title: "Welcome Drink", time: "6:00 PM - 6:30 PM", venue: "Calicut Convention Centre", icon: Users, description: "Arrive, greet the families, and enjoy refreshments." },
  { title: "Dinner", time: "7:30 PM - 9:00 PM", venue: "Calicut Convention Centre", icon: Cake, description: "A warm dinner celebrating the newlyweds." },
  { title: "Reception", time: "8:30 PM - 10:00 PM", venue: "Calicut Convention Centre", icon: Music, description: "Photos, greetings, and a joyful reception." },
  { title: "Blessings", time: "10:00 PM onwards", venue: "Main Hall", icon: Heart, description: "Share your love, duas, and wishes." },
];

export const locations = [
  { title: "Nikah Venue", address: "Juma Masjid, Calicut", detail: "Ceremony venue" },
  { title: "Reception Venue", address: "Calicut Convention Centre", detail: "Main celebration hall" },
  { title: "Parking Area", address: "Convention Centre Parking", detail: "Guest parking" },
  { title: "Nearby Stay", address: "Grand Hotel, Calicut", detail: "Suggested stay" },
];

export const familyContacts = [
  { name: "Afsal's Family", phone: "+91 999 555 1234" },
  { name: "Fathima's Family", phone: "+91 999 888 5678" },
  { name: "Event Coordinator", phone: "+91 987 654 3210" },
];

export const categories = [
  { label: "Wedding", icon: HeartHandshake, image: "/New%20folder/occazn_celebration_cards_webp/wedding.webp" },
  { label: "Engagement", icon: Heart, image: "/New%20folder/occazn_celebration_cards_webp/engagement.webp" },
  { label: "Birthday", icon: Cake, image: "/New%20folder/occazn_celebration_cards_webp/birthday.webp" },
  { label: "Naming Ceremony", icon: Baby, image: "/New%20folder/occazn_celebration_cards_webp/naming_ceremony.webp" },
  { label: "Housewarming", icon: Home, image: "/New%20folder/occazn_celebration_cards_webp/housewarming.webp" },
  { label: "Religious Event", icon: Sparkles },
  { label: "Reception", icon: PartyPopper },
  { label: "Other Events", icon: Gift },
];

export const featurePills = [
  { label: "RSVP", icon: Users },
  { label: "Locations", icon: MapPin },
  { label: "Gallery", icon: Sparkles },
  { label: "YouTube Live", icon: CalendarDays },
  { label: "Invitation", icon: Heart },
  { label: "QR Sharing", icon: Gift },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80",
];

export const dashboardEvents = [
  { ...sampleEvent, status: "Published" },
  { id: "arjun-birthday", title: "Arjun's Birthday", date: "May 25, 2025", status: "Published", coverImage: galleryImages[5] },
  { id: "new-home", title: "New Home Celebration", date: "June 1, 2025", status: "Published", coverImage: galleryImages[3] },
];

export const eventUrl = "https://occazn.com/event/afsal-fathima";

export const eventChecklist = [
  {
    id: "basic-details",
    title: "Basic details",
    description: "Event name, date and time are added.",
    completed: true,
    actionLabel: "Edit",
  },
  {
    id: "cover-image",
    title: "Cover image",
    description: "Add a beautiful image for your event page.",
    completed: true,
    actionLabel: "Change",
  },
  {
    id: "invitation-card",
    title: "Invitation card",
    description: "Upload your card so guests can view it anytime.",
    completed: false,
    actionLabel: "Upload",
  },
  {
    id: "schedule",
    title: "Schedule",
    description: "Help guests know what happens and when.",
    completed: true,
    actionLabel: "Edit",
  },
  {
    id: "location",
    title: "Location",
    description: "Add venue and map direction.",
    completed: true,
    actionLabel: "Edit",
  },
  {
    id: "rsvp",
    title: "RSVP",
    description: "Collect guest confirmations easily.",
    completed: true,
    actionLabel: "Manage",
  },
  {
    id: "youtube-live",
    title: "YouTube live",
    description: "Add live stream link for guests who cannot attend.",
    completed: false,
    actionLabel: "Add link",
  },
  {
    id: "family-contacts",
    title: "Family contacts",
    description: "Add people guests can call for help.",
    completed: true,
    actionLabel: "Edit",
  },
  {
    id: "qr-code",
    title: "QR code",
    description: "Generate a QR code for cards and posters.",
    completed: true,
    actionLabel: "View",
  },
  {
    id: "whatsapp-message",
    title: "WhatsApp message",
    description: "Prepare a beautiful message to share with guests.",
    completed: false,
    actionLabel: "Create",
  },
];

export const blessings = [
  {
    id: "1",
    name: "Shahina",
    message: "Wishing you both a lifetime of happiness, love and togetherness.",
    relation: "Bride's cousin",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Rashid Uncle",
    message: "May Allah bless your journey together and fill your life with barakah.",
    relation: "Family",
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    name: "Nihal",
    message: "So happy for you both! Can't wait to celebrate this beautiful day.",
    relation: "Friend",
    createdAt: "Yesterday",
  },
];

export const memoryHighlights = [
  {
    id: "1",
    title: "Nikah Ceremony",
    description: "A beautiful moment surrounded by family and blessings.",
    image: galleryImages[0],
  },
  {
    id: "2",
    title: "Reception Night",
    description: "Smiles, lights and celebrations with loved ones.",
    image: galleryImages[3],
  },
  {
    id: "3",
    title: "Family Moments",
    description: "The sweetest candid memories from the day.",
    image: galleryImages[2],
  },
];

export const vendorCategories = [
  { id: "photographer", name: "Photographer", description: "Capture every beautiful moment.", icon: "camera" },
  { id: "makeup", name: "Makeup", description: "Find artists for your perfect look.", icon: "sparkles" },
  { id: "decor", name: "Decor", description: "Create the celebration mood.", icon: "flower" },
  { id: "catering", name: "Catering", description: "Plan food for every guest.", icon: "utensils" },
  { id: "halls", name: "Halls", description: "Discover venues for your event.", icon: "building" },
  { id: "live-streaming", name: "Live Streaming", description: "Let distant guests join live.", icon: "video" },
];

export const featuredVendors = [
  { name: "LensCraft Weddings", category: "Photography", location: "Calicut", rating: "4.9", image: galleryImages[0] },
  { name: "Noor Bridal Studio", category: "Makeup", location: "Kochi", rating: "4.8", image: galleryImages[1] },
  { name: "Bloom Decor Co.", category: "Decor", location: "Malappuram", rating: "4.9", image: galleryImages[2] },
  { name: "Feast House Catering", category: "Catering", location: "Thrissur", rating: "4.7", image: galleryImages[3] },
  { name: "Grand Pearl Hall", category: "Venue", location: "Kozhikode", rating: "4.8", image: galleryImages[4] },
  { name: "Streamly Live", category: "Live Streaming", location: "Kerala", rating: "4.9", image: galleryImages[5] },
];
