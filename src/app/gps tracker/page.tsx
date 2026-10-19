import { redirect } from "next/navigation";

export default function LegacyGPSTrackerRedirect() {
  redirect("/gps-tracker");
}
