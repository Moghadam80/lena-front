
"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ArrowUpRight,
  Heart,
  Menu,
  X,
  Search,
} from "lucide-react";

import ShopMegaMenu from "./layout/ShopMegaMenu";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";
import { getCategories } from "@/lib/api";
import { useApi } from "@/lib/useApi";

const materials = ["Leather", "Lacquer", "Latex", "Lace & mesh", "Fishnet"];

const materialLabels: Record<string, string> = {
  Leather: "چرم",
  Lacquer: "لاک",
  Latex: "لاتکس",
  "Lace & mesh": "تور و مش",
  Fishnet: "فیش‌نت",
};

const collections = [
  "Voltage Affinity",
  "West of Eden",
  "Adeline",
  "Venus",
  "Sets & bundles",
  "Gift card",
];

const collectionLabels: Record<string, string> = {
  "Voltage Affinity": "وُلتِیج افینیتی",
  "West of Eden": "وست آو ایدن",
  Adeline: "آدلین",
  Venus: "ونوس",
  "Sets & bundles": "ست‌ها",
  "Gift card": "کارت هدیه",
};

const navigationLinks = [
  { label: "مجموعه‌ها", id: "collections" },
  { label: "محصولات", id: "club" },
  { label: "مجله", id: "journal" },
];

