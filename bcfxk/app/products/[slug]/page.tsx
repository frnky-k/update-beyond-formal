// // // 'use client'

// // // import Image from "next/image";
// // // import { useEffect } from "react";
// // // import { useState } from "react";


// // // type Variant = {
// // //   price:number
// // //   size:string
// // //   color:string
// // //   stock:number
// // //   sku:string
// // // }

// // // type Product = {
// // //   id: string
// // //   name: string
// // //   slug: string
// // //   description: string
// // //   category: string
// // //   variants: Variant[]
// // // }


// // // async function getProducts(slug: string):Promise<Product | null >{
// // //   const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {cache: "no-store",});
  
// // //   if(!res.ok) {
// // //     throw new Error("Failed to Fetch Product");
// // //   }
// // //   return res.json();
// // // }

// // // export default async function ProductDetail(
// // //   {params, } : {params : Promise<{slug: string}>}
// // // ) {
// // //   const { slug } = await params;
// // //   const product = await getProducts(slug)

// // //   if (!product) {
// // //     return (
// // //       <div>
// // //         <p>Product Not Found</p>
// // //       </div>
// // //     );
// // //   }
  
// // //   return (
// // //     <div>
// // //       <main>
// // //         <div className="grid grid-cols-[auto_1fr] gap-10 items-center">
// // //           <Image src={"/no-image.jpg"}
// // //           width={400}
// // //           height={200}
// // //           alt="product-1"/>
          
// // //           <h1 className="font-[family-name:var(--font-mono)] text-3xl">{product.name}
// // //             <p className="text-3xl">${product.variants[0]?.price}</p>
// // //             <p className="text-xl">{product.variants[0]?.size}</p>
// // //             <p className="text-xs text-[var(--text-muted)] w-200 py-4">{product.description}</p>
// // //             <div className="flex flex-col gap-2 items-start">
// // //               <a href="#" className="bg-[var(--accent)] rounded-lg text-lg px-20 font-[family-name:var(--font-display)]">Add to Cart</a> 
// // //               <a href="#" className="bg-[var(--accent)] rounded-lg text-lg px-20 font-[family-name:var(--font-display)]">Buy Now</a>
// // //             </div>
// // //           </h1>
      
         
// // //         </div>      
// // //       </main>
// // //     </div>
// // //   );
// // // }
// // 'use client'

// // import Image from "next/image";
// // import { useEffect } from "react";
// // import { useState } from "react";


// // type ProductResponse = {
// //   price: number
// //   size:string
// //   color:string
// //   stock:number
// //   sku:string
// // }

// // type Product = {
// //   id: number
// //   name: string
// //   slug: string
// //   description: string
// //   category: string
// //   price:number
// //   variants: ProductResponse[]
// // }


// // export const ProductCatalog: React.FC = () => {
// //   const[product, setProduct] = useState<Product[]>([]);
// //   const [selectedSize, setSelectedSize] = useState<{ [key:number]:string}>({});

// //   useEffect(()=> {
// //     fetch("${process.env.NEXT_PUBLIC_API_URL}/products/${slug}").then((res)=>res.json()).then((data: Product[]) => setProduct(data));
// //   }, [])

// //   const handleSizeSelect = (product_id: number, sizeName: string) => {
// //     setSelectedSize(prev=> ({...prev, [product_id]:sizeName}));
// //   };

// //   return (
// //     <div>
// //       {product.map((product)=>(
// //         <div key={product.id}>
// //           <h3>{product.name}</h3>
// //           <p>${product.price.toFixed(2)}</p>

// //           <div>
// //             <p>Select Size: </p>
// //             <div>{product.variants.map((variants)=>{
// //               const OutOfStock = variants.stock === 0;
// //               const isSelected = selectedSize[product.id]=== variants.size;
// //               return (
// //                 <button key={variants.size} disabled={OutOfStock}
// //                 onClick={() => handleSizeSelect(product.id, variants.size)}>
// //                   {variants.size}
// //                 </button>
// //               )
// //             })}
// //             </div>
// //           </div>

