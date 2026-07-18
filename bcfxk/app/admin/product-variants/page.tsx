'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductVariant(){
  const[product_id, setProductId] = useState("");
  const[size, setSize] = useState("");
  const[color, setColor] = useState("");
  const[price, setPrice] = useState("");
  const[stock, setStock] = useState("");
  const[sku, setSku] = useState("");
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");
  const router = useRouter();

  async function addProductVariant(e: React.FormEvent){
    try{
      e.preventDefault();
      setError("");
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/product-variants`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({product_id, size, color, price, stock, sku})
      });
      if (!res.ok) {
        setError("Fetch Failed")
        setLoading(false)
        return;
      }

      router.push("/admin")

    }
     catch(error) {
      setError("Something went wrong, Try again later")
    }
  }
   
  return (
    <div className="min-h-screen font-[family-name:var(--font-mono)] px-6 py-24">
      <main className="mx-auto max-w-sm">
        <h1 className="text-3xl font-[family-name:var(--font-display)] tracking-widest font-black uppercase-mb-2">
          Add Product
        </h1>

        <div className="h-px w-12 bg-[var(--accent)] mb-5" />
          <form onSubmit={addProductVariant} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px]text-[var(--text-muted)] uppercase">Product ID</label>
              <input 
              type="text"
              value={product_id}
              onChange={(e)=> setProductId(e.target.value)}
              className="
              bf-[var(--surface)]
              border
              border-[var(--border)]
              px-4 py-3
              text-sm
              text-[var(--text)]
              outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px]text-[var(--text-muted)] uppercase">Size</label>
              <input 
              type="text"
              value={size}
              onChange={(e)=> setSize(e.target.value)}
              className="
              bf-[var(--surface)]
              border
              border-[var(--border)]
              px-4 py-3
              text-sm
              text-[var(--text)]
              outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px]text-[var(--text-muted)] uppercase">Color</label>
              <input 
              type="text"
              value={color}
              onChange={(e)=> setColor(e.target.value)}
              className="
              bf-[var(--surface)]
              border
              border-[var(--border)]
              px-4 py-3
              text-sm
              text-[var(--text)]
              outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px]text-[var(--text-muted)] uppercase">Price</label>
              <input 
              type="text"
              value={price}
              onChange={(e)=> setPrice(e.target.value)}
              className="
              bf-[var(--surface)]
              border
              border-[var(--border)]
              px-4 py-3
              text-sm
              text-[var(--text)]
              outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px]text-[var(--text-muted)] uppercase">Stock</label>
              <input 
              type="text"
              value={stock}
              onChange={(e)=> setStock(e.target.value)}
              className="
              bf-[var(--surface)]
              border
              border-[var(--border)]
              px-4 py-3
              text-sm
              text-[var(--text)]
              outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px]text-[var(--text-muted)] uppercase">SKU</label>
              <input 
              type="text"
              value={sku}
              onChange={(e)=> setSku(e.target.value)}
              className="
              bf-[var(--surface)]
              border
              border-[var(--border)]
              px-4 py-3
              text-sm
              text-[var(--text)]
              outline-none" />
            </div>

            {error && (<p>{error}</p>)}
            <button type="submit" disabled={loading}
            className="mt-2 bg-[var(--accent)] text-white py-3 text-xl tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 rounded-md">
              {loading? "Loading": "Add Product"}</button>
          </form>
      </main>
    </div>
  )
}