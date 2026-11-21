
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import { useApi } from "@/lib/useApi";

const materials = ["Leather", "Lacquer", "Latex", "Lace & mesh", "Fishnet"];
const materialLabels: Record<string, string> = {
    Leather: "چرم", Lacquer: "لاک", Latex: "لاتکس", "Lace & mesh": "تور و مش", Fishnet: "فیش‌نت",
};

const collections = [
    { name: "Voltage Affinity", label: "وُلتِیج افینیتی", isNew: true },
    { name: "West of Eden", label: "وست آو ایدن" },
    { name: "Adeline", label: "آدلین" },
    { name: "Venus", label: "ونوس" },
    { name: "Sets & bundles", label: "ست‌ها" },
    { name: "Gift card", label: "کارت هدیه" },
];

const newProducts = [
    {
        name: "New collection 01",
        image: "/images/blackfriday/2.jpg",
        href: "/products",
    },
    {
        name: "New collection 02",
        image: "/images/blackfriday/3.jpg",
        href: "/products",
    },
    {
        name: "New collection 03",
        image: "/images/blackfriday/4.jpg",
        href: "/products",
    },
];

export default function ShopMegaMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { data: apiCategories } = useApi(getCategories, []);
    const categories = apiCategories.map((category) => ({
        name: category.nameEn,
        label: category.name,
        count: category.productCount,
    }));

    useEffect(() => {
        if (!isOpen) return;

        const handleOutsideClick = (event: PointerEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    return (
        <div ref={menuRef} className="relative h-full">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-controls="shop-mega-menu"
                className={`flex h-9 items-center gap-2 rounded-lg px-3 text-sm transition-colors ${isOpen ? "bg-neutral-100" : "hover:bg-neutral-100"
                    }`}
            >
                فروشگاه
                <svg
                    className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="m2.5 4.5 3.5 3 3.5-3"
                        stroke="currentColor"
                        strokeWidth="1.3"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="shop-mega-menu"
                    className="fixed left-1/2 top-[89px] z-50 w-screen -translate-x-1/2"
                >
                    <div className="mx-auto grid h-[304px] max-w-[1360px] grid-cols-[16.67%_16.67%_16.66%_25%_25%] border border-t-0 border-neutral-200 bg-white shadow-sm">
                        {/* CATEGORY */}
                        <div className="border-r border-neutral-200 px-[30px] pt-[27px] h-[304px]">
                            <h3 className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500">
                                دسته‌بندی
                            </h3>

                            <div className="space-y-[15px]">
                                {categories.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={`/#`}
                                        className="group flex items-center justify-between text-[16px] leading-5"
                                    >
                                        <span className="transition-opacity group-hover:opacity-50">
                                            {item.label}
                                        </span>
                                        <span className="font-mono text-xs text-neutral-500">
                                            {item.count}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* MATERIAL */}
                        <div className="border-r border-neutral-200 px-[30px] pt-[27px] h-[304px]">
                            <h3 className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500">
                                جنس
                            </h3>

                            <div className="space-y-[15px]">
                                {materials.map((material) => (
                                    <Link
                                        key={material}
                                        href={`/#`}
                                        className="block text-[16px] leading-5 transition-opacity hover:opacity-50"
                                    >
                                        {materialLabels[material] ?? material}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* COLLECTIONS */}
                        <div className="border-r border-neutral-200 px-[30px] pt-[27px] h-[304px]">
                            <h3 className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500">
                                مجموعه‌ها
                            </h3>

                            <div className="space-y-[15px]">
                                {collections.map((collection) => (
                                    <Link
                                        key={collection.name}
                                        href={`/#`}
                                        className="flex items-center gap-2 text-[16px] leading-5 transition-opacity hover:opacity-50"
                                    >
                                        {collection.label}

                                        {collection.isNew && (
                                            <span className="font-mono text-xs uppercase text-red-600">
                                                جدید
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* PROMOTIONAL BANNER */}

                        <Link
                            href="/collections/black-friday"
                            className="group relative block aspect-[1.12/1] w-full overflow-hidden bg-[#080808]"
                        >
                            {/* Model image - anchored to the right */}
                            <img
                                src="/images/blackfriday/1.jpg"
                                alt="Black Friday collection"
                                className="absolute left-0 top-0  z-0 h-full w-auto max-w-none object-contain object-left transition-transform duration-700"
                            />

                            {/* Gradient - dark on left, transparent on right */}
                            <div
                                className="absolute inset-0 z-10"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #080808 0%, #080808 38%, rgba(8,8,8,0.92) 48%, rgba(8,8,8,0.35) 65%, transparent 85%)",
                                }}
                            />

                            {/* Top label */}
                            <span className="absolute left-[15px] top-[30px] z-20 text-right font-mono text-[13px] font-medium uppercase tracking-wide text-white/65">
                                UP TO 40% OFF
                            </span>

                            {/* Bottom title */}
                            <h3 className="absolute bottom-[28px] left-[15px] z-20 m-0 text-right text-[34px] font-medium leading-[1.12] tracking-[-1.5px] text-white">
                                بلک فرایدی
                                <br />
                                ویرایش
                            </h3>
                        </Link>
                        {/* NEW THIS WEEK */}
                        <div className="flex flex-col px-[30px] pt-[27px]">
                            <h3 className="mb-[64px] font-mono text-xs uppercase tracking-wide text-neutral-500">
                                تازه‌های این هفته
                            </h3>

                            <div className="grid grid-cols-3 gap-[7px]">
                                {newProducts.map((product) => (
                                    <Link
                                        href={product.href}
                                        key={product.name}
                                        className="overflow-hidden rounded-[3px] bg-neutral-50"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="aspect-[0.75] w-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </Link>
                                ))}
                            </div>

                            <Link
                                href="/#"
                                className="mt-auto mb-[25px] text-[20px] font-medium tracking-tight transition-opacity hover:opacity-50"
                            >
                                سایزت را در ۲۰ ثانیه پیدا کن ←
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
