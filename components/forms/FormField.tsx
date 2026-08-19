import type { LucideIcon } from "lucide-react";

/** Leading icon shared by every text field in the site's forms. */
export function FieldIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <Icon
      aria-hidden="true"
      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400"
    />
  );
}

/**
 * Submission failure notice, shown above the submit button so the visitor
 * keeps everything they typed and can simply press send again.
 */
export function FormAlert({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700"
    >
      {message}
    </p>
  );
}

/** Inline validation message, wired to its input via aria-describedby. */
export function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-500">
      {message}
    </p>
  );
}