// //             <button 
// //             disabled={!selectedSize[product.id]}>
// //               {selectedSize[product.id]?`Add ${selectedSize[product.id]} to Bag` : 'Select Size'}
// //             </button>

// //         </div>
// //       ))}
// //     </div>
// //   )
// // }


// 'use client'

// import Image from "next/image";
// import { useEffect, useState, use } from "react";

// type ProductResponse = {
//   price: number;
//   size: string;
//   color: string;
//   stock: number;
//   sku: string;
// };

// type Product = {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   category: string;
//   price: number;
//   variants: ProductResponse[];
// };

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// export default function ProductDetail({ params }: PageProps) {
//   // Unwrap the params promise using React.use()
//   const resolvedParams = use(params);
//   const slug = resolvedParams.slug;

//   const [product, setProduct] = useState<Product | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!slug) return;

//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch product data");
//         }
//         return res.json();
//       })
//       .then((data: Product) => {
//         setProduct(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [slug]);

//   const handleSizeSelect = (sizeName: string) => {
//     setSelectedSize(sizeName);
//   };

//   if (loading) return <div className="p-10">Loading product...</div>;
//   if (error || !product) return <div className="p-10 text-red-500">Product not found.</div>;

//   // Find the variant price or fallback to product base price
//   const activePrice = product.variants?.length > 0 ? product.variants[0].price : product.price;

//   return (
//     <div className="p-6">
//       <main>
//         <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-center">
//           <Image 
//             src="/no-image.jpg"
//             width={400}
//             height={400}
//             alt={product.name}
//             className="rounded-lg object-cover"
//           />
          
//           <div className="flex flex-col gap-4">
//             <h1 className="text-3xl font-bold">{product.name}</h1>
//             <p className="text-2xl font-semibold">${activePrice.toFixed(2)}</p>
//             <p className="text-sm text-gray-500 max-w-xl">{product.description}</p>
            
//             <div className="my-4">
//               <p className="font-medium mb-2">Select Size:</p>
//               <div className="flex gap-2">
//                 {product.variants?.map((variant) => {
//                   const isOutOfStock = variant.stock === 0;
//                   const isSelected = selectedSize === variant.size;
                  
//                   return (
//                     <button
//                       key={variant.size}
//                       disabled={isOutOfStock}
//                       onClick={() => handleSizeSelect(variant.size)}
//                       className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors
//                         ${isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' : ''}
//                         ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}
//                       `}
//                     >
//                       {variant.size}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="flex flex-col gap-2 w-full sm:w-64">
//               <button 
//                 disabled={!selectedSize}
//                 className={`py-3 px-6 rounded-lg text-lg font-medium tracking-wide border transition-all text-center
//                   ${selectedSize 
// //                     ? 'bg-black text-white cursor-pointer hover:bg-gray-800' 
//                     : 'bg-gray-200 text-gray-400 cursor-not-allowed border-transparent'
//                   }`}
//               >
//                 {selectedSize ? `Add Size ${selectedSize} to Bag` : 'Select Size'}
//               </button>
//             </div>
//           </div>
//         </div>      
//       </main>
//     </div>
//   );
// }


// app/products/[slug]/page.tsx
// import ProductView from "@/app/products/[slug]/ProductView";

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// // Fetch helper running directly on the server
// async function getProduct(slug: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
//     cache: "no-store", // Ensures fresh data for stock availability
//   });
  
//   if (!res.ok) return null;
//   return res.json();
// }

// export default async function Page({ params }: PageProps) {
//   const { slug } = await params;
//   const product = await getProduct(slug);

//   if (!product) {
//     return <div className="p-10 text-red-500">Product not found.</div>;
//   }

//   return <ProductView product={product} />;
// }


// app/products/[slug]/page.tsx
import ProductView from "@/app/products/[slug]/ProductView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    cache: "no-store",
  });
  
  if (!res.ok) return null;
  const data = await res.json();

  // ROUTE WORKAROUND: If your API returns an array, filter it here before passing to the view
  if (Array.isArray(data)) {
    return data.find((item: any) => item.slug === slug) || null;
  }

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