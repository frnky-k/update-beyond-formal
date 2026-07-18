import Link from "next/link";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  
};


async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}



export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-24 font-[family-name:var(--font-body)]">
      <main className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          BFCxK Products
        </h1>

        {products.length === 0 ? (
          <p className="mt-8 text-zinc-600 dark:text-zinc-400">
            No products yet.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 bg-yellow-600"
              > 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <h2 className="text-lg font-medium text-black dark:text-zinc-50">
                  {product.name}
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {product.category}
                  </p>
                </h2>
                <h2 className="text-3xl font-[family-name:var(--font-display)] items-center py-4">${product.price}</h2>
              </div>
                
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}