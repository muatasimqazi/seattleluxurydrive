export type VehicleStatus = "active" | "archived";
export type BookingStatus =
  | "Pending"
  | "Contacted"
  | "Approved"
  | "Declined"
  | "Completed";
export type ContactStatus = "New" | "Responded" | "Closed";

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  year: number;
  make: string;
  model: string;
  description: string | null;
  starting_hourly_rate: number | null;
  chauffeur_available: boolean;
  featured: boolean;
  status: VehicleStatus;
  created_at: string;
  updated_at: string;
  vehicle_images?: VehicleImage[];
}

export interface VehicleImage {
  id: string;
  vehicle_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface BookingRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pickup_location: string;
  dropoff_location: string | null;
  vehicle_id: string | null;
  service_type: "Self Drive" | "Chauffeur";
  rental_type: "Hourly" | "Full Day" | "Multi-Day";
  start_date: string;
  start_time: string;
  end_date: string | null;
  estimated_hours: number | null;
  occasion: string | null;
  special_requests: string | null;
  preferred_contact_method: "Phone Call" | "Text Message" | "Email";
  status: BookingStatus;
  admin_notes: string | null;
  ip_address: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  responded_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: ContactStatus;
  admin_notes: string | null;
  responded_at: string | null;
  ip_address: string | null;
  created_at: string;
  updated_at: string;
}
