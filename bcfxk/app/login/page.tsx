'use client'


import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login(){
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[error, setError] = useState("");
  const[Loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
      setError("");
      
    try{
      
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          // "Content-Type": "application/json"
          "Content-Type":"application/x-www-form-urlencoded"
        },
        // body: JSON.stringify({email, password})}); 
        body: formData.toString(),});


      if (!res.ok) {
        setError("Invalid Email or Password")
        return;
      }
      const data = await res.json();
      // const token = data.access_token;


      // localStorage.setItem("token", token);
      console.log(data)
      if (data.role == 'admin'){
        router.push("/admin");
      }
      else{
        router.push("/products")
      }
      
    }
    catch(error) {
      setError("Something Went Wrong, Please Try Again Later")
    }

  }
  return (
    <div className="min-h-screen font-[family-name:var(--font-mono)] px-6 py-24 bg-[var(--bg)">
      <main className="mx-auto max-w-sm">
        <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-widest text-[var:(--accent)] uppercase-mb-3">Account</p>
        <h1 className="text-3xl font-[family-name:var(--font-display)] text-3xl font-black tracking-tight mb-2">LOG IN</h1>
        <div className="h-px w-12 bg-[var(--accent)] mb-8"/>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px] text-[var(--text-muted)] uppercase ">Email</label>
            <input 
          type="email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          className="bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--accent) transition-colors]]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-[family-name:var(--font-mono)] tracking-widest text-[11px] text-[var(--text-muted)] uppercase">Password</label>
            <input 
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          className="bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--accent) transition-colors]]" />
          </div>
          

          {error && (<p className="font-[family-name:var(--font-mono)] text-xs text-red-400">{error}</p>)}
          <button type="submit"
          disabled={Loading}
          className="mt-2 bg-[var(--accent)] text-white py-3 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50">
          {
            Loading ? "Loggin in" : "Log in"  
          }  </button>
        </form>
        <p className="mt-8 text-sm text-[var(--text-muted)]">No Account?{" "}</p>
        <a href="/register" className="text-[var(--accent)]">Register</a>
      </main>
    </div>
  )
}