// // app/products/[slug]/ProductView.tsx
// 'use client'

// import Image from "next/image";
// import { useState } from "react";

// type ProductResponse = {
//   price: number;
//   size: string;
//   color: string;
//   stock: number;
//   sku: string;
// };

// type Product = {
//   id: string; // Adjusted to string since backend uses UUIDs
//   name: string;
//   slug: string;
//   description: string;
//   category: string;
//   price?: number | string; // Optional fallback
//   variants: ProductResponse[];
// };
// export default function ProductView({ product }: { product: Product }) {
//   const [selectedSize, setSelectedSize] = useState<string>("");

//   const handleSizeSelect = (sizeName: string) => {
//     setSelectedSize(sizeName);
//   };

//   // 2. Safe parsing logic with a default fallback (e.g., 0)
//   const rawPrice = product.variants && product.variants.length > 0 
//     ? product.variants[0].price 
//     : (product.price ?? 0);
    
//   const activePrice = Number(rawPrice);

//   return (
//     <div className="p-6">
//       <main>
//         <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-center">
//           {/* ... keeping your existing image code ... */}
          
//           <div className="flex flex-col gap-4">
//             <h1 className="text-3xl font-bold">{product.name}</h1>
            
//             {/* 3. Safe string formatting */}
//             <p className="text-2xl font-semibold">
//               {isNaN(activePrice) ? "$0.00" : `$${activePrice.toFixed(2)}`}
//             </p>
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
//                     ? 'bg-black text-white cursor-pointer hover:bg-gray-800' 
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

'use client'

import Image from "next/image";
import { useState } from "react";

type ProductResponse = {
  price: number;
  size: string;
  color: string;
  stock: number;
  sku: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price?: number | string;
  variants: ProductResponse[];
};

export default function ProductView({ product }: { product: any }) {

  console.log("DEBUG - API Payload:", product);
  const [selectedSize, setSelectedSize] = useState<string>("");

  // 1. Defend against an empty or wrapped object structure
  const productData = product?.product ? product.product : (product?.data ? product.data : product);

  const handleSizeSelect = (sizeName: string) => {
    setSelectedSize(sizeName);
  };

  // 2. Safe parsing tree fallback
  let rawPrice = 0;
  if (productData?.variants && productData.variants.length > 0) {
    rawPrice = productData.variants[0]?.price ?? 0;
  } else if (productData?.price) {
    rawPrice = productData.price;
  }
    
  const activePrice = Number(rawPrice);

  // Fallback view if the product data somehow failed completely
  if (!productData || !productData.name) {
    return <div className="p-10 text-red-500">Error parsing product details.</div>;
  }

  return (
    <div className="p-6">
      <main>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-center">
          <Image 
            src="/no-image.jpg"
            width={400}
            height={400}
            alt={productData.name}
            className="rounded-lg object-cover"
          />
          
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{productData.name}</h1>
            
            {/* 3. Fully guarded price element */}
            <p className="text-2xl font-semibold">
              {isNaN(activePrice) ? "$0.00" : `$${activePrice.toFixed(2)}`}
            </p>
            
            <p className="text-sm text-gray-500 max-w-xl">{productData.description}</p>
            
            <div className="my-4">
              <p className="font-medium mb-2">Select Size:</p>
              <div className="flex gap-2">
                {productData.variants?.map((variant: ProductResponse) => {
                  const isOutOfStock = variant.stock === 0;
                  const isSelected = selectedSize === variant.size;
                  
                  return (
                    <button
                      key={variant.size}
                      disabled={isOutOfStock}
                      onClick={() => handleSizeSelect(variant.size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors
                        ${isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' : ''}
                        ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}
                      `}
                    >
                      {variant.size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-64">
              <button 
                disabled={!selectedSize}
                className={`py-3 px-6 rounded-lg text-lg font-medium tracking-wide border transition-all text-center
                  ${selectedSize 
                    ? 'bg-black text-white cursor-pointer hover:bg-gray-800' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed border-transparent'
                  }`}
              >
                {selectedSize ? `Add Size ${selectedSize} to Bag` : 'Select Size'}
              </button>
            </div>
          </div>
        </div>      
      </main>
    </div>
  );
}