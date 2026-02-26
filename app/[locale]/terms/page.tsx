import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalParagraph, LegalList } from "@/components/shared/legal-page";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions",
  description:
    "ESAP AI Terms & Conditions - Read our terms of service for using our AI platform and services. Understand your rights and responsibilities.",
  path: "/terms",
});

export default function TermsPage() {
  const lastUpdated = "December 2025";

  return (
    <main className="relative">
      <LegalPage title="Terms & Conditions" lastUpdated={lastUpdated}>
        <LegalSection title="1. Acceptance of Terms">
          <LegalParagraph>
            Welcome to ESAP AI. These Terms & Conditions ("Terms") govern your access to and use of ESAP AI's services, including our AI platform, voice-activated ERP systems, enterprise security solutions, and related services (collectively, the "Services").
          </LegalParagraph>
          <LegalParagraph>
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our Services. These Terms constitute a legally binding agreement between you and ESAP AI.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="2. Description of Services">
          <LegalParagraph>
            ESAP AI provides an artificial intelligence platform designed to protect and enhance enterprise operations. Our Services include:
          </LegalParagraph>
          <LegalList items={[
            "AI-powered security solutions for enterprise protection",
            "Voice-activated Enterprise Resource Planning (ERP) systems",
            "AI automation and workflow management tools",
            "Integration services and API access",
            "Consulting and support services",
            "Other AI-related products and services as described on our website"
          ]} />
          <LegalParagraph>
            We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time, with or without notice.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="3. User Accounts and Registration">
          <LegalParagraph>
            To access certain features of our Services, you may be required to create an account. When creating an account, you agree to:
          </LegalParagraph>
          <LegalList items={[
            "Provide accurate, current, and complete information",
            "Maintain and promptly update your account information",
            "Maintain the security of your account credentials",
            "Accept responsibility for all activities under your account",
            "Notify us immediately of any unauthorized access or use"
          ]} />
          <LegalParagraph>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. We are not liable for any loss or damage arising from your failure to protect your account information.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="4. Acceptable Use Policy">
          <LegalParagraph>
            You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:
          </LegalParagraph>
          <LegalList items={[
            "Violate any applicable laws, regulations, or third-party rights",
            "Use the Services to transmit malicious code, viruses, or harmful data",
            "Attempt to gain unauthorized access to our systems or other users' accounts",
            "Interfere with or disrupt the integrity or performance of our Services",
            "Use the Services to process or store illegal content or data",
            "Reverse engineer, decompile, or disassemble any part of our Services",
            "Use automated systems to access our Services without authorization",
            "Impersonate any person or entity or misrepresent your affiliation",
            "Collect or harvest information about other users without consent",
            "Use the Services for any competitive intelligence or benchmarking purposes"
          ]} />
          <LegalParagraph>
            Violation of this Acceptable Use Policy may result in immediate termination of your access to our Services and may subject you to legal liability.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="5. Intellectual Property Rights">
          <LegalParagraph>
            The Services, including all content, features, functionality, software, algorithms, and technology, are owned by ESAP AI and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
          </LegalParagraph>
          <LegalParagraph>
            Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for your internal business purposes. This license does not include the right to:
          </LegalParagraph>
          <LegalList items={[
            "Resell, sublicense, or distribute the Services",
            "Modify, adapt, or create derivative works",
            "Remove or alter any proprietary notices",
            "Use our trademarks, logos, or branding without permission"
          ]} />
          <LegalParagraph>
            You retain ownership of any data, content, or materials you provide to us. By using our Services, you grant us a license to use, process, and store your data as necessary to provide and improve our Services, subject to our Privacy Policy.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="6. Payment Terms">
          <LegalParagraph>
            Certain features of our Services may require payment. When you purchase a paid subscription or service:
          </LegalParagraph>
          <LegalList items={[
            "You agree to pay all fees as described at the time of purchase",
            "Fees are billed in advance on a recurring basis (monthly or annually)",
            "All fees are non-refundable except as required by law or as explicitly stated",
            "We reserve the right to change our pricing with 30 days' notice",
            "You are responsible for any taxes applicable to your purchase",
            "Failure to pay may result in suspension or termination of your account"
          ]} />
          <LegalParagraph>
            Refunds, if applicable, will be processed according to our refund policy, which may vary by service type.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="7. Service Availability and Modifications">
          <LegalParagraph>
            We strive to maintain high availability of our Services but do not guarantee uninterrupted or error-free operation. We may:
          </LegalParagraph>
          <LegalList items={[
            "Perform scheduled maintenance with reasonable notice",
            "Make changes to our Services at any time",
            "Suspend or terminate Services for violations of these Terms",
            "Modify or discontinue features with or without notice"
          ]} />
          <LegalParagraph>
            We are not liable for any downtime, interruptions, or service modifications.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="8. AI-Generated Content and Outputs">
          <LegalParagraph>
            Our Services use artificial intelligence and machine learning technologies. You acknowledge that:
          </LegalParagraph>
          <LegalList items={[
            "AI-generated outputs may contain errors or inaccuracies",
            "You should verify and review all AI-generated content before use",
            "We do not guarantee the accuracy, completeness, or reliability of AI outputs",
            "You are responsible for your use of AI-generated content",
            "AI models may be updated or changed, affecting output quality"
          ]} />
          <LegalParagraph>
            You should not rely solely on AI-generated content for critical business decisions without appropriate human oversight and verification.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="9. Data and Privacy">
          <LegalParagraph>
            Your use of our Services is also governed by our Privacy Policy, which explains how we collect, use, and protect your information. By using our Services, you consent to the collection and use of your information as described in our Privacy Policy.
          </LegalParagraph>
          <LegalParagraph>
            You are responsible for ensuring that any data you provide to us complies with applicable laws and does not infringe on third-party rights. You represent that you have the right to provide any data you submit to our Services.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="10. Limitation of Liability">
          <LegalParagraph>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ESAP AI AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF OR INABILITY TO USE OUR SERVICES.
          </LegalParagraph>
          <LegalParagraph>
            OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
          </LegalParagraph>
          <LegalParagraph>
            Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="11. Indemnification">
          <LegalParagraph>
            You agree to indemnify, defend, and hold harmless ESAP AI, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or relating to:
          </LegalParagraph>
          <LegalList items={[
            "Your use of our Services",
            "Your violation of these Terms",
            "Your violation of any third-party rights",
            "Any data or content you provide to us"
          ]} />
        </LegalSection>

        <LegalSection title="12. Termination">
          <LegalParagraph>
            We may terminate or suspend your access to our Services immediately, without prior notice, for any reason, including if you breach these Terms.
          </LegalParagraph>
          <LegalParagraph>
            You may terminate your account at any time by contacting us or using account management features. Upon termination:
          </LegalParagraph>
          <LegalList items={[
            "Your right to use the Services will immediately cease",
            "We may delete your account and data, subject to our data retention policies",
            "Provisions that by their nature should survive termination will remain in effect"
          ]} />
        </LegalSection>

        <LegalSection title="13. Dispute Resolution">
          <LegalParagraph>
            If you have any dispute with us, you agree to first contact us at legal@esap.ai to attempt to resolve the dispute informally.
          </LegalParagraph>
          <LegalParagraph>
            If we cannot resolve the dispute informally, you agree that any disputes arising out of or relating to these Terms or our Services will be resolved through binding arbitration in accordance with the rules of the Saudi Center for Commercial Arbitration (SCCA), except that you may bring claims in small claims court if your claims qualify.
          </LegalParagraph>
          <LegalParagraph>
            You waive any right to participate in a class-action lawsuit or class-wide arbitration against us.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="14. Governing Law">
          <LegalParagraph>
            These Terms shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts of Riyadh, Kingdom of Saudi Arabia.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="15. Changes to Terms">
          <LegalParagraph>
            We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of our Services after such changes constitutes acceptance of the updated Terms.
          </LegalParagraph>
          <LegalParagraph>
            If you do not agree to the modified Terms, you must stop using our Services.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="16. Miscellaneous">
          <div className="space-y-4">
            <div>
              <strong className="text-primary font-semibold text-lg">Entire Agreement:</strong>
              <LegalParagraph>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and ESAP AI regarding our Services.
              </LegalParagraph>
            </div>
            <div>
              <strong className="text-primary font-semibold text-lg">Severability:</strong>
              <LegalParagraph>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
              </LegalParagraph>
            </div>
            <div>
              <strong className="text-primary font-semibold text-lg">Waiver:</strong>
              <LegalParagraph>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of such right or provision.
              </LegalParagraph>
            </div>
            <div>
              <strong className="text-primary font-semibold text-lg">Assignment:</strong>
              <LegalParagraph>
                You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction.
              </LegalParagraph>
            </div>
          </div>
        </LegalSection>

        <LegalSection title="17. Contact Information">
          <LegalParagraph>
            If you have questions about these Terms, please contact us:
          </LegalParagraph>
          <div className="mt-6 p-6 md:p-8 rounded-2xl bg-white-opacity-5 border border-white-opacity-10 space-y-3 text-light-gray-90">
            <p className="flex flex-col sm:flex-row sm:items-center gap-2">
              <strong className="text-primary font-semibold min-w-[80px]">Email:</strong>
              <a href="mailto:legal@esap.ai" className="text-primary hover:underline transition-colors">
                legal@esap.ai
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

