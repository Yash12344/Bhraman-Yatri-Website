import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { HERO_SLIDES, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE.name} — call, WhatsApp or email us to plan your Himalayan trek.`,
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: `Contact Us | ${SITE.name}`,
    description: `Get in touch with ${SITE.name} to plan your Himalayan trek.`,
    url: `${SITE.url}/contact`,
    images: [HERO_SLIDES[2].image],
  },
};

export default function ContactPage() {
  const details = [
    { icon: MapPin, label: "Address", value: SITE.address, href: null },
    { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Clock, label: "Hours", value: "Mon – Sun, 9:00 AM – 8:00 PM", href: null },
  ];

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Questions about a trek, a date or your fitness? Ask away."
        image={HERO_SLIDES[2].image}
        imageAlt={HERO_SLIDES[2].imageAlt}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <section className="py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                  Get In Touch
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Our team is on the trail as often as you are — WhatsApp usually
                  gets the fastest reply.
                </p>
              </div>

              <ul className="space-y-4">
                {details.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <li key={detail.label} className="flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          {detail.label}
                        </p>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="text-sm font-semibold text-gray-900 transition-colors hover:text-saffron-600"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-gray-900">
                            {detail.value}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-whatsapp shadow-none hover:bg-[#1eb455]"
                  tabIndex={-1}
                >
                  <WhatsAppIcon className="size-5" />
                  Chat On WhatsApp
                </Button>
              </a>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_16px_40px_-26px_rgba(0,0,0,0.3)] md:p-8">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                Send Us A Message
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                We reply within 24 hours.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
