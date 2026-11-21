import Collections from "@/components/Collections";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { CartProvider } from "@/context/CartContext";

export default function Home() {
  return (
    <CartProvider>
      <main className="mx-auto min-h-screen">
        <Header />
        <Hero />
        <div dir="ltr" className="w-full overflow-hidden bg-[#fafafa] border-y border-neutral-200">
          <div className="max-w-[1360px] mx-auto overflow-hidden border-x border-neutral-200 py-3">
            <div className="marquee-track flex w-max gap-12 font-mono text-[11px] uppercase tracking-wider whitespace-nowrap">
              {Array.from({ length: 6 }).map((_, index) => (
                <span key={index}>
                  ماندگار در طراحی ✳ با دقت انتخاب‌شده ✳ ضروریات روزمره ✳
                </span>
              ))}
              {Array.from({ length: 6 }).map((_, index) => (
                <span key={index}>
                  ماندگار در طراحی ✳ با دقت انتخاب‌شده ✳ ضروریات روزمره ✳
                </span>
              ))}
            </div>
          </div>
        </div>
        <Collections />
        <ProductSection />
        <Footer />
      </main>
    </CartProvider>
  );
}