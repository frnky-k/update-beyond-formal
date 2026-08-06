'use client';

import { useState } from "react";
import {useRouter} from "next/navigation";
import { SquareUserRound } from "lucide-react";

export default function ChangeInfo() {
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function UpdateUser(e: React. FormEvent){
    try{
      e.preventDefault();
      setError("");
      setLoading(true);

      const updateUser:
      Record<string, string> ={};
      if (newName) updateUser.name = newName;

      const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(updateUser)
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
    onSubmit={UpdateUser}
    >
    <div className="border rounded-xl bg-[var(--surface)] w-full p-6 flex flex-col gap-6 overflow-hidde">
      <h1 className="font-[family-name:var(--font-mono)] p-2 text-md text-[var(--text-muted)] flex flex-row gap-2 justify-start items-start w-full">
        <SquareUserRound className="w-6 h-6"/>
        Personal</h1>
      <div className="w-full h-px -mt-2 bg-[var(--accent)]"/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 items-start">
        <div className="flex flex-col gap-1.5">
        <label className="font-[family-name:var(--font-mono)] 
        tracking-widest 
        text-[11px]
        uppercase ">Full Name</label>
      
        <input 
        type="text"
      value={newName}
      onChange={(e)=>setNewName(e.target.value)} 
      placeholder="Change Name"
                className="
                bg-[var(--surface)]
                border
                rounded-l
                py-3 px-2
                w-xl
                text-sm
                outline-none"/>
      </div>
      </div>


     <div className="flex justify-end">
      <button type="submit" disabled={loading}
              className=" bg-[var(--accent)] text-white py-3 text-sm px-4 mx-2 tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 rounded-md" >
                {loading ? "Loading": "Change Name"}</button>
     </div>
         


       
       
    </div>
      
   
    </form>
  )
  

}