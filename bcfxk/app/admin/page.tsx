import Link from "next/link";

export default function Admin(){
  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-24 font-[family-name:var(--font-body)]">
      <main className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Admin Dashboard
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2">
          <Link className="bg-[var(--accent)] w-auto px-auto rounded-md py-15 text-3xl text-center font-[family-name:var(--font-mono)]" href={"/admin/products"} >
            Add product
          </Link>
          <Link className="bg-[var(--accent)] w-auto px-auto rounded-md py-15 text-3xl text-center font-[family-name:var(--font-mono)]" href={"/admin/product-table"} >
            Product table
          </Link>
          <Link className="bg-[var(--accent)] w-auto px-auto rounded-md py-15 text-3xl text-center font-[family-name:var(--font-mono)]" href={"/admin/product-variants"} >
            Add product Variant
          </Link>
          <Link className="bg-[var(--accent)] w-auto px-auto rounded-md py-15 text-3xl text-center font-[family-name:var(--font-mono)]" href={"/admin/delete-products"} >
            Delete product
          </Link>
          <Link className="bg-[var(--accent)] w-auto px-auto rounded-md py-15 text-3xl text-center font-[family-name:var(--font-mono)]" href={"/admin/update-products"} >
            Update product 
          </Link>
        </div>
      </main>
    </div>
  )
}