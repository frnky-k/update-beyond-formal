'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductResponse = {
  id: string;
  price: number;
  size: string;
  color: string;
  stock: number;
  sku: string;
};

type Address ={
  id: string;
  is_default: boolean;
}

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
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [AddtoBag, setAddtoBag] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // 1. Defend against an empty or wrapped object structure
  const productData = product?.product ? product.product : (product?.data ? product.data : product);

  const handleSizeSelect = (sizeName: string) => {
    setSelectedSize(sizeName);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  // 2. Safe parsing tree fallback
  let rawPrice = 0;
  if (productData?.variants && productData.variants.length > 0) {
    rawPrice = productData.variants[0]?.price ?? 0;
  } else if (productData?.price) {
    rawPrice = productData.price;
  }
    
  
  
  const AvailableColors = Array.from(
    new Set(productData.variants?.map((v:ProductResponse)=>v.color)??[])
  );
  const AvailableSizes = Array.from(
    new Set(productData.variants?.map((v:ProductResponse)=>v.size)??[])
  );
  
  const selectedVariant = productData.variants?.find(
    (v: ProductResponse) => v.size === selectedSize && v.color === selectedColor
  );

  const activePrice = Number(selectedVariant?.price ?? productData.variants?.[0]?.price ?? 0);   

  // Fallback view if the product data somehow failed completely
  if (!productData || !productData.name) {
    return <div className="p-10 text-red-500">Error parsing product details.</div>;
  }

  async function handleAddtoBag() {
    if (!selectedVariant) {
      setError("Please select size and color");
      return;
    }
    try{
      setError("");
      setAddtoBag(true);

      const addRes = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/addresses`,{
        credentials: 'include',
      });
      
      if (addRes.status == 401){
        router.push("/login");
        return;
      }

      if (!addRes.ok) {
        setError("Please Input Address");
        return;
      }

      const addresses: Address[] = await addRes.json();
      const defaultAddress = addresses.find(a => a.is_default) ?? addresses[0];

      if(!defaultAddress) {
        setError("Please input Address")
        router.push("/user");
        return;
      }



      const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          address_id: defaultAddress.id,
          items: [
            {
              variant_id: selectedVariant.id,
              quantity: quantity,
            },
          ],    
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(()=>null);
        setError(data?.detail ?? "Failed to place order");
        return;
      }
      const order =await res.json();
      router.push(`/order`)
    }

    catch (err){
      setError("Something went wrong")
    }
    finally {
      setAddtoBag(false)
    }

    if (!productData || !productData.name) {
      return <div className="p-10 text-red-500">Error Parsing Product Detail</div>
    }
  }

  return (
    <div className="p-6">
      <main>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-center">
          {/* <Image 
            src="/no-image.jpg"
            width={400}
            height={400}
            alt={productData.name}
            className="rounded-lg object-cover"
          /> */}
            <Image src={ product.image_url ? `${process.env.NEXT_PUBLIC_API_URL}/${product.image_url}`: "/no-image.jpg"} width={400} height={400} alt={product.name} className="rounded-lg object-contain" unoptimized />
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
                {AvailableSizes.map((size)=>{
                  const VariantForSize = productData.variants?.filter((v:ProductResponse)=>v.size === size)
                
                  const isOutOfStock = VariantForSize?.every((v:ProductResponse)=>v.stock===0);
                  const isSelected = selectedSize === size

                  return (
                    <button
                      key={size as string}
                      disabled={isOutOfStock}
                      onClick={() => handleSizeSelect(size as string)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors
                        ${isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' : ''}
                        ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}
                      `}
                    >
                      {size as string}
                    </button>
                  );
                    })}

              </div>
            </div>
            <div className="my-4">
              <p className="font-medium mb-2">Select Color:</p>
              <div className="flex gap-2">
                  {AvailableColors.map((color)=>{
                    const isSelected = selectedColor === color
                     return (
                    <button
                      key={color as string}
                      // disabled={!selectedSize && !selectedColor }
                      onClick={() => handleColorSelect(color as string)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors
                        ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}
                      `}
                    >
                      {color as string}
                    </button>
                  );
                })}

                  
                 
              </div>
            </div>

            <div className="flex items-center gap-3">
             <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-64">
              <button 
                disabled={!selectedSize}
                onClick={handleAddtoBag}
                className={`py-3 px-6 rounded-lg text-lg font-medium tracking-wide border transition-all text-center
                  ${selectedSize 
                    ? 'bg-black text-white cursor-pointer hover:bg-gray-800' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed border-transparent'
                  }`}
              >
                {AddtoBag ? "placing order..": selectedSize && selectedColor ? `Order Size ${selectedSize} & Order Color ${selectedColor}`: "Select Size"}
                
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>
        </div>      
      </main>
    </div>
  );
}