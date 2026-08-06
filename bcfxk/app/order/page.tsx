import Link from "next/link";
import { cookies } from "next/headers";

type OrderItem = {
id: string;
product_id: string;
variant_id: string;
quantity:number;
product: {id: string; name: string}; 
unit_price: number;
}

type Order = {
id: string; 
address_id: string; 
total_amount: Float16Array; 
created_at: string; 
items: OrderItem[]; 
}

async function getOrders(): Promise<Order[]> {
    const cookieStore = await cookies()
    const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method:"GET",
      credentials:"include",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Fetch Failed");
    }
    return res.json()
}

export default async function showOrder() {
  const orders = await getOrders();

  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-24 font-[family-name:var(--font-body)]">
      <main className="mx-auto max-w-5xl">


        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          BFCxK orders
        </h1>         

        {orders.length === 0 ? (
          <p className="mt-8 text-zinc-600 dark:text-zinc-400">
            No orders yet.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {orders.map((order) => (
              <Link
                key={order.id}
                href='#'
                className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800 bg-yellow-600"
              > 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <h2 className="text-2xl font-medium text-black dark:text-zinc-50">
                  {order.items[0].product.name}
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {order.items.reduce((sum, item)=> sum + item.quantity, 0)} unit{order.items.reduce((sum, item)=> sum + item.quantity, 0) !== 1 ? "s" : ""}
                  </p>
                </h2>
                <h2 className="text-xl font-[family-name:var(--font-display)] items-center py-4">${order.total_amount}</h2>
              </div>
                
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}