export default function Header() {
  const [shopOpen, setShopOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const headerRef = useRef<HTMLElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { itemCount } = useCart();

  const { data: apiCategories } = useApi(getCategories, []);
  const shopCategories = apiCategories.map((category) => ({
    label: category.name,
    count: category.productCount,
    href: "#",
  }));

  // Open shop menu
  const openShop = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }

    setShopOpen(true);
  };

  // Close shop menu with delay
  const closeShop = () => {
    closeTimeout.current = setTimeout(() => {
      setShopOpen(false);
    }, 150);
  };

  // Close all menus
  const closeMenus = () => {
    setShopOpen(false);
    setMenuOpen(false);
    setMobileShopOpen(false);
  };

  // Detect active section while scrolling
  useEffect(() => {
  const sectionIds = navigationLinks.map((link) => link.id);

  let ticking = false;

  const updateActiveSection = () => {
    const headerHeight = 88;
    const activationOffset = headerHeight + 80;

    let currentSection = "";

    for (const id of sectionIds) {
      const section = document.getElementById(id);

      if (!section) continue;

      const rect = section.getBoundingClientRect();

      if (
        rect.top <= activationOffset &&
        rect.bottom > activationOffset
      ) {
        currentSection = id;
        break;
      }
    }

    setActiveSection(currentSection);
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveSection);
      ticking = true;
    }
  };

  // Initial active section
  updateActiveSection();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  window.addEventListener("resize", updateActiveSection);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", updateActiveSection);
  };
}, []);

  // Handle outside clicks and Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setShopOpen(false);
        setMenuOpen(false);
        setMobileShopOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);

      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  // Navigation link component
  const renderNavigationLink = (
    item: (typeof navigationLinks)[number],
    mobile = false
  ) => {
    const isActive = activeSection === item.id;

    return (
      <a
        key={item.id}
        href={`#${item.id}`}
        onClick={closeMenus}
        aria-current={isActive ? "location" : undefined}
        className={`flex items-center gap-2 ${
          mobile
            ? "w-full border-b border-neutral-100 py-4 text-sm"
            :  `rounded-md px-3 py-2 text-[13px] font-medium hover:bg-neutral-100 ${isActive? 'bg-neutral-100':''}`
        }`}
      >
        {item.label}

        <span
          className={`h-[6px] w-[6px] shrink-0 rounded-full bg-[#e5001c] transition-all duration-300 ${
            isActive
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0"
          }`}
        />
      </a>
    );
  };

  

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white"
    >
      {/* Announcement bar */}
      <div className="h-[32px] border-y border-neutral-200 bg-[#fafafa]">
        <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between border-x border-neutral-200 px-5 md:px-8">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.7px] text-neutral-600 sm:text-xs">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#efa0a9]" />

            <span>
              جمعه سیاه · با خرید ۲ محصول، ۱۰٪ تخفیف بیشتر بگیرید
            </span>
          </div>

          <div className="hidden items-center gap-6 font-mono text-[11px] tracking-wide text-neutral-600 sm:flex">
            <button className="transition-opacity hover:opacity-50">
              NL · EUR
            </button>

            <button className="transition-opacity hover:opacity-50">
              EN
            </button>

            <a href="#club" className="transition-opacity hover:opacity-50">
              ورود اعضا
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="relative border-b border-neutral-200 bg-white">
        <div className="relative mx-auto flex h-[56px] max-w-[1360px] items-center justify-between border-x border-neutral-200 px-5 md:px-8">

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <ShopMegaMenu />

            {navigationLinks.map((item) =>
              renderNavigationLink(item)
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center md:hidden"
            aria-label="باز و بسته کردن منو"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          {/* Center logo */}
          <a
            href="/"
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[19px] font-bold tracking-[5px]"
          >
            LENACENTER
          </a>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-4 sm:gap-6">
            <button className="hidden items-center gap-2 text-[13px] font-medium hover:opacity-50 sm:flex">
              جستجو

              <kbd className="rounded border border-neutral-300 px-1.5 py-0.5 text-[10px] text-neutral-500">
                ⌘K
              </kbd>
            </button>

            <button
              aria-label="علاقه‌مندی‌ها"
              className="hidden transition-opacity hover:opacity-50 md:flex"
            >
              <Heart size={17} strokeWidth={1.8} />
            </button>

            <a
              href="#account"
              className="hidden text-[13px] font-medium hover:opacity-50 sm:block"
            >
              حساب کاربری
            </a>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`باز کردن سبد خرید، ${itemCount} محصول`}
              className="flex items-center gap-2 text-[13px] font-medium hover:opacity-50"
            >
              سبد خرید

              <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black text-[11px] text-white">
                {itemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop shop mega menu */}
        <div
          id="shop-mega-menu"
          onMouseEnter={openShop}
          onMouseLeave={closeShop}
          className={`absolute left-0 right-0 top-full z-40 hidden border-b border-neutral-200 bg-white shadow-[0_24px_48px_rgba(0,0,0,0.06)] transition-all duration-200 md:block ${
            shopOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-[1360px] grid-cols-12">

            {/* Categories */}
            <div className="col-span-3 border-r border-neutral-200 px-7 py-6">
              <span className="mb-5 block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                دسته‌بندی
              </span>

              <div className="flex flex-col gap-3">
                {shopCategories.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMenus}
                    className="group flex items-center justify-between text-[13px] transition-colors hover:text-neutral-400"
                  >
                    <span>{item.label}</span>

                    <span className="font-mono text-[10px] text-neutral-400">
                      {item.count.toString().padStart(2, "0")}
                    </span>
                  </a>
                ))}
              </div>

              <a
                href="/shop"
                onClick={closeMenus}
                className="mt-7 inline-flex items-center gap-2 border-b border-black pb-1 text-[12px] font-medium"
              >
                مشاهده همه محصولات
                <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Materials */}
            <div className="col-span-2 border-r border-neutral-200 px-7 py-6">
              <span className="mb-5 block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                جنس
              </span>

              <div className="flex flex-col gap-3">
                {materials.map((material) => (
                  <a
                    key={material}
                    href={`/shop?material=${encodeURIComponent(material.toLowerCase())}`}
                    onClick={closeMenus}
                    className="text-[13px] transition-colors hover:text-neutral-400"
                  >
                    {materialLabels[material] ?? material}
                  </a>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div className="col-span-2 border-r border-neutral-200 px-7 py-6">
              <span className="mb-5 block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                مجموعه‌ها
              </span>

              <div className="flex flex-col gap-3">
                {collections.map((collection, index) => (
                  <a
                    key={collection}
                    href={`/collections/${collection.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}
                    onClick={closeMenus}
                    className="flex items-center justify-between gap-2 text-[13px] transition-colors hover:text-neutral-400"
                  >
                    {collectionLabels[collection] ?? collection}

                    {index === 0 && (
                      <span className="font-mono text-[9px] text-[#e5001c]">
                        جدید
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Featured collection */}
            <a
              href="/collections/featured"
              onClick={closeMenus}
              className="group relative col-span-5 m-4 flex min-h-[270px] flex-col justify-between overflow-hidden bg-[#0a0a0a] p-7 text-white"
            >
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
                alt="Featured fashion collection"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />

              <div className="relative z-10 flex justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  مجموعه منتخب
                </span>

                <ArrowUpRight size={18} />
              </div>

              <div className="relative z-10">
                <h3 className="max-w-sm text-3xl font-medium leading-tight tracking-tight">
                  تجربه‌ای متفاوت را کشف کنید.
                </h3>

                <span className="mt-4 inline-flex border-b border-white/70 pb-1 text-[12px]">
                  مشاهده مجموعه
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <nav className="absolute left-0 top-full z-50 max-h-[calc(100dvh-88px)] w-full overflow-y-auto border-b border-neutral-200 bg-white px-5 py-4 md:hidden">

            {/* Mobile shop */}
            <button
              onClick={() => setMobileShopOpen(!mobileShopOpen)}
              className="flex w-full items-center justify-between border-b border-neutral-100 py-4 text-sm font-medium"
            >
              فروشگاه

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  mobileShopOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileShopOpen && (
              <div className="border-b border-neutral-100 bg-[#fafafa] px-4 py-4">
                <span className="mb-3 block font-mono text-[10px] uppercase text-neutral-500">
                  دسته‌بندی‌ها
                </span>

                {shopCategories.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMenus}
                    className="flex items-center justify-between py-2.5 text-[13px]"
                  >
                    {item.label}
                    <ArrowUpRight size={13} />
                  </a>
                ))}

                <div className="my-4 border-t border-neutral-200" />

                <span className="mb-3 block font-mono text-[10px] uppercase text-neutral-500">
                  جنس‌ها
                </span>

                {materials.map((material) => (
                  <a
                    key={material}
                    href={`/shop?material=${encodeURIComponent(material.toLowerCase())}`}
                    onClick={closeMenus}
                    className="block py-2 text-[13px]"
                  >
                    {materialLabels[material] ?? material}
                  </a>
                ))}
              </div>
            )}

            {/* Mobile navigation links */}
            {navigationLinks.map((item) =>
              renderNavigationLink(item, true)
            )}

            <a
              href="/shop"
              onClick={closeMenus}
              className="mt-4 flex items-center gap-2 text-sm"
            >
              <Search size={16} />
              Search products
            </a>
          </nav>
        )}
      </div>

      {/* Cart drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </header>
  );
}
