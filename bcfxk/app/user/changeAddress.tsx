'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Phone } from "lucide-react";


interface AddressesProps {
  recipientName: string;
}

export default function Addresses({recipientName}:AddressesProps){
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function UpdateAddress(e: React. FormEvent){
 
    try{
      e.preventDefault();
      setError("");
      setLoading(true);

      const updateAddress:
      Record<string, string> ={};
      updateAddress.recipient_name = recipientName
      if (phone) updateAddress.phone = phone;
      if (street) updateAddress.street = street;
      if (city) updateAddress.city = city;
      if (province) updateAddress.province = province;
      if (postal_code) updateAddress.postal_code = postal_code;
      

      const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/addresses`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(updateAddress)
      });

      if(!res.ok) {
        setError("Fetch Failed")
        setLoading(false)
        return;
      }
      router.push("/user")
    
    }
    catch(error){
      setError("something went wrong")
    }
    finally {
      setLoading(false)
    }
  }

return (
  
   <form 
    onSubmit={UpdateAddress}
    >
    <div className="border rounded-xl bg-[var(--surface)] w-full p-6 flex flex-col gap-6 overflow-hidden">
    <h1 className="font-[family-name:var(--font-mono)] text-md text-[var(--text-muted)] flex flex-row gap-2 justify-start items-start w-full">
      <MapPin className="w-6 h-6"/>
      Contact & Address</h1>

    <div className="w-full h-px -mt-2 bg-[var(--accent)]"/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 items-start">
      <div className="flex flex-col gap-1.5">
        <label className="font-[family-name:var(--font-mono)] 
        tracking-widest 
        text-[11px]
        text-uppercase">Phone Number</label>
        <input 
        type="text"
      value={phone}
      onChange={(e)=>setPhone(e.target.value)} 
      placeholder="Change Name"
                className="
                w-full
                bg-[var(--surface)]
                border
                rounded-l
                py-3 px-2
                text-sm
                outline-none"/>

      </div>
       
      <div className="flex flex-col  gap-1.5">
        <label className="font-[family-name:var(--font-mono)] 
        tracking-widest 
        text-[11px]
        uppercase">Street</label>

        <input 
        type="text"
      value={street}
      onChange={(e)=>setStreet(e.target.value)} 
      placeholder="Change Name"
                className="
                bg-[var(--surface)]
                border
                rounded-l
                py-3 px-2
                text-sm
                outline-none w-full"/>

      </div>
       
      <div className="flex flex-col  gap-1.5">
        <label className="font-[family-name:var(--font-mono)] 
        tracking-widest 
        text-[11px]
        text uppercase">city</label>
        <input 
        type="text"
      value={city}
      onChange={(e)=>setCity(e.target.value)} 
      placeholder="Change Name"
                className="
                bg-[var(--surface)]
                border
                rounded-l
                py-3 px-2
                text-sm
                outline-none w-full"/>

      </div>
       
      <div className="flex flex-col  gap-1.5">
        <label className="font-[family-name:var(--font-mono)] 
        tracking-widest 
        text-[11px]
        text uppercase">Province</label>
        <input 
        type="text"
      value={province}
      onChange={(e)=>setProvince(e.target.value)} 
      placeholder="Change Name"
                className="
                bg-[var(--surface)]
                border
                rounded-l
                py-3 px-2
                text-sm
                outline-none w-full"/>

      </div>
       
      <div className="flex flex-col  gap-1.5">
        <label className="font-[family-name:var(--font-mono)] 
        tracking-widest 
        text-[11px]
        text uppercase">Postal Code</label>
        <input 
        type="text"
      value={postal_code}
      onChange={(e)=>setPostalCode(e.target.value)} 
      placeholder="Change Name"
                className="
                bg-[var(--surface)]
                border
                rounded-l
                py-3 px-2
                text-sm
                outline-none w-full"/>

      </div>
       
      
      </div>
      {error && <p className="text-red-500 text-sm px-2">{error}</p>}
      <div className="flex justify-end">
        <button type="submit" disabled={loading}
              className=" mb-2 bg-[var(--accent)] text-white py-3 text-sm px-4 mx-2 tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 rounded-md" >
                {loading ? "Loading": "Save Changes"}</button>
      </div>
       
    </div>
    </form>

)
}

