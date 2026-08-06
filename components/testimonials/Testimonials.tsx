import { Quote, Star } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FadeIn } from "@/components/shared/FadeIn";
import { TESTIMONIALS } from "@/lib/data";

/**
 * Renders nothing until `data/testimonials.json` holds real reviews — reviews
 * must come from actual customers, so none are shipped as placeholders.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="bg-neutral-50 py-12">
      <Container>
        <FadeIn>
          <SectionTitle
            id="testimonials-heading"
            title="What Our Trekkers Say"
            subtitle="Stories from the people who walked with us."
          />
        </FadeIn>

        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <li key={testimonial.id}>
              <FadeIn delay={index * 0.08}>
                <figure className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]">
                  <Quote
                    aria-hidden="true"
                    className="size-7 shrink-0 text-saffron-400"
                  />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                    {testimonial.quote}
                  </blockquote>
                  <div
                    className="mt-4 flex items-center gap-0.5"
                    aria-label={`Rated ${testimonial.rating} out of 5`}
                  >
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Star
                        key={starIndex}
                        aria-hidden="true"
                        className={
                          starIndex < testimonial.rating
                            ? "size-4 fill-saffron-500 text-saffron-500"
                            : "size-4 text-neutral-300"
                        }
                      />
                    ))}
                  </div>
                  <figcaption className="mt-3 border-t border-neutral-100 pt-3">
                    <span className="block text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {testimonial.trek} · {testimonial.location}
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
