import { Info } from "lucide-react";
import type { LegalDocument } from "@/lib/legal";
import { formatDate } from "@/lib/utils";

/** Shared renderer for the privacy policy and the terms — one layout, two documents. */
export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-gray-500">
        Last updated{" "}
        <time dateTime={doc.lastUpdated}>{formatDate(doc.lastUpdated)}</time>
      </p>
      <p className="mt-4 text-base leading-relaxed text-gray-600">
        {doc.summary}
      </p>

      {/* Jump links, so a long document stays navigable. */}
      <nav aria-label="On this page" className="mt-8 rounded-2xl bg-neutral-50 p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          On this page
        </h2>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {doc.sections.map((section, index) => (
            <li key={section.heading}>
              <a
                href={`#${sectionId(section.heading)}`}
                className="text-sm text-gray-700 transition-colors hover:text-saffron-600"
              >
                <span className="text-gray-400">{index + 1}.</span>{" "}
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {doc.sections.map((section, index) => (
          <section
            key={section.heading}
            id={sectionId(section.heading)}
            aria-labelledby={`${sectionId(section.heading)}-heading`}
            className="scroll-mt-28"
          >
            <h2
              id={`${sectionId(section.heading)}-heading`}
              className="text-xl font-bold text-gray-900"
            >
              <span className="text-saffron-500">{index + 1}.</span>{" "}
              {section.heading}
            </h2>

            {section.body?.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-base leading-[1.8] text-gray-600"
              >
                {paragraph}
              </p>
            ))}

            {section.table && (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      {section.table.columns.map((column) => (
                        <th
                          key={column}
                          scope="col"
                          className="pb-3 pr-4 font-semibold text-gray-900"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map(([left, right]) => (
                      <tr key={left} className="border-b border-neutral-100">
                        <td className="py-3 pr-4 text-gray-700">{left}</td>
                        <td className="py-3 font-medium text-gray-900">
                          {right}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.list && (
              <ul className="mt-4 space-y-2.5">
                {section.list.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-gray-600"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-saffron-400"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.note && (
              <p className="mt-5 flex gap-3 rounded-xl bg-forest-50 px-4 py-3 text-sm leading-relaxed text-forest-900">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>{section.note}</span>
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

/** "If you cancel" -> "if-you-cancel", for anchor links. */
function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
