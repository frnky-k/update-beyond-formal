import Link from "next/link";


export default function Hero(){
  return (
  <div>

    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* left column */}

      <div className="sticky top-0 h-screen flex items-center justify-center gap-4  ">
        <div className="relative">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-tightest text-[var(--accent)] text-center uppercase">Collection | 2026</p>
          <h1 className="text-center font-[family-name:var(--font-display)] text-6xl sm:text-7xl font-black tracking-tight">
            <span className="block">BEYOND,</span>
            <span className="block text-[var(--accent)]">MOMENTS.</span>
          </h1>
          <div className="flex flex-col gap-4  mt-6 items-center">
            <a href="/products" className="border text-center rounded-md bg-transparent w-40 h-10 py-2 px-3">Discover More →</a>
          </div>


          <div className="absolute left-20 top-2 rounded-xl bg-[var(--accent)] w-1 h-40 rotate-12 z-10" />
        </div>
 
      </div>

      {/* Right Column */}
      <div className="flex flex-col overflow-y-auto snap-y snap-proximity h-screen">
        {/* Section */}
        <section className="min-h-screen flex items-center px-6 py-12 snap-center">
          <div className="grid grid-cols-1 gap-4">
            <p className="text-[family-name:var(--accent)] text-xs font-[family-name:var(--font-mono)] uppercase">01 - Manifesto</p>
            <p className="font-[family-name:var(--font-body)] text-xl leading-relax max-w-xl">Beyond Formal x Kinetics is a contemporary fashion house redefining the boundaries of luxury tailoring. Born at the intersection of sharp, sophisticated tailoring and dynamic, modern energy, the brand crafts high-end formal suit jackets for those who view style as a form of art</p>
          </div>
        </section>
        <section className="min-h-screen flex items-center px-6 py-12 snap-center">
          <div className="grid grid-cols-1 gap-4">
            <p className="text-[family-name:var(--accent)] text-xs font-[family-name:var(--font-mono)] uppercase">02 - Craft</p>
            <p className="font-[family-name:var(--font-body)] text-xl leading-relax max-w-xl">Every jacket begins as a single, uncut piece of cloth — full canvas construction, hand-finished lapels, and natural fiber lining, built to move with the body rather than restrain it. We reject the idea that formalwear must be rigid. Structure, here, is a starting point, not a limit</p>
          </div>
        </section>
        <section className="min-h-screen flex items-center px-6 py-12 snap-center">
          <div className="grid grid-cols-1 gap-4">
            <p className="text-[family-name:var(--accent)] text-xs font-[family-name:var(--font-mono)] uppercase">03 - Philosphy</p>
            <p className="font-[family-name:var(--font-body)] text-xl leading-relax max-w-xl"> A suit jacket is an act of discipline. Kinetic energy is what happens when that discipline meets a body in motion. BFCxK exists in that exact moment — tailoring engineered for people who refuse to stand still.
            </p>
          </div>
        </section>
    
      </div>
    </div>

    {/* Footer */}
    <footer className="border-t border-[var(--border)] px-6 py-16 bg-[var:(--surface)]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">Category</p>
          <div className="relative left-0 -top-1 w-5 h-0.5 bg-white"/>
          <Link href="/products?category=Jackets" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">Jackets</Link>
          <Link href="/products?category=Jackets" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">Trousers</Link>
          <Link href="/products?category=Jackets" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">Formal Suit</Link>
          <Link href="/products?category=Jackets" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">Comfort Wear</Link>
          <Link href="/products" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">All Product</Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">Shop</p>
          <div className="relative left-0 -top-1 w-5 h-0.5 bg-white"/>
          <Link href="/products?category=Jackets" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">California</Link>
          <Link href="/products?category=Jackets" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">New York</Link>
          <Link href="/products?category=Jackets" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">Chicago</Link>
          <Link href="/products?category=Jackets" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">Los Angeles</Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">Account</p>
          <div className="relative left-0 -top-1 w-5 h-0.5 bg-white"/>
          <Link href="/login" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">Log In</Link>
          <Link href="/register" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">Register</Link>
        </div>
        
        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">Contact</p>
          <div className="relative left-0 -top-1 w-5 h-0.5 bg-white"/>
          <Link href="#" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">Instagram</Link>
          <Link href="#" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">Facebook</Link>
          <Link href="#" className="text-sm text-[var:(--text)] hover:text-[var:(--accent)] transition-colors">X</Link>
        </div>
      </div>

       <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between gap-4">
          <p className="font-[family-name:var(--font-display)] text-xs font-black tracking-tight">
            Beyond Formal x Kinetics
          </p>
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
            © 2026 Beyond Formal Concepts x Kinetic
          </p>
        </div>
    </footer>
    
  </div>
  )
}