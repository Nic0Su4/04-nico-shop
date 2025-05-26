export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    gender: Gender;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;

  const searchParamsAwaited = await searchParams;
  const page = searchParamsAwaited.page
    ? parseInt(searchParamsAwaited.page)
    : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<Gender, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Todos",
  };

  // if (id === "kids") {
  //   notFound();
  // }
  return (
    <>
      <Title
        title={`Artículos para ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
