import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  firstName: string;
  serviceType: string;
  rentalType: string;
  startDate: string;
  startTime: string;
  endDate?: string;
  estimatedHours?: string;
  pickupLocation: string;
  dropoffLocation?: string;
  occasion?: string;
  phone?: string;
  email?: string;
  address?: string;
  responseHours?: string;
}

const brand = { gold: "#B89B5E", black: "#090909", offwhite: "#F5F2EA" };

export default function BookingCustomerEmail({
  firstName,
  serviceType,
  rentalType,
  startDate,
  startTime,
  endDate,
  estimatedHours,
  pickupLocation,
  dropoffLocation,
  occasion,
  phone = "(206) 669-1109",
  email = "info@seattleluxurydrive.com",
  address = "14723 Aurora Ave N, Shoreline, WA 98133",
  responseHours = "4",
}: Props) {
  const phoneHref = `tel:+1${phone.replace(/\D/g, "")}`;

  return (
    <Html>
      <Head />
      <Preview>Your reservation request has been received — Seattle Luxury Drive</Preview>
      <Body style={{ backgroundColor: "#f4f4f4", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff" }}>

          {/* Header */}
          <Section style={{ backgroundColor: brand.black, padding: "40px 40px 32px" }}>
            <Text style={{ color: brand.gold, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 8px" }}>
              Seattle Luxury Drive
            </Text>
            <Heading as="h1" style={{ color: brand.offwhite, fontSize: "26px", fontWeight: "300", margin: 0 }}>
              We&apos;ve Received Your Request
            </Heading>
          </Section>

          {/* Gold accent line */}
          <Section style={{ backgroundColor: brand.gold, height: "3px", padding: 0, margin: 0 }}>
            <Text style={{ margin: 0, fontSize: "1px" }}>&nbsp;</Text>
          </Section>

          {/* Greeting */}
          <Section style={{ padding: "40px 40px 0" }}>
            <Text style={{ fontSize: "15px", color: "#333", lineHeight: "1.6", margin: 0 }}>
              Dear {firstName},
            </Text>
            <Text style={{ fontSize: "15px", color: "#333", lineHeight: "1.6" }}>
              Thank you for your reservation request. Our concierge team will review your details and
              reach out within {responseHours} business hours to confirm availability and finalize your booking.
            </Text>
            <Text style={{ fontSize: "15px", color: "#555", lineHeight: "1.6" }}>
              In the meantime, here is a summary of your request:
            </Text>
          </Section>

          {/* Trip summary */}
          <Section style={{ padding: "0 40px 32px" }}>
            <Section style={{ backgroundColor: "#f9f9f9", border: "1px solid #e5e5e5", padding: "24px" }}>
              <Heading as="h2" style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: brand.gold, margin: "0 0 16px" }}>
                Reservation Summary
              </Heading>
              <Text style={{ fontSize: "14px", color: "#333", margin: "6px 0" }}><strong>Service:</strong> {serviceType}</Text>
              <Text style={{ fontSize: "14px", color: "#333", margin: "6px 0" }}><strong>Rental Type:</strong> {rentalType}</Text>
              <Text style={{ fontSize: "14px", color: "#333", margin: "6px 0" }}><strong>Date:</strong> {startDate}</Text>
              <Text style={{ fontSize: "14px", color: "#333", margin: "6px 0" }}><strong>Time:</strong> {startTime}</Text>
              {endDate && <Text style={{ fontSize: "14px", color: "#333", margin: "6px 0" }}><strong>Return Date:</strong> {endDate}</Text>}
              {estimatedHours && <Text style={{ fontSize: "14px", color: "#333", margin: "6px 0" }}><strong>Estimated Duration:</strong> {estimatedHours} hours</Text>}
              <Hr style={{ borderColor: "#e5e5e5", margin: "16px 0" }} />
              <Text style={{ fontSize: "14px", color: "#333", margin: "6px 0" }}><strong>Pickup:</strong> {pickupLocation}</Text>
              {dropoffLocation && <Text style={{ fontSize: "14px", color: "#333", margin: "6px 0" }}><strong>Dropoff:</strong> {dropoffLocation}</Text>}
              {occasion && <Text style={{ fontSize: "14px", color: "#333", margin: "6px 0" }}><strong>Occasion:</strong> {occasion}</Text>}
            </Section>
          </Section>

          <Hr style={{ borderColor: "#e5e5e5", margin: "0 40px" }} />

          {/* Contact */}
          <Section style={{ padding: "32px 40px" }}>
            <Text style={{ fontSize: "14px", color: "#555", lineHeight: "1.6", margin: "0 0 8px" }}>
              Need to reach us sooner?
            </Text>
            <Text style={{ fontSize: "15px", color: "#333", margin: "0 0 4px" }}>
              <Link href={phoneHref} style={{ color: brand.gold, textDecoration: "none", fontWeight: "bold" }}>
                {phone}
              </Link>{" "}
              · Call or text anytime
            </Text>
            <Text style={{ fontSize: "14px", color: "#555", margin: "4px 0 0" }}>
              <Link href={`mailto:${email}`} style={{ color: brand.gold, textDecoration: "none" }}>
                {email}
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: brand.black, padding: "24px 40px" }}>
            <Text style={{ fontSize: "11px", color: "#666", margin: "0 0 4px", letterSpacing: "1px", textTransform: "uppercase" }}>
              Seattle Luxury Drive
            </Text>
            <Text style={{ fontSize: "11px", color: "#555", margin: 0 }}>
              {address}
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}
