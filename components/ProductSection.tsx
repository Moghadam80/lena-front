"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Heart, X, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import {
    getCategories,
    getProducts,
    getSizes,
    type Product,
} from "@/lib/api";
import { useApi } from "@/lib/useApi";

export default function ProductSection() {
    const { data: products, loading } = useApi(getProducts, []);
    const { data: apiCategories } = useApi(getCategories, []);
    const { data: apiSizes } = useApi(getSizes, []);

    const categories = useMemo(
        () => [
            "همه",
            ...apiCategories
                .filter((item) => item.showInFilters)
                .map((item) => item.name),
            "زیر ۲۰۰ یورو",
        ],
        [apiCategories]
    );

    const sizes = useMemo(
        () => apiSizes.map((item) => item.name),
        [apiSizes]
    );

    const [category, setCategory] = useState("همه");
    const [activeMaterial, setActiveMaterial] = useState("");
    const [size, setSize] = useState("ANY");
    const [sort, setSort] = useState("NEWEST");
    const [wishlist, setWishlist] = useState<number[]>([]);

    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

    const [selectedSize, setSelectedSize] = useState("");

    const [addedProductId, setAddedProductId] =
        useState<number | null>(null);

    const { addItem } = useCart();

    const [selectedColors, setSelectedColors] = useState<
        Record<number, string>
    >({});

    // Reset the success button after 2 seconds.
    useEffect(() => {
        if (addedProductId === null) return;

        const timer = setTimeout(() => {
            setAddedProductId(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [addedProductId]);

    const getSelectedColor = (product: Product) =>
        selectedColors[product.id] || product.colors[0];

    // Add product to cart.
    const handleAddToCart = (
        product: Product,
        productSize: string
    ) => {
        if (!productSize || !product.sizes.includes(productSize)) {
            return;
        }

        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: productSize,
            color: getSelectedColor(product),
        });

        setAddedProductId(product.id);

        toast.success(`${product.name} به سبد خرید اضافه شد`, {
            duration: 2500,
        });

        setSelectedProduct(null);
        setSelectedSize("");
    };

    // Filter and sort products.
    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (category !== "همه") {
            if (category === "زیر ۲۰۰ یورو") {
                result = result.filter(
                    (product) => product.price < 200
                );
            } else {
                result = result.filter(
                    (product) => product.category === category
                );
            }
        }

        if (activeMaterial) {
            result = result.filter(
                (product) =>
                    product.collection === activeMaterial
            );
        }

        if (size !== "ANY") {
            result = result.filter((product) =>
                product.sizes.includes(size)
            );
        }

        if (sort === "PRICE LOW") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sort === "PRICE HIGH") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, category, activeMaterial, size, sort]);

    const toggleWishlist = (id: number) => {
        setWishlist((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    const clearFilters = () => {
        setCategory("همه");
        setActiveMaterial("");
        setSize("ANY");
        setSort("NEWEST");
    };

    return (
        <>
            <section
                id="club"
                className="mx-auto w-full max-w-[1360px] border-x border-neutral-200 scroll-mt-[88px]"
            >
                {/* Section heading */}
                <div className="flex h-[34px] items-center justify-between border-b border-neutral-200 px-4 md:px-5">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                        <span className="text-neutral-900">
                            02 / 09
                        </span>
                        <span className="mx-2">تازه‌واردها</span>
                        <span>
                            · {filteredProducts.length} PIECES
                        </span>
                    </div>

                    <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                        SHOWING {filteredProducts.length}
                    </span>
                </div>

                {/* Filters */}
                <div className="border-b border-neutral-200 px-3 py-2 md:px-5">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        {/* Categories */}
                        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-0.5 scrollbar-hide">
                            {categories.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setCategory(item)}
                                    aria-pressed={category === item}
                                    className={`shrink-0 rounded-full border px-3 py-[5px] text-[12px] transition-colors ${
                                        category === item
                                            ? "border-black bg-black text-white"
                                            : "border-neutral-200 bg-white text-neutral-800 hover:border-black"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        {/* Size and sorting */}
                        <div className="flex shrink-0 items-center gap-2">
                            <div className="relative">
                                <select
                                    value={size}
                                    onChange={(e) =>
                                        setSize(e.target.value)
                                    }
                                    aria-label="فیلتر بر اساس سایز"
                                    className="h-[28px] w-[100px] appearance-none rounded-full border border-neutral-200 bg-white py-1 px-2 text-[11px] outline-none hover:border-black"
                                >
                                    <option value="ANY">
                                        همه سایزها
                                    </option>

                                    {sizes.map((item) => (
                                        <option key={item} value={item}>
                                            سایز {item}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    size={11}
                                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    value={sort}
                                    onChange={(e) =>
                                        setSort(e.target.value)
                                    }
                                    aria-label="مرتب‌سازی محصولات"
                                    className="h-[28px] w-[150px] px-2 appearance-none rounded-full border border-neutral-200 bg-white py-1 text-[11px] outline-none hover:border-black"
                                >
                                    <option value="NEWEST">
                                        مرتب‌سازی : جدیدترین
                                    </option>
                                    <option value="PRICE LOW">
                                        قیمت: کم به زیاد
                                    </option>
                                    <option value="PRICE HIGH">
                                        قیمت: زیاد به کم
                                    </option>
                                </select>

                                <ChevronDown
                                    size={11}
                                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active filters */}
                {(activeMaterial ||
                    category !== "همه" ||
                    size !== "ANY") && (
                    <div className="flex min-h-[36px] items-center gap-2 border-b border-neutral-200 bg-[#fafafa] px-4 py-1.5 md:px-5">
                        {category !== "همه" && (
                            <button
                                onClick={() => setCategory("همه")}
                                className="flex items-center gap-1 rounded-full bg-black px-3 py-1 text-[10px] text-white"
                            >
                                {category}
                                <X size={10} />
                            </button>
                        )}

                        {size !== "ANY" && (
                            <button
                                onClick={() => setSize("ANY")}
                                className="flex items-center gap-1 rounded-full bg-black px-3 py-1 text-[10px] text-white"
                            >
                                سایز {size}
                                <X size={10} />
                            </button>
                        )}

                        <button
                            onClick={clearFilters}
                            className="ml-auto font-mono text-[9px] uppercase tracking-wider text-neutral-500 underline underline-offset-2 hover:text-black"
                        >
                            حذف فیلترها
                        </button>
                    </div>
                )}

                {/* Product grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {filteredProducts.map((product, index) => {
                            const isAdded =
                                addedProductId === product.id;

                            const isSelected =
                                selectedProduct?.id === product.id;

                            return (
                                <article
                                    key={product.id}
                                    className={`group relative flex min-w-0 flex-col overflow-hidden border-b border-neutral-200 hover:z-30 ${
                                        index % 4 !== 3
                                            ? "md:border-r"
                                            : ""
                                    } ${
                                        index % 2 === 0
                                            ? "max-md:border-r"
                                            : ""
                                    }`}
                                >
                                    {/* Product image */}
                                    <div className="relative aspect-[3/4] h-[320px] overflow-hidden bg-[#f5f5f5] md:h-[450px] md:aspect-square">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-[1.03]"
                                        />

                                        {product.isNew && (
                                            <span className="absolute left-2 top-2 border border-neutral-200 bg-white px-1.5 py-0.5 font-mono text-[9px] uppercase md:text-[10px]">
                                                جدید
                                            </span>
                                        )}

                                        {product.lowStock && (
                                            <span className="absolute left-2 top-2 bg-[#e5001c] px-1.5 py-1 font-mono text-[9px] uppercase text-white">
                                                موجودی محدود
                                            </span>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleWishlist(product.id)
                                            }
                                            aria-label="افزودن به علاقه‌مندی‌ها"
                                            aria-pressed={wishlist.includes(
                                                product.id
                                            )}
                                            className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white"
                                        >
                                            <Heart
                                                size={15}
                                                className={
                                                    wishlist.includes(
                                                        product.id
                                                    )
                                                        ? "fill-red-600 text-red-600"
                                                        : "text-neutral-700"
                                                }
                                            />
                                        </button>
                                    </div>

                                    {/* Default product information */}
                                    <div className="relative z-0 flex min-h-[76px] flex-col gap-1.5 p-2.5 md:min-h-[85px] md:p-3.5 md:transition-opacity md:duration-200 md:group-hover:opacity-0">
                                        <div className="flex items-start justify-between gap-2 max-md:flex-col max-md:gap-0.5">
                                            <h3 className="text-[12px] font-medium leading-[1.4] text-neutral-900 md:text-[14px]">
                                                {product.name}
                                            </h3>

                                            <span className="shrink-0 font-mono text-[11px] md:text-[12px]">
                                                €{product.price}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            {product.colors.map(
                                                (color, colorIndex) => (
                                                    <button
                                                        key={`${color}-${colorIndex}`}
                                                        type="button"
                                                        aria-label={`Select color ${colorIndex + 1}`}
                                                        aria-pressed={
                                                            getSelectedColor(
                                                                product
                                                            ) === color
                                                        }
                                                        onClick={() =>
                                                            setSelectedColors(
                                                                (current) => ({
                                                                    ...current,
                                                                    [product.id]:
                                                                        color,
                                                                })
                                                            )
                                                        }
                                                        className="flex h-5 w-5 items-center justify-center rounded-full"
                                                    >
                                                        <span
                                                            className={`h-[10px] w-[10px] rounded-full border border-black/10 ${
                                                                getSelectedColor(
                                                                    product
                                                                ) === color
                                                                    ? "ring-1 ring-black ring-offset-2"
                                                                    : ""
                                                            }`}
                                                            style={{
                                                                backgroundColor:
                                                                    color,
                                                            }}
                                                        />
                                                    </button>
                                                )
                                            )}

                                            <span className="ml-1 font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                                                {product.material}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Desktop hover panel */}
                                    <div
                                        className="
                                            absolute inset-x-0 bottom-0 z-20
                                            hidden md:block
                                            translate-y-full
                                            invisible opacity-0
                                            border-t border-neutral-200
                                            bg-white p-4
                                            shadow-[0_-8px_20px_rgba(0,0,0,0.06)]
                                            transition-all duration-300 ease-out
                                            md:group-hover:visible
                                            md:group-hover:translate-y-0
                                            md:group-hover:opacity-100
                                        "
                                    >
                                        <p className="mb-3 text-[12px] text-neutral-500">
                                            برای افزودن به سبد، سایز را انتخاب کنید
                                        </p>

                                        {/* Available sizes */}
                                        <div className="mb-3 flex flex-wrap gap-1.5">
                                            {sizes.map((item) => {
                                                const available =
                                                    product.sizes.includes(
                                                        item
                                                    );

                                                return (
                                                    <button
                                                        key={item}
                                                        type="button"
                                                        disabled={!available}
                                                        onClick={() => {
                                                            setSelectedProduct(
                                                                product
                                                            );
                                                            setSelectedSize(
                                                                item
                                                            );
                                                        }}
                                                        className={`flex h-10 min-w-[43px] items-center justify-center rounded-[5px] border px-2 text-[12px] transition-colors ${
                                                            isSelected &&
                                                            selectedSize ===
                                                                item
                                                                ? "border-black bg-black text-white"
                                                                : available
                                                                  ? "border-neutral-300 bg-white text-black hover:border-black"
                                                                  : "cursor-not-allowed border-neutral-200 text-neutral-300 line-through"
                                                        }`}
                                                    >
                                                        {item}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Add to bag */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (
                                                    !selectedSize ||
                                                    !product.sizes.includes(
                                                        selectedSize
                                                    ) ||
                                                    !isSelected
                                                ) {
                                                    setSelectedProduct(
                                                        product
                                                    );
                                                    setSelectedSize("");
                                                    return;
                                                }

                                                handleAddToCart(
                                                    product,
                                                    selectedSize
                                                );
                                            }}
                                            className={`flex h-11 w-full items-center justify-center gap-2 rounded-[5px] text-[13px] font-medium text-white transition-colors duration-300 ${
                                                isAdded
                                                    ? "bg-green-600"
                                                    : "bg-[#080808] hover:bg-neutral-800"
                                            }`}
                                        >
                                            {isAdded ? (
                                                <>
                                                    <Check size={15} />
                                                    به سبد خرید اضافه شد
                                                </>
                                            ) : isSelected &&
                                              selectedSize ? (
                                                `افزودن به سبد خرید · €${product.price}`
                                            ) : (
                                                `انتخاب سایز · €${product.price}`
                                            )}
                                        </button>

                                        {/* Product details */}
                                        <div className="mt-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-[14px] font-medium underline underline-offset-4">
                                                    {product.name}
                                                </h3>

                                                <span className="shrink-0 font-mono text-[12px]">
                                                    €{product.price}
                                                </span>
                                            </div>

                                            <div className="mt-2 flex items-center gap-2">
                                                {product.colors.map(
                                                    (color, colorIndex) => (
                                                        <span
                                                            key={`${color}-${colorIndex}`}
                                                            className="h-4 w-4 rounded-full border border-black/10"
                                                            style={{
                                                                backgroundColor:
                                                                    color,
                                                            }}
                                                        />
                                                    )
                                                )}

                                                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                                                    {product.material}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile choose size button */}
                                    <div className="px-1.5 pb-2.5 md:hidden">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setSelectedSize("");
                                            }}
                                            className="flex h-[36px] w-full items-center justify-center gap-2 rounded-[5px] border border-black bg-black text-[11px] font-medium text-white"
                                        >
                                        انتخاب اندازه 
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                aria-hidden="true"
                                className={`flex min-w-0 animate-pulse flex-col border-b border-neutral-200 ${
                                    index % 4 !== 3 ? "md:border-r" : ""
                                } ${index % 2 === 0 ? "max-md:border-r" : ""}`}
                            >
                                <div className="h-[320px] bg-neutral-200 md:h-[450px]" />

                                <div className="flex min-h-[76px] flex-col gap-2 p-2.5 md:min-h-[85px] md:p-3.5">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="h-3.5 w-2/3 rounded bg-neutral-200" />
                                        <div className="h-3.5 w-10 rounded bg-neutral-200" />
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <div className="h-[10px] w-[10px] rounded-full bg-neutral-200" />
                                        <div className="h-2.5 w-10 rounded bg-neutral-200" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 border-b border-neutral-200">
                        <p className="text-sm text-neutral-500">
                            No products found.
                        </p>

                        <button
                            onClick={clearFilters}
                            className="font-mono text-[10px] uppercase underline underline-offset-4"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Bottom pagination */}
                <div className="flex items-center gap-3 px-4 py-3 md:px-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                        {filteredProducts.length} OF {products.length}
                    </span>

                    <div className="h-[2px] w-[115px] overflow-hidden bg-neutral-200">
                        <div
                            className="h-full bg-black transition-all"
                            style={{
                                width: `${
                                    products.length
                                        ? (filteredProducts.length /
                                              products.length) *
                                          100
                                        : 0
                                }%`,
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Mobile size selection modal */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 md:hidden"
                    onClick={() => {
                        setSelectedProduct(null);
                        setSelectedSize("");
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Choose size for ${selectedProduct.name}`}
                        className="w-full max-w-md rounded-t-xl bg-white p-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                                    Select your size
                                </span>

                                <h3 className="mt-1 text-lg font-medium">
                                    {selectedProduct.name}
                                </h3>

                                <p className="mt-1 font-mono text-sm">
                                    €{selectedProduct.price}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedProduct(null);
                                    setSelectedSize("");
                                }}
                                aria-label="بستن انتخاب سایز"
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-200"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Sizes */}
                        <div className="grid grid-cols-5 gap-2">
                            {sizes.map((item) => {
                                const available =
                                    selectedProduct.sizes.includes(item);

                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        disabled={!available}
                                        aria-pressed={selectedSize === item}
                                        onClick={() =>
                                            setSelectedSize(item)
                                        }
                                        className={`h-11 border text-sm transition-colors ${
                                            selectedSize === item
                                                ? "border-black bg-black text-white"
                                                : available
                                                  ? "border-neutral-200 hover:border-black"
                                                  : "cursor-not-allowed border-neutral-100 text-neutral-300 line-through"
                                        }`}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Mobile Add to bag */}
                        <button
                            type="button"
                            disabled={!selectedSize}
                            onClick={() =>
                                handleAddToCart(
                                    selectedProduct,
                                    selectedSize
                                )
                            }
                            className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md text-sm font-medium text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
                                addedProductId === selectedProduct.id
                                    ? "bg-green-600"
                                    : "bg-black"
                            }`}
                        >
                            {addedProductId === selectedProduct.id ? (
                                <>
                                    <Check size={16} />
                                    به سبد خرید اضافه شد
                                </>
                            ) : (
                                `افزودن به سبد خرید · ${
                                    selectedSize || "یک سایز انتخاب کنید"
                                }`
                            )}
                        </button>

                        <p className="mt-3 text-center text-[11px] text-neutral-500">
                            برای ادامه، یک سایز موجود انتخاب کنید.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}