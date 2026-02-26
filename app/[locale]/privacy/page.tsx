import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalParagraph, LegalList } from "@/components/shared/legal-page";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description:
    "ESAP AI Privacy Policy - Learn how we collect, use, and protect your personal information. Understand your rights and our commitment to data security.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 2025";

  return (
    <main className="relative">
      <LegalPage title="Privacy Policy" lastUpdated={lastUpdated}>
        <LegalSection title="1. Introduction">
          <LegalParagraph>
            ESAP AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI platform, including our voice-activated ERP systems, enterprise security solutions, and related services (collectively, the "Services").
          </LegalParagraph>
          <LegalParagraph>
            By accessing or using our Services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="2. Information We Collect">
          <LegalParagraph>
            We collect several types of information from and about users of our Services:
          </LegalParagraph>
          
          <h3 className="text-xl md:text-2xl font-semibold text-primary mt-8 mb-4">2.1 Personal Information</h3>
          <LegalList items={[
            "Name, email address, phone number, and other contact information",
            "Company name, job title, and business information",
            "Account credentials and authentication information",
            "Billing and payment information",
            "Profile information and preferences"
          ]} />

          <h3 className="text-xl md:text-2xl font-semibold text-primary mt-8 mb-4">2.2 Usage Data</h3>
          <LegalList items={[
            "Log data including IP addresses, browser type, device information, and access times",
            "Usage patterns, feature interactions, and service performance metrics",
            "Voice commands and interactions with our voice-activated systems",
            "Error logs and diagnostic information"
          ]} />

          <h3 className="text-xl md:text-2xl font-semibold text-primary mt-8 mb-4">2.3 Business Data</h3>
          <LegalList items={[
            "Data you input into our ERP systems and AI platforms",
            "Business processes, workflows, and operational data",
            "Documents, files, and content uploaded to our Services",
            "Integration data from third-party services"
          ]} />

          <h3 className="text-xl md:text-2xl font-semibold text-primary mt-8 mb-4">2.4 AI Training Data</h3>
          <LegalParagraph>
            To improve our AI models and services, we may use anonymized and aggregated data from your usage of our Services. This data is processed in a way that cannot identify you personally and is used solely to enhance the accuracy and performance of our AI systems.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="3. How We Use Your Information">
          <LegalParagraph>
            We use the information we collect for the following purposes:
          </LegalParagraph>
          <LegalList items={[
            "To provide, maintain, and improve our Services",
            "To process transactions and manage your account",
            "To communicate with you about your account, our Services, and updates",
            "To train and improve our AI models and algorithms",
            "To personalize your experience and provide relevant content",
            "To detect, prevent, and address technical issues and security threats",
            "To comply with legal obligations and enforce our terms",
            "To conduct research and analytics to improve our Services"
          ]} />
        </LegalSection>

        <LegalSection title="4. Data Sharing and Disclosure">
          <LegalParagraph>
            We do not sell your personal information. We may share your information in the following circumstances:
          </LegalParagraph>
          <LegalList items={[
            "With service providers and vendors who assist us in operating our Services (under strict confidentiality agreements)",
            "When required by law, court order, or governmental authority",
            "To protect our rights, property, or safety, or that of our users",
            "In connection with a merger, acquisition, or sale of assets (with notice to users)",
            "With your explicit consent or at your direction"
          ]} />
          <LegalParagraph>
            We may share aggregated, anonymized data that cannot identify you for research, analytics, or business purposes.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="5. Data Security">
          <LegalParagraph>
            We implement industry-standard security measures to protect your information, including:
          </LegalParagraph>
          <LegalList items={[
            "Encryption of data in transit and at rest",
            "Access controls and authentication mechanisms",
            "Regular security assessments and vulnerability testing",
            "Employee training on data protection and privacy",
            "Compliance with security standards and best practices"
          ]} />
          <LegalParagraph>
            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="6. Your Rights and Choices">
          <LegalParagraph>
            Depending on your location, you may have the following rights regarding your personal information:
          </LegalParagraph>
          <LegalList items={[
            "Access: Request access to your personal information",
            "Correction: Request correction of inaccurate or incomplete data",
            "Deletion: Request deletion of your personal information",
            "Portability: Request transfer of your data to another service",
            "Objection: Object to certain processing activities",
            "Restriction: Request restriction of processing",
            "Withdraw Consent: Withdraw consent where processing is based on consent"
          ]} />
          <LegalParagraph>
            To exercise these rights, please contact us at contact@esap.ai. We will respond to your request within a reasonable timeframe and in accordance with applicable law.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="7. Cookies and Tracking Technologies">
          <LegalParagraph>
            We use cookies, web beacons, and similar tracking technologies to collect information about your interactions with our Services. These technologies help us:
          </LegalParagraph>
          <LegalList items={[
            "Remember your preferences and settings",
            "Analyze usage patterns and improve our Services",
            "Provide personalized content and features",
            "Ensure security and prevent fraud"
          ]} />
          <LegalParagraph>
            You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our Services.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="8. International Data Transfers">
          <LegalParagraph>
            Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We take appropriate safeguards to ensure your information receives adequate protection, including:
          </LegalParagraph>
          <LegalList items={[
            "Standard contractual clauses approved by data protection authorities",
            "Adequacy decisions by relevant authorities",
            "Other appropriate legal mechanisms"
          ]} />
        </LegalSection>

        <LegalSection title="9. Data Retention">
          <LegalParagraph>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="10. Children's Privacy">
          <LegalParagraph>
            Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="11. Third-Party Links and Services">
          <LegalParagraph>
            Our Services may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="12. Changes to This Privacy Policy">
          <LegalParagraph>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our Services after such changes constitutes acceptance of the updated Privacy Policy.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="13. Contact Us">
          <LegalParagraph>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </LegalParagraph>
          <div className="mt-6 p-6 md:p-8 rounded-2xl bg-white-opacity-5 border border-white-opacity-10 space-y-3 text-light-gray-90">
            <p className="flex flex-col sm:flex-row sm:items-center gap-2">
              <strong className="text-primary font-semibold min-w-[80px]">Email:</strong>
              <a href="mailto:contact@esap.ai" className="text-primary hover:underline transition-colors">
                contact@esap.ai
              </a>
            </p>
            <p className="flex flex-col sm:flex-row sm:items-start gap-2">
              <strong className="text-primary font-semibold min-w-[80px]">Address:</strong>
              <span>ESAP AI, 7404, King Abdul Aziz Road 4340, Riyadh 12282, Kingdom of Saudi Arabia</span>
            </p>
          </div>
        </LegalSection>
      </LegalPage>
    </main>
  );
}

