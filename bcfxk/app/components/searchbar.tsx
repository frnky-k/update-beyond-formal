'use client';
import { useState } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number | null;
}

export default function SearchBar(){
  
  const [searchProduct, setSearchProduct] = useState("")
  const [SearchResult, setSearchResult] = useState<Product[]>([]);
  const [ShowSuggestion, setShowSuggestion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(!searchProduct){
      setSearchResult([])
      setShowSuggestion(false);
      return;
    }

    const timer = setTimeout(async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?search=${searchProduct}`);
      if(res.ok){
        const data = await res.json();      
        setSearchResult(data);
        setShowSuggestion(true);
      }

    },300);
    return () => clearTimeout(timer);
  },[searchProduct])


  useEffect(()=>{
    function handleClicktoClose(event: MouseEvent){
      if (ref.current && !ref.current.contains(event.target as Node)){
        setShowSuggestion(false);
      }
    }
    document.addEventListener("mousedown", handleClicktoClose);
    return () => document.removeEventListener("mousedown", handleClicktoClose);
  }, [])

  async function handleFocus() {
    if (searchProduct){
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?search=${searchProduct}`);
      if(res.ok){
        const data = await res.json();      
        setSearchResult(data.slice(0,3));
        setShowSuggestion(true);
      } 
  }

  return (
  <div ref={ref} className="relative">
    <input 
    type="text"
    value={searchProduct} 
    onFocus={handleFocus}
    onChange={(e)=> setSearchProduct(e.target.value)}
    placeholder="Search"
    className="bg-[var(--surface)] border border-[var(--border)] px-4 py-2 my-2 w-full text-sm outline-none"/>

    {ShowSuggestion && SearchResult.length > 0 && (
      <div  className="absolute top-full left-0 w-full bg-[var(--surface)] border border-[var(--border)] mt-1 z-50">
        {SearchResult.map((product)=>(
          <Link
          key={product.id}
          href={`/products/${product.slug}`}
          onClick={()=> setShowSuggestion(false)}
          className="flex justify-between px-4 py-3 hover:bg-[var(--bg)] transition-colors">
            <span className="text-base">{product.name}</span>
            {product.price && (
              <span>${product.price.toLocaleString()}</span>
            )}
          </Link>
        ))}

      </div>
    )}
  </div> 
  );
}   