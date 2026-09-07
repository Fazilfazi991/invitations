"use client";

import { useParams } from "next/navigation";
import { RsvpManager } from "@/components/dashboard/RsvpManager";

export default function RsvpManagementPage() {
  const params = useParams<{ id: string }>();
  return <RsvpManager slug={params.id} />;
}
