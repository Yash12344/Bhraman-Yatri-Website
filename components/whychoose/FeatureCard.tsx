import type { Feature } from "@/lib/types";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div className="group flex min-h-[63px] items-center justify-center gap-4">
      <Icon
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-[42px] shrink-0 text-gray-900 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-saffron-500"
      />
      <div className="max-w-[124px]">
        <h3 className="text-[15px] font-semibold leading-tight text-gray-900">
          {feature.title}
        </h3>
        <p className="mt-1 text-xs leading-normal text-gray-500">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
