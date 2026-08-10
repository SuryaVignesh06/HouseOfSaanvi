import { use } from "react";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <ProductDetailView slug={slug} />;
}
