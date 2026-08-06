import { cookies } from "next/headers";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  is_active: boolean;
  slug: string;
  price: number | null;
};

async function getProducts(): Promise<Product[]> {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 px-3">ID</th>
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Category</th>
            <th className="py-2 px-3">Price</th>
            <th className="py-2 px-3">Active</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2 px-3 font-mono text-sm text-[var(--text-muted)]">
                {product.id}
              </td>
              <td className="py-2 px-3">{product.name}</td>
              <td className="py-2 px-3">{product.category}</td>
              <td className="py-2 px-3">
                {product.price ? `$${product.price}` : "—"}
              </td>
              <td className="py-2 px-3">{product.is_active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}