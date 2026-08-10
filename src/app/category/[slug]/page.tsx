import { use, Suspense } from "react";
import { CategoryView } from "@/components/categories/CategoryView";

export function generateStaticParams() {
  return [
    { slug: "all" },
    { slug: "new-in" },
    { slug: "best-sellers" },
    { slug: "festive" },
    { slug: "sarees" },
    { slug: "lehengas" },
    { slug: "kurtas" },
    { slug: "dresses" },
    { slug: "coord-sets" },
    { slug: "dupattas" },
    { slug: "sale" },
  ];
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return (
    <Suspense fallback={<div className="w-full bg-[#FAF8F5] min-h-screen pt-40 text-center font-sans">Loading collection...</div>}>
      <CategoryView slug={slug} />
    </Suspense>
  );
}
