"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { getCartItemKey, useCart } from "@/context/CartContext";
import { createCheckout } from "@/lib/api";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({
  open,
  onClose,
}: CartDrawerProps) {
  const {
    items,
    itemCount,
    subtotal,
    updateQuantity,
    removeItem,
  } = useCart();

  const [paying, setPaying] = useState(false);

  const handleCheckout = async () => {
    try {
      setPaying(true);

      const { paymentUrl } = await createCheckout(
        items.map((item) => ({
          productId: item.productId,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        }))
      );

      // Redirect to the Zarinpal payment page.
      window.location.href = paymentUrl;
    } catch {
      toast.error("اتصال به درگاه پرداخت ناموفق بود");
      setPaying(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        onClick={(event) => event.stopPropagation()}
        className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex h-[65px] shrink-0 items-center justify-between border-b border-neutral-200 px-5">
          <div className="flex items-center gap-3">
            <h2 className="text-[15px] font-medium">سبد خرید شما</h2>

            <span className="font-mono text-[10px] text-neutral-500">
              ({itemCount})
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن سبد خرید"
            className="flex h-9 w-9 items-center justify-center border border-neutral-200 transition-colors hover:bg-neutral-50"
          >
            <X size={17} />
          </button>
        </div>

        {/* Cart items */}
        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => {
                const key = getCartItemKey(item);

                return (
                  <div
                    key={key}
                    className="flex gap-4 border-b border-neutral-200 p-5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[125px] w-[100px] shrink-0 bg-[#f5f5f5] object-cover"
                    />

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-[13px] font-medium leading-5">
                            {item.name}
                          </h3>

                          <p className="mt-1 font-mono text-[11px] text-neutral-500">
                            سایز: {item.size}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className="h-3 w-3 rounded-full border border-black/10"
                              style={{ backgroundColor: item.color }}
                            />

                            <span className="font-mono text-[10px] text-neutral-500">
                              رنگ
                            </span>
                          </div>
                        </div>

                        <span className="shrink-0 font-mono text-[12px]">
                          €{item.price * item.quantity}
                        </span>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        {/* Quantity */}
                        <div className="flex h-8 items-center border border-neutral-200">
                          <button
                            type="button"
                            aria-label="کاهش تعداد"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(key, item.quantity - 1)
                            }
                            className="flex h-full w-8 items-center justify-center disabled:opacity-30"
                          >
                            <Minus size={12} />
                          </button>

                          <span className="w-7 text-center font-mono text-[11px]">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            aria-label="افزایش تعداد"
                            onClick={() =>
                              updateQuantity(key, item.quantity + 1)
                            }
                            className="flex h-full w-8 items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(key)}
                          className="flex items-center gap-1.5 text-[11px] text-neutral-500 transition-colors hover:text-black"
                        >
                          <Trash2 size={13} />
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="shrink-0 border-t border-neutral-200 p-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium">جمع جزء</span>

                <span className="font-mono text-[14px]">
                  €{subtotal.toFixed(2)}
                </span>
              </div>

              <p className="mt-2 text-[11px] text-neutral-500">
                هزینه ارسال و مالیات هنگام پرداخت محاسبه می‌شود.
              </p>

              <button
                type="button"
                disabled={paying}
                onClick={handleCheckout}
                className="mt-5 flex h-12 w-full items-center justify-center bg-black text-[12px] font-medium uppercase tracking-wider text-white disabled:opacity-50"
              >
                {paying ? "در حال انتقال به درگاه..." : "پرداخت"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full py-2 text-[11px] underline underline-offset-4"
              >
                ادامه خرید
              </button>
            </div>
          </>
        ) : (
          /* Empty cart */
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag
              size={30}
              strokeWidth={1.2}
              className="mb-5 text-neutral-400"
            />

            <h3 className="text-[15px] font-medium">
              سبد خرید شما خالی است
            </h3>

            <p className="mt-2 max-w-[250px] text-[12px] leading-5 text-neutral-500">
              مجموعه ما را ببینید و محصول مورد علاقه‌تان را پیدا کنید.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 h-11 bg-black px-8 text-[11px] font-medium uppercase tracking-wider text-white"
            >
              ادامه خرید
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}