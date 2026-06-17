import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  firstName: string;
  phone?: string;
  email?: string;
  responseHours?: string;
}

const brand = { gold: "#B89B5E", black: "#090909", offwhite: "#F5F2EA" };

export default function ContactCustomerEmail({
  firstName,
  phone = "(206) 669-1109",
  email = "info@seattleluxurydrive.com",
  responseHours = "4",
}: Props) {
  const phoneHref = `tel:+1${phone.replace(/\D/g, "")}`;

  return (
    <Html>
      <Head />
      <Preview>We received your message — Seattle Luxury Drive</Preview>
      <Body style={{ backgroundColor: "#f4f4f4", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff" }}>

          <Section style={{ backgroundColor: brand.black, padding: "40px 40px 32px" }}>
            <Text style={{ color: brand.gold, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 8px" }}>
              Seattle Luxury Drive
            </Text>
            <Heading as="h1" style={{ color: brand.offwhite, fontSize: "26px", fontWeight: "300", margin: 0 }}>
              Message Received
            </Heading>
          </Section>

          <Section style={{ backgroundColor: brand.gold, height: "3px", padding: 0, margin: 0 }}>
            <Text style={{ margin: 0, fontSize: "1px" }}>&nbsp;</Text>
          </Section>

          <Section style={{ padding: "40px" }}>
            <Text style={{ fontSize: "15px", color: "#333", lineHeight: "1.6" }}>
              Dear {firstName},
            </Text>
            <Text style={{ fontSize: "15px", color: "#333", lineHeight: "1.6" }}>
              Thank you for reaching out to Seattle Luxury Drive. We&apos;ve received your message
              and a member of our concierge team will respond within {responseHours} business hours.
            </Text>
            <Text style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
              If you need immediate assistance, please don&apos;t hesitate to call or text us:
            </Text>
            <Text style={{ fontSize: "16px", color: "#333", margin: "4px 0 24px" }}>
              <Link href={phoneHref} style={{ color: brand.gold, textDecoration: "none", fontWeight: "bold" }}>
                {phone}
              </Link>
            </Text>
            <Text style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
              We look forward to arranging your luxury transportation experience.
            </Text>
          </Section>

          <Section style={{ backgroundColor: brand.black, padding: "24px 40px" }}>
            <Text style={{ fontSize: "11px", color: "#666", margin: "0 0 4px", letterSpacing: "1px", textTransform: "uppercase" }}>
              Seattle Luxury Drive
            </Text>
            <Text style={{ fontSize: "11px", color: "#555", margin: 0 }}>
              14723 Aurora Ave N · Shoreline, WA 98133 ·{" "}
              <Link href={`mailto:${email}`} style={{ color: "#777" }}>
                {email}
              </Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}
