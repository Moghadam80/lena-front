'use client'

const linkCls = 'text-neutral-200 hover:text-white transition-colors'
const navCls =
    'flex flex-col gap-[10px] border-x border-[#262626] px-6 lg:px-[30px] py-[50px] text-[15px] leading-[22px]'
const labelCls = 'mono mb-1.5 text-xs text-neutral-500'

export default function Footer() {
    return (
        <footer dir="rtl" data-sec="footer" className="bg-[#0a0a0a] text-white">
            <div className="wrap reveal border border-2 border-[#262626] max-w-[1360px] mx-auto">
                {/* Columns: 5 / 2 / 2 / 3 of 12, same split as the reference */}
                <div className="grid grid-cols-2 lg:grid-cols-12">
                    {/* Newsletter */}
                    <div className="col-span-2 lg:col-span-5 flex flex-col gap-5 border-b lg:border-b-0 lg:border-l border-[#262626] px-6 lg:px-[30px] py-[50px]">
                        <span className="text-[24px] font-medium leading-[1.3] tracking-tight">
                            اولین نفری باشید که
                            <br />
                            از محصولات جدید باخبر می‌شوید.
                        </span>

                        <form
                            className="flex w-full max-w-[425px] gap-[10px]"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <label htmlFor="newsletter-email" className="sr-only">
                                ایمیل
                            </label>

                            <input
                                id="newsletter-email"
                                type="email"
                                dir="ltr"
                                placeholder="you@email.com"
                                className="in h-[40px] min-w-0 flex-1 rounded-md  bg-[#141414] px-4 text-left text-[15px] text-white placeholder:text-neutral-500 outline-none focus:border-neutral-500"
                            />

                            <button
                                type="submit"
                                className="btn cursor-pointer white h-[40px] shrink-0 rounded-md bg-white text-black px-2 flex items-center"
                            >
                                عضویت
                            </button>
                        </form>

                        <span className="mono text-xs text-neutral-500">
                            بدون پیام‌های مزاحم؛ هر زمان بخواهید لغو عضویت کنید.
                        </span>
                    </div>

                    {/* Shop */}
                    <nav aria-label="فروشگاه" className={`lg:col-span-2 ${navCls}`}>
                        <span className={labelCls}>فروشگاه</span>
                        <a href="#shop" className={linkCls}>محصولات جدید</a>
                        <a href="#collections" className={linkCls}>مجموعه‌ها</a>
                        <a href="#shop" className={linkCls}>ست‌ها</a>
                        <a href="#shop" className={linkCls}>کارت هدیه</a>
                        <a href="#shop" className={linkCls}>بلک فرایدی</a>
                    </nav>

                    {/* Help */}
                    <nav aria-label="راهنما" className={`lg:col-span-2 ${navCls}`}>
                        <span className={labelCls}>راهنما</span>
                        <a href="#club" className={linkCls}>راهنمای سایز</a>
                        <a href="#faq" className={linkCls}>ارسال سفارش</a>
                        <a href="#faq" className={linkCls}>تعویض کالا</a>
                        <a href="#faq" className={linkCls}>راهنمای نگهداری</a>
                        <a href="#faq" className={linkCls}>تماس با ما</a>
                    </nav>

                    {/* Company */}
                    <nav
                        aria-label="لنا سنتر"
                        className="col-span-2 lg:col-span-3 flex flex-col gap-[10px] border-[#262626] border-t lg:border-t-0 px-6 lg:px-[30px] py-[50px] text-[15px] leading-[22px]"
                    >
                        <span className={labelCls}>لنا سنتر</span>
                        <a href="#journal" className={linkCls}>مجله</a>
                        <a href="#journal" className={linkCls}>آتلیه</a>
                        <a href="#club" className={linkCls}>باشگاه مشتریان</a>
                        <a href="#journal" className={linkCls}>اینستاگرام</a>
                        <a href="#journal" className={linkCls}>همکاری تجاری</a>
                    </nav>
                </div>

                {/* Watermark.
                    An SVG so it scales with the container (≈77% of the width, cap height
                    ≈ 12% of it) at any viewport or browser zoom, regardless of font metrics.
                    Right-aligned: the mirror of the left-aligned original. */}
                <div
                    aria-hidden="true"
                    className="border-t border-[#262626] text-center mx-auto flex justify-center px-6 lg:px-[45px] pt-[68px] pb-[60px]"
                >
                    <svg
                        viewBox="0 0 1240 150"
                        className="block h-auto w-[77%] select-none overflow-visible"
                        focusable="false"
                    >
                        <text
                            x="0"
                            y="150"
                            direction="ltr"
                            textLength="1240"
                            lengthAdjust="spacing"
                            fill="#151515"
                            style={{
                                fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                                fontWeight: 600,
                                fontSize: 206,
                            }}
                        >
                            LENACENTER
                        </text>
                    </svg>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[#262626] px-6 lg:px-[30px] py-[22px]">
                    <span className="text-[13px] font-semibold uppercase tracking-[.22em]">
                        LENACENTER
                    </span>

                    <div
                        dir="ltr"
                        className="mono flex flex-wrap gap-5 text-xs uppercase text-neutral-500"
                    >
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>Amex</span>
                        <span>PayPal</span>
                        <span>Apple Pay</span>
                        <span>iDEAL</span>
                        <span>Klarna</span>
                    </div>

                    <div className="mono flex flex-wrap items-center gap-[25px] text-xs text-neutral-500">
                        <span dir="ltr">NL · EUR</span>
                        <a href="#faq" className="hover:text-white transition-colors">
                            حریم خصوصی
                        </a>
                        <a href="#faq" className="hover:text-white transition-colors">
                            قوانین و مقررات
                        </a>
                        <span>© ۲۰۲۶</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
