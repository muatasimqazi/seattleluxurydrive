import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  email: string;
  role: "admin" | "staff";
  inviteLink: string;
  invitedBy?: string;
  siteName?: string;
  siteUrl?: string;
}

const brand = { gold: "#B89B5E", black: "#090909", offwhite: "#F5F2EA" };

export default function InviteEmail({
  email,
  role,
  inviteLink,
  invitedBy = "The Admin Team",
  siteName = "Seattle Luxury Drive",
  siteUrl = "https://seattleluxurydrive.com",
}: Props) {
  const roleLabel = role === "admin" ? "Administrator" : "Staff";

  return (
    <Html>
      <Head />
      <Preview>You&apos;ve been invited to join {siteName} — accept your invitation</Preview>
      <Body style={{ backgroundColor: "#f4f4f4", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff" }}>

          {/* Header */}
          <Section style={{ backgroundColor: brand.black, padding: "40px 40px 32px" }}>
            <Text style={{ color: brand.gold, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 8px" }}>
              {siteName}
            </Text>
            <Heading as="h1" style={{ color: brand.offwhite, fontSize: "26px", fontWeight: "300", margin: 0 }}>
              You&apos;ve Been Invited
            </Heading>
          </Section>

          {/* Gold accent line */}
          <Section style={{ backgroundColor: brand.gold, height: "3px", padding: 0, margin: 0 }}>
            <Text style={{ margin: 0, fontSize: "1px" }}>&nbsp;</Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: "40px 40px 32px" }}>
            <Text style={{ fontSize: "15px", color: "#333", lineHeight: "1.6", margin: "0 0 16px" }}>
              {invitedBy} has invited <strong>{email}</strong> to join the {siteName} admin portal as a <strong>{roleLabel}</strong>.
            </Text>
            <Text style={{ fontSize: "15px", color: "#555", lineHeight: "1.6", margin: "0 0 32px" }}>
              Click the button below to accept your invitation and set up your account. This link expires in 24 hours.
            </Text>

            <Button
              href={inviteLink}
              style={{
                backgroundColor: brand.gold,
                color: brand.black,
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "16px 32px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Accept Invitation
            </Button>
          </Section>

          <Hr style={{ borderColor: "#e5e5e5", margin: "0 40px" }} />

          {/* Security note */}
          <Section style={{ padding: "24px 40px 32px" }}>
            <Text style={{ fontSize: "13px", color: "#888", lineHeight: "1.6", margin: 0 }}>
              If you weren&apos;t expecting this invitation, you can safely ignore this email. The link will expire automatically.
            </Text>
            <Text style={{ fontSize: "13px", color: "#888", lineHeight: "1.6", margin: "8px 0 0" }}>
              Having trouble with the button? Copy and paste this link into your browser:
            </Text>
            <Text style={{ fontSize: "12px", color: brand.gold, wordBreak: "break-all", margin: "4px 0 0" }}>
              {inviteLink}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: brand.black, padding: "24px 40px" }}>
            <Text style={{ fontSize: "11px", color: "#666", margin: "0 0 4px", letterSpacing: "1px", textTransform: "uppercase" }}>
              {siteName}
            </Text>
            <Text style={{ fontSize: "11px", color: "#555", margin: 0 }}>
              {siteUrl}
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}
