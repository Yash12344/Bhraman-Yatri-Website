import type { Feature } from "@/lib/types";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div className="group flex flex-col items-center text-center">
      <Icon
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-10 text-gray-900 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-saffron-500"
      />
      <h3 className="mt-4 text-[15px] font-semibold text-gray-900">
        {feature.title}
      </h3>
      <p className="mt-1.5 max-w-[170px] text-xs leading-relaxed text-gray-500">
        {feature.description}
      </p>
    </div>
  );
}
