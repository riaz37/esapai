export type LegalLocale = "en" | "ar";

export interface LocalizedLegalSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LocalizedLegalPage {
  title: string;
  description: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  contactEmail: string;
  sections: LocalizedLegalSection[];
}

const PRIVACY_EMAIL = "privacy@esap.ai";
const LEGAL_EMAIL = "legal@esap.ai";

export const legalPages: Record<"privacy" | "terms", Record<LegalLocale, LocalizedLegalPage>> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      description:
        "ESAP AI Privacy Policy - Learn how we collect, use, and protect your personal information.",
      lastUpdated: "June 23, 2026",
      lastUpdatedLabel: "Last updated:",
      contactEmail: PRIVACY_EMAIL,
      sections: [
        {
          title: "Introduction",
          paragraphs: [
            "ESAP AI respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, contact our team, or use our services.",
          ],
        },
        {
          title: "Information We Collect",
          paragraphs: [
            "We may collect information you provide directly, such as your name, business email, company details, message content, and any other information submitted through our contact forms or business communications.",
            "We may also collect limited technical information, such as browser type, device information, pages visited, and general usage data to help us improve performance, security, and user experience.",
          ],
        },
        {
          title: "How We Use Information",
          items: [
            "Respond to inquiries, requests, and business communications.",
            "Provide, maintain, and improve our website, products, and services.",
            "Understand customer needs and develop relevant AI solutions.",
            "Protect our website, systems, users, and business operations from misuse or security threats.",
            "Comply with applicable legal, regulatory, and contractual obligations.",
          ],
        },
        {
          title: "Sharing Information",
          paragraphs: [
            "We do not sell your personal information. We may share information with trusted service providers who help operate our website, process inquiries, host systems, provide analytics, or support business operations. These providers are expected to protect information and use it only for authorized purposes.",
          ],
        },
        {
          title: "Data Security",
          paragraphs: [
            "We use reasonable technical and organizational safeguards to protect information from unauthorized access, loss, misuse, disclosure, alteration, or destruction. No internet-based service can be guaranteed to be completely secure, but we work to keep our safeguards appropriate to the nature of the information we process.",
          ],
        },
        {
          title: "Your Choices",
          paragraphs: [
            "You may request access, correction, or deletion of personal information you have provided to us, subject to applicable legal and business requirements. You may also ask us to stop using your information for certain communications.",
          ],
        },
        {
          title: "Contact",
          paragraphs: [
            `For privacy questions, data requests, or any other inquiry, please contact us at ${PRIVACY_EMAIL}.`,
          ],
        },
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      description:
        "سياسة خصوصية إيساب للذكاء الاصطناعي - تعرّف على كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها.",
      lastUpdated: "23 يونيو 2026",
      lastUpdatedLabel: "آخر تحديث:",
      contactEmail: PRIVACY_EMAIL,
      sections: [
        {
          title: "مقدمة",
          paragraphs: [
            "تحترم إيساب للذكاء الاصطناعي خصوصيتك وتلتزم بحماية المعلومات الشخصية التي تشاركها معنا. توضّح سياسة الخصوصية هذه كيفية جمع المعلومات واستخدامها وتخزينها وحمايتها عند زيارة موقعنا أو التواصل مع فريقنا أو استخدام خدماتنا.",
          ],
        },
        {
          title: "المعلومات التي نجمعها",
          paragraphs: [
            "قد نجمع المعلومات التي تقدمها مباشرة، مثل الاسم والبريد الإلكتروني المهني وبيانات الشركة ومحتوى الرسالة وأي معلومات أخرى يتم إرسالها عبر نماذج التواصل أو المراسلات التجارية.",
            "قد نجمع أيضًا معلومات تقنية محدودة، مثل نوع المتصفح ومعلومات الجهاز والصفحات التي تمت زيارتها وبيانات الاستخدام العامة، وذلك لتحسين الأداء والأمان وتجربة المستخدم.",
          ],
        },
        {
          title: "كيفية استخدام المعلومات",
          items: [
            "الرد على الاستفسارات والطلبات والمراسلات التجارية.",
            "توفير موقعنا ومنتجاتنا وخدماتنا وصيانتها وتحسينها.",
            "فهم احتياجات العملاء وتطوير حلول ذكاء اصطناعي مناسبة.",
            "حماية موقعنا وأنظمتنا ومستخدمينا وعملياتنا من إساءة الاستخدام أو التهديدات الأمنية.",
            "الامتثال للالتزامات القانونية والتنظيمية والتعاقدية المعمول بها.",
          ],
        },
        {
          title: "مشاركة المعلومات",
          paragraphs: [
            "نحن لا نبيع معلوماتك الشخصية. قد نشارك المعلومات مع مزودي خدمات موثوقين يساعدوننا في تشغيل الموقع أو معالجة الاستفسارات أو استضافة الأنظمة أو تقديم التحليلات أو دعم العمليات التجارية. ويُتوقع من هؤلاء المزودين حماية المعلومات واستخدامها للأغراض المصرح بها فقط.",
          ],
        },
        {
          title: "أمان البيانات",
          paragraphs: [
            "نستخدم ضوابط تقنية وتنظيمية معقولة لحماية المعلومات من الوصول غير المصرح به أو الفقدان أو سوء الاستخدام أو الإفصاح أو التعديل أو الإتلاف. لا يمكن ضمان الأمان الكامل لأي خدمة عبر الإنترنت، لكننا نعمل على إبقاء إجراءات الحماية مناسبة لطبيعة المعلومات التي نعالجها.",
          ],
        },
        {
          title: "خياراتك",
          paragraphs: [
            "يمكنك طلب الوصول إلى المعلومات الشخصية التي قدمتها لنا أو تصحيحها أو حذفها، وفقًا للمتطلبات القانونية والتجارية المعمول بها. كما يمكنك طلب إيقاف استخدام معلوماتك في بعض أنواع التواصل.",
          ],
        },
        {
          title: "التواصل",
          paragraphs: [
            `لأسئلة الخصوصية أو طلبات البيانات أو أي استفسار آخر، يرجى التواصل معنا عبر ${PRIVACY_EMAIL}.`,
          ],
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms & Conditions",
      description:
        "ESAP AI Terms & Conditions - Read our terms of service for using our AI platform and services.",
      lastUpdated: "June 23, 2026",
      lastUpdatedLabel: "Last updated:",
      contactEmail: LEGAL_EMAIL,
      sections: [
        {
          title: "Agreement to Terms",
          paragraphs: [
            "By accessing the ESAP AI website or engaging with our products and services, you agree to these Terms & Conditions. If you do not agree with these terms, please do not use our website or services.",
          ],
        },
        {
          title: "Use of Our Services",
          paragraphs: [
            "You agree to use our website, products, and services only for lawful business purposes and in a way that does not interfere with their operation, security, or availability.",
          ],
          items: [
            "Do not attempt to gain unauthorized access to our systems or data.",
            "Do not misuse, reverse engineer, disrupt, or overload our services.",
            "Do not submit unlawful, harmful, misleading, or infringing content.",
          ],
        },
        {
          title: "Business Communications",
          paragraphs: [
            "When you submit a contact form or communicate with us, you confirm that the information you provide is accurate and that we may use it to respond to your inquiry, qualify your request, and provide relevant business information.",
          ],
        },
        {
          title: "Intellectual Property",
          paragraphs: [
            "All content, branding, software, designs, product names, and materials on this website are owned by ESAP AI or its licensors unless otherwise stated. You may not copy, modify, distribute, or use these materials without prior written permission.",
          ],
        },
        {
          title: "Third-Party Services",
          paragraphs: [
            "Our website and services may reference or integrate with third-party tools, platforms, or links. ESAP AI is not responsible for the content, availability, security, or practices of third-party services.",
          ],
        },
        {
          title: "Limitation of Liability",
          paragraphs: [
            "To the fullest extent permitted by law, ESAP AI is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.",
          ],
        },
        {
          title: "Changes to These Terms",
          paragraphs: [
            "We may update these Terms & Conditions from time to time. The updated version will be posted on this page with a revised last updated date.",
          ],
        },
        {
          title: "Contact",
          paragraphs: [
            `For questions about these terms or any other inquiry, please contact us at ${LEGAL_EMAIL}.`,
          ],
        },
      ],
    },
    ar: {
      title: "الشروط والأحكام",
      description:
        "شروط وأحكام إيساب للذكاء الاصطناعي - اقرأ شروط الخدمة الخاصة باستخدام منصتنا وخدماتنا.",
      lastUpdated: "23 يونيو 2026",
      lastUpdatedLabel: "آخر تحديث:",
      contactEmail: LEGAL_EMAIL,
      sections: [
        {
          title: "الموافقة على الشروط",
          paragraphs: [
            "من خلال الوصول إلى موقع إيساب للذكاء الاصطناعي أو التعامل مع منتجاتنا وخدماتنا، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام موقعنا أو خدماتنا.",
          ],
        },
        {
          title: "استخدام خدماتنا",
          paragraphs: [
            "توافق على استخدام موقعنا ومنتجاتنا وخدماتنا للأغراض التجارية المشروعة فقط وبطريقة لا تؤثر على تشغيلها أو أمانها أو توفرها.",
          ],
          items: [
            "عدم محاولة الوصول غير المصرح به إلى أنظمتنا أو بياناتنا.",
            "عدم إساءة استخدام خدماتنا أو عكس هندستها أو تعطيلها أو تحميلها بشكل مفرط.",
            "عدم إرسال محتوى غير قانوني أو ضار أو مضلل أو منتهك للحقوق.",
          ],
        },
        {
          title: "المراسلات التجارية",
          paragraphs: [
            "عند إرسال نموذج تواصل أو مراسلتنا، فإنك تؤكد أن المعلومات التي تقدمها دقيقة، وأنه يجوز لنا استخدامها للرد على استفسارك وتقييم طلبك وتقديم معلومات تجارية ذات صلة.",
          ],
        },
        {
          title: "الملكية الفكرية",
          paragraphs: [
            "جميع المحتويات والعلامات التجارية والبرمجيات والتصاميم وأسماء المنتجات والمواد الموجودة على هذا الموقع مملوكة لإيساب للذكاء الاصطناعي أو للجهات المرخصة لها ما لم يُذكر خلاف ذلك. لا يجوز نسخ هذه المواد أو تعديلها أو توزيعها أو استخدامها دون إذن كتابي مسبق.",
          ],
        },
        {
          title: "خدمات الطرف الثالث",
          paragraphs: [
            "قد يشير موقعنا وخدماتنا إلى أدوات أو منصات أو روابط تابعة لأطراف ثالثة أو يتكامل معها. لا تتحمل إيساب للذكاء الاصطناعي مسؤولية محتوى خدمات الطرف الثالث أو توفرها أو أمانها أو ممارساتها.",
          ],
        },
        {
          title: "حدود المسؤولية",
          paragraphs: [
            "إلى أقصى حد يسمح به القانون، لا تتحمل إيساب للذكاء الاصطناعي مسؤولية أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية تنشأ عن استخدامك لموقعنا أو خدماتنا.",
          ],
        },
        {
          title: "تغييرات على هذه الشروط",
          paragraphs: [
            "قد نقوم بتحديث هذه الشروط والأحكام من وقت لآخر. سيتم نشر النسخة المحدثة على هذه الصفحة مع تاريخ آخر تحديث معدل.",
          ],
        },
        {
          title: "التواصل",
          paragraphs: [
            `لأي أسئلة حول هذه الشروط أو أي استفسار آخر، يرجى التواصل معنا عبر ${LEGAL_EMAIL}.`,
          ],
        },
      ],
    },
  },
};

export function getLegalPage(page: "privacy" | "terms", locale: string) {
  return legalPages[page][locale === "ar" ? "ar" : "en"];
}
