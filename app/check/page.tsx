import { Metadata } from "next";
import CheckClient from "./CheckClient";

// STRICT SEO REQUIREMENT: Dynamic Meta Tags for Google Indexing
export const metadata: Metadata = {
  title: "Free EV VIN Check & Safety Recalls | EV2Trust",
  description: "Enter your Electric Vehicle's VIN to instantly decode specifications and check official U.S. Government NHTSA databases for critical battery safety recalls.",
  keywords: "EV VIN check, electric vehicle recall check, free VIN decoder, NHTSA EV data",
};

export default function CheckPage() {
  // This single line connects your new UI to the browser!
  return <CheckClient />;
}