'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduct(){
  const[name, setProductName] = useState("");
  const[slug, setSlug] = useState("");
  const[description, setDescription ] = useState("");
  const[category, setCategory] = useState("");
  const[image, setImage] = useState<File | null>(null);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");
  const router = useRouter();

  async function addProduct(e: React.FormEvent){
    try{
      e.preventDefault();
      setError("");
      setLoading(true);
      
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("category", category);
      if (image) formData.append("image", image)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`, {
        method: "POST",
        credentials:"include",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(()=>null);
        setError(data?.detail ?? "Fetch Failed")
        setLoading(false)
        return;
      }
     window.location.reload();
 

    }
     catch(error) {
      setError("Something went wrong, Try again later")
    }
     finally{
       setLoading(false);}
  }
   
  return (
    <div className="min-h-screen font-[family-name:var(--font-mono)] px-6 py-24">
      <main className="mx-auto max-w-sm">
        <h1 className="text-3xl font-[family-name:var(--font-display)] tracking-widest font-black uppercase-mb-2">
          Add Product
        </h1>

        <div className="h-px w-12 bg-[var(--accent)] mb-5" />
          <form onSubmit={addProduct} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px]text-[var(--text-muted)] uppercase">Product Name</label>
              <input 
              type="text"
              value={name}
              onChange={(e)=> setProductName(e.target.value)}
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
              <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px]text-[var(--text-muted)] uppercase">Slug</label>
              <input 
              type="text"
              value={slug}
              onChange={(e)=> setSlug(e.target.value)}
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
              <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px]text-[var(--text-muted)] uppercase">Description</label>
              <textarea cols={100}
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
              className="
              bf-[var(--surface)]
              border
              border-[var(--border)]
              px-4 py-3
              text-sm
              text-[var(--text)]
              outline-none" />
            </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px] uppercase">
              Product Image
            </label>
            <label className="w-full bg-[var(--surface)] border rounded-l py-3 px-2 text-sm cursor-pointer flex items-center justify-between">
              <span className="text-[var(--text-muted)]">
                {image ? image.name : "Choose file..."}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </label>
          </div>
            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px]text-[var(--text-muted)] uppercase">Category</label>
              <select
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              className="
              bg-[var(--surface)]
              border
              border-[var(--border)]
              px-4 py-3
              text-sm
              text-[var(--text)]
              outline-none" >
              <option value="">Select Category</option>
              <option value="Formal-Suit">Formal Suit</option>
              <option 
              value="Informal-Suit">Informal Suit</option>
              <option 
              value="Acessories">Accessories</option>
              </select>
               
             
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
