'use client'

import { useState  } from "react";
import { useRouter } from "next/navigation";


export default function Register(){
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");
  const router = useRouter();

  async function registSubmit(e: React.FormEvent){
    try{
      e.preventDefault();
      setError("");
      setLoading(true)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({name, email, password})
      });
      if(!res.ok) {
        setError("Fetch Failed")
        setLoading(false)
        return;
      }

      router.push("/login")

    }
    catch(error) {
      setError("Something went wrong, please try again later")
      setLoading(false)
    }
  }
  return (
    <div
    className="
    min-h-screen
    font-[family-name:var(--font-mono)]
    px-6
    py-24
    bg-[var(--bg)]
    ">
      <main
      className="
      mx-auto
      max-w-sm
      ">

        <h1
        className="
        text-3xl
        font-[family-name:var(--font-display)]
        tracking-widest
        font-black]
        uppercase-mb-2
        ">Register</h1>
        
        <div 
        className="h-px w-12 bg-[var(--accent)] mb-8"/>

          <form onSubmit={registSubmit}
          className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label 
              className="
              font-[family-name:var(--font-mono)] 
              tracking-widest 
              text-[11px]
              text-[var(--text-muted)] uppercase ">Username</label>
              <input 
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="
              bg-[var(--surface)] 
              border 
              border-[var(--border)] 
              px-4 py-3 
              text-sm 
              text-[var(--text)] 
              outline-none 
              focus:border-[var(--accent)] transition-colors
              "
               />
            </div>
            <div className="flex flex-col gap-2">
              <label 
              className="
              font-[family-name:var(--font-mono)] 
              tracking-widest 
              text-[11px]
              text-[var(--text-muted)] uppercase ">Email</label>
              <input 
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="
              bg-[var(--surface)] 
              border 
              border-[var(--border)] 
              px-4 py-3 
              text-sm 
              text-[var(--text)] 
              outline-none 
              focus:border-[var(--accent) transition-colors]]
              "
               />
            </div>
            <div className="flex flex-col gap-2">
              <label 
              className="
              font-[family-name:var(--font-mono)] 
              tracking-widest 
              text-[11px]
              text-[var(--text-muted)] uppercase ">Password</label>
              <input 
              type="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="
              bg-[var(--surface)] 
              border 
              border-[var(--border)] 
              px-4 py-3 
              text-sm 
              text-[var(--text)] 
              outline-none 
              focus:border-[var(--accent) transition-colors]]
              "
               />
            </div>
        
            {error && (<p
            className="
            text-red-400 font-[family-name:var(--font-mono) text-xs]
            ">{error}</p>)}
            <button 
            type="submit"
            disabled={loading}
            className="
            mt-2
            bg-[var(--accent)]
            text-white
            py-3
            text-sm
            font-medium
            tracking-wide
            hover:opacity-90
            transition-opacity
            disabled:opacity-50
            ">
              {
              loading ? "Loading" : "Register"
              }
            </button>
          </form>
          <p 
          className="
          mt-8
          text-sm
          text-[var(--text-muted)]
          ">Already have an account?{""}</p>
          <a href="/login"
          className="
          text-[var(--accent)]
          ">Log In</a>
      </main>
    </div>
  )
}