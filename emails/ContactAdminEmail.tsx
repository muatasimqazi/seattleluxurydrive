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
  lastName: string;
  email: string;
  phone: string;
  message: string;
  submissionId: string;
}

const brand = { gold: "#B89B5E", black: "#090909", offwhite: "#F5F2EA" };

export default function ContactAdminEmail({
  firstName,
  lastName,
  email,
  phone,
  message,
  submissionId,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>New contact message from {firstName} {lastName}</Preview>
      <Body style={{ backgroundColor: "#f4f4f4", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff" }}>

          <Section style={{ backgroundColor: brand.black, padding: "32px 40px" }}>
            <Text style={{ color: brand.gold, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 4px" }}>
              Seattle Luxury Drive
            </Text>
            <Heading as="h1" style={{ color: brand.offwhite, fontSize: "22px", fontWeight: "300", margin: 0 }}>
              New Contact Message
            </Heading>
          </Section>

          <Section style={{ padding: "40px" }}>
            <Text style={{ fontSize: "14px", color: "#333", marginBottom: "24px" }}>
              A visitor submitted the contact form. Respond within 4 business hours.
            </Text>

            <Heading as="h2" style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: brand.gold, marginBottom: "12px" }}>
              Sender
            </Heading>
            <Section style={{ borderLeft: `3px solid ${brand.gold}`, paddingLeft: "16px", marginBottom: "24px" }}>
              <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Name:</strong> {firstName} {lastName}</Text>
              <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Email:</strong> <Link href={`mailto:${email}`}>{email}</Link></Text>
              <Text style={{ fontSize: "14px", color: "#333", margin: "4px 0" }}><strong>Phone:</strong> <Link href={`tel:${phone}`}>{phone}</Link></Text>
            </Section>

            <Heading as="h2" style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: brand.gold, marginBottom: "12px" }}>
              Message
            </Heading>
            <Section style={{ borderLeft: `3px solid ${brand.gold}`, paddingLeft: "16px" }}>
              <Text style={{ fontSize: "14px", color: "#555", lineHeight: "1.6", whiteSpace: "pre-wrap", margin: 0 }}>
                {message}
              </Text>
            </Section>
          </Section>

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
