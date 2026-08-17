import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { BookingPaymentForm } from "@/components/booking/BookingPaymentForm";
import { getLogo } from "@/lib/branding";
import { getTrekBySlug } from "@/lib/treks";
import { BOOKING, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Booking Form",
  description: `Book your Himalayan trek with ${SITE.name}. Confirm your slot and pay the booking amount online.`,
  alternates: { canonical: `${SITE.url}/booking` },
  // A transactional form has nothing to offer search results.
  robots: { index: false, follow: true },
};

interface BookingPageProps {
  searchParams: Promise<{ trek?: string }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { trek: trekSlug } = await searchParams;
  // Arriving from a trek page prefills the trek and its starting price.
  const trek = trekSlug ? getTrekBySlug(trekSlug) : undefined;
  const logo = getLogo("dark");

  return (
    <section className="bg-neutral-50 py-10 lg:py-16">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Left: who you are booking with, and the terms */}
          <div className="lg:pt-4">
            <Logo logo={logo} />

            <h1 className="mt-10 text-3xl font-bold uppercase tracking-tight text-forest-800 sm:text-4xl">
              Booking Form
            </h1>
            <span
              aria-hidden="true"
              className="mt-4 block h-1 w-10 rounded-full bg-saffron-500"
            />

            <p className="mt-7 text-base font-semibold text-gray-800">
              Thank you for choosing{" "}
              <span className="uppercase text-saffron-600">{SITE.name}</span>.
            </p>
            <p className="mt-2 text-base font-semibold leading-relaxed text-gray-800">
              We will get back to you shortly. In the meantime, to confirm your
              booking with us, you can complete the form here.
            </p>

            <ul className="mt-6 space-y-4">
              {BOOKING.notes.map((note) => (
                <li
                  key={note}
                  className="text-[15px] font-semibold leading-relaxed text-gray-800"
                >
                  <span aria-hidden="true" className="mr-1.5">
                    •
                  </span>
                  {note}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <h2 className="text-[15px] font-bold text-gray-900">Contact Us:</h2>
              <ul className="mt-3 space-y-3 text-[15px]">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-saffron-600 transition-colors hover:text-saffron-700"
                  >
                    <Mail aria-hidden="true" className="size-4 text-gray-700" />
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.phoneHref}
                    className="flex items-center gap-3 text-saffron-600 transition-colors hover:text-saffron-700"
                  >
                    <Phone aria-hidden="true" className="size-4 text-gray-700" />
                    {SITE.phone}
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-9">
              <h2 className="text-[15px] font-bold text-gray-900">
                Terms &amp; Conditions:
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
                Read our{" "}
                <Link
                  href={BOOKING.termsUrl}
                  className="text-saffron-600 underline-offset-4 hover:underline"
                >
                  Terms and Conditions
                </Link>
                . By proceeding with your booking, you acknowledge that you have
                read, understood, and agreed to them.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
                You agree to share the information entered on this page with{" "}
                {SITE.name}, adhering to applicable laws.
              </p>
            </div>
          </div>

          {/* Right: the form itself, on its own raised card */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)]">
            <BookingPaymentForm
              defaultTrek={trek?.name ?? ""}
              defaultFee={trek?.startingPrice}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
