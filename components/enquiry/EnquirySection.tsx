import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";

export function EnquirySection() {
  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="pb-10">
      <Container>
        <FadeIn>
          <div className="grid overflow-hidden rounded-3xl bg-neutral-100 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.25)] lg:grid-cols-[333px_1fr]">
            <div className="relative px-7 py-9">
              <Image
                src="/images/enquiry-mountain-range.jpg"
                alt="Faded mountain range backdrop"
                fill
                sizes="(max-width: 1024px) 100vw, 333px"
                className="object-cover opacity-60"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/35 to-white/55"
              />
              <div className="relative">
                <h2
                  id="enquiry-heading"
                  className="text-xl font-bold uppercase tracking-wide text-gray-900"
                >
                  Plan Your Adventure
                </h2>
                <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-gray-600">
                  Fill the form and we will get back to you!
                </p>
              </div>
            </div>
            <div className="bg-neutral-100 px-6 py-4">
              <EnquiryForm />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
