import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  serviceType: string;
  rentalType: string;
  startDate: string;
  startTime: string;
  endDate?: string;
  estimatedHours?: string;
  pickupLocation: string;
  dropoffLocation?: string;
  occasion?: string;
  specialRequests?: string;
  submissionId: string;
}

const brand = { gold: "#B89B5E", black: "#090909", offwhite: "#F5F2EA" };

export default function BookingAdminEmail({
  firstName,
  lastName,
  email,
  phone,
  preferredContactMethod,
  serviceType,
  rentalType,
  startDate,
  startTime,
  endDate,
  estimatedHours,
  pickupLocation,
  dropoffLocation,
  occasion,
  specialRequests,
  submissionId,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>New booking request from {firstName} {lastName}</Preview>
      <Body style={{ backgroundColor: "#f4f4f4", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff" }}>

          {/* Header */}
          <Section style={{ backgroundColor: brand.black, padding: "32px 40px" }}>
            <Text style={{ color: brand.gold, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 4px" }}>
              Seattle Luxury Drive
            </Text>
            <Heading as="h1" style={{ color: brand.offwhite, fontSize: "22px", fontWeight: "300", margin: 0 }}>
              New Booking Request
            </Heading>
          </Section>

          {/* Body */}
          <Section style={{ padding: "40px" }}>
            <Text style={{ fontSize: "14px", color: "#333", marginBottom: "24px" }}>
              A new reservation request has been submitted. Respond within 4 business hours.
            </Text>

            {/* Contact info */}
            <Heading as="h2" style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: brand.gold, marginBottom: "12px" }}>
              Contact Details
            </Heading>
            <Row>
              <Section style={{ borderLeft: `3px solid ${brand.gold}`, paddingLeft: "16px", marginBottom: "24px" }}>
                <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Name:</strong> {firstName} {lastName}</Text>
                <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Email:</strong> <Link href={`mailto:${email}`}>{email}</Link></Text>
                <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Phone:</strong> <Link href={`tel:${phone}`}>{phone}</Link></Text>
                <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Preferred Contact:</strong> {preferredContactMethod}</Text>
              </Section>
            </Row>

            <Hr style={{ borderColor: "#e5e5e5" }} />

            {/* Trip details */}
            <Heading as="h2" style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: brand.gold, margin: "24px 0 12px" }}>
              Trip Details
            </Heading>
            <Section style={{ borderLeft: `3px solid ${brand.gold}`, paddingLeft: "16px", marginBottom: "24px" }}>
              <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Service Type:</strong> {serviceType}</Text>
              <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Rental Type:</strong> {rentalType}</Text>
              <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Start Date:</strong> {startDate}</Text>
              <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Start Time:</strong> {startTime}</Text>
              {endDate && <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>End Date:</strong> {endDate}</Text>}
              {estimatedHours && <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Estimated Hours:</strong> {estimatedHours}</Text>}
              <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Pickup Location:</strong> {pickupLocation}</Text>
              {dropoffLocation && <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Dropoff Location:</strong> {dropoffLocation}</Text>}
            </Section>

            {/* Optional fields */}
            {(occasion || specialRequests) && (
              <>
                <Hr style={{ borderColor: "#e5e5e5" }} />
                <Heading as="h2" style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: brand.gold, margin: "24px 0 12px" }}>
                  Additional Details
                </Heading>
                <Section style={{ borderLeft: `3px solid ${brand.gold}`, paddingLeft: "16px", marginBottom: "24px" }}>
                  {occasion && <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Occasion:</strong> {occasion}</Text>}
                  {specialRequests && (
                    <>
                      <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0 2px" }}><strong>Special Requests:</strong></Text>
                      <Text style={{ fontSize: "14px", color: "#555", margin: 0, whiteSpace: "pre-wrap" }}>{specialRequests}</Text>
                    </>
                  )}
                </Section>
              </>
            )}
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: "#f4f4f4", padding: "20px 40px" }}>
            <Text style={{ fontSize: "11px", color: "#999", margin: 0 }}>
              Submission ID: {submissionId} · Seattle Luxury Drive Admin
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}
