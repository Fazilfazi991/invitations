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
  { label: "Wedding", icon: HeartHandshake },
  { label: "Engagement", icon: Heart },
  { label: "Birthday", icon: Cake },
  { label: "Naming Ceremony", icon: Baby },
  { label: "Housewarming", icon: Home },
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
