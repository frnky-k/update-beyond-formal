import ProductView from "@/app/products/[slug]/ProductView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    cache: "no-store",
  });
  
  // if (!res.ok) return null;
  // const data = await res.json();

  // // // ROUTE WORKAROUND: If your API returns an array, filter it here before passing to the view
  // // if (Array.isArray(data)) {
  // //   return data.find((item: any) => item.slug === slug) || null;
  // // }

  // return data;

  console.log("STATUS:", res.status);

  const data = await res.json(); // read the body ONCE
  console.log("BODY:", JSON.stringify(data, null, 2));

  if (!res.ok) return null;
  return data; 
} 

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return <div className="p-10 text-red-500">Product not found.</div>;
  }

  return <ProductView product={product} />;
}