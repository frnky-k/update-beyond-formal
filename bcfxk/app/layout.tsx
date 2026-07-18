import type { Metadata } from "next";
import { Cinzel, Arimo, Lora, Parisienne } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const cinzel_deco = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const yeseva = Arimo({
  variable: "--font-body",
  subsets: ["latin"], 
  weight: ["400"]
})

const lora = Lora({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"]
});

const dancing_script = Parisienne ({
  variable: "--font-x",
  subsets: ["latin"],
  weight: ["400"]
})

export const metadata: Metadata = {
  title: "BFCxK — Beyond Formal Concepts x Kinetic",
  description: "Premium clothing, beyond formal concepts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel_deco.variable} ${yeseva.variable}  ${lora.variable} ${dancing_script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)] font-[family-name:var(--font-body)]">
        <header className="border-b border-[var(--border)] px-6 py-5 justify-between flex items-center">
          <a href="/" className="iniline-flex item-baseline gap-2"><span className="font-[family-name:var(--font-display)] text-lg font-black tracking-tight">Beyond Formal</span>
          <span className="text-[var(--accent)] font-[family-name:var(--font-x)] text-xl font-black"> X </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-black tracking-tight text-[var(--accent)">Kinetic</span></a>

          <nav className="font-[family-name:var(--font-display)] ">
            <ul className="flex flex-row gap-6 items-center">
              <li className="relative group "><Link href={"/login"}>Sign Up</Link>
              <span className="
              absolute
              left-0
              bottom-0 
              w-full 
              h-0.5 
              bg-[var(--accent)] 
              scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span></li>
              
              <li className="relative group "><Link href={"/"}>Search</Link>
              <span className="
              absolute
              left-0
              bottom-0 
              w-full 
              h-0.5 
              bg-[var(--accent)] 
              scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span></li>
              
            </ul>
          </nav>
        </header>
        <main className="flex-1 ">
          {children}
        </main></body>
    </html>
  );
}


