"use client";

import type { FormEvent } from "react";
import { BarChart3, Calendar, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { DIFFICULTY_OPTIONS, MONTH_OPTIONS } from "@/lib/data";
import type { SelectOption } from "@/lib/types";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchSelectFieldProps {
  id: string;
  icon: LucideIcon;
  label: string;
  options: SelectOption[];
  className?: string;
}

function SearchSelectField({
  id,
  icon: Icon,
  label,
  options,
  className,
}: SearchSelectFieldProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 lg:border-l lg:border-gray-200 lg:pl-6",
        className
      )}
    >
      <Icon aria-hidden="true" className="size-6 shrink-0 text-forest-700" />
      <div className="relative w-full">
        <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
          {label}
        </label>
        <select
          id={id}
          name={id}
          className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm text-gray-500 focus-visible:outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 size-4 text-gray-500"
        />
      </div>
    </div>
  );
}

export function SearchBar() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document
      .getElementById("popular-treks")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container className="relative z-20 -mt-12 lg:-mt-24">
      <form
        onSubmit={handleSubmit}
        aria-label="Search treks"
        className="flex flex-col gap-5 rounded-2xl bg-white px-6 py-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] lg:h-24 lg:flex-row lg:items-center lg:gap-6 lg:py-7"
      >
        <div className="flex flex-[1.47] items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-forest-700">
            <MapPin aria-hidden="true" className="size-5" />
          </span>
          <div className="w-full">
            <label
              htmlFor="search-destination"
              className="block text-sm font-semibold text-gray-900"
            >
              Where do you want to go?
            </label>
            <input
              id="search-destination"
              name="destination"
              type="text"
              placeholder="Search treks..."
              className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus-visible:outline-none"
            />
          </div>
        </div>

        <SearchSelectField
          id="search-month"
          icon={Calendar}
          label="Select Month"
          options={MONTH_OPTIONS}
          className="flex-[1.18]"
        />
        <SearchSelectField
          id="search-difficulty"
          icon={BarChart3}
          label="Difficulty"
          options={DIFFICULTY_OPTIONS}
          className="flex-1"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="h-[42px] shrink-0 lg:w-[200px]"
        >
          Search Treks
        </Button>
      </form>
    </Container>
  );
}
