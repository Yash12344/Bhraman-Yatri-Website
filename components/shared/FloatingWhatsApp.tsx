import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { SITE } from "@/lib/data";

export function FloatingWhatsApp() {
  return (
    <a
      href={SITE.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bhraman Yatri on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-black/20 transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
