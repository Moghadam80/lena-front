import { ArrowLeft } from "lucide-react";

function DottedSilhouette() {
    return (
        <svg
            viewBox="0 0 700 700"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="طرح انتزاعی سیلوئت مد با نقاط قرمز"
        >
            <defs>
                <pattern
                    id="background-dots"
                    width="13"
                    height="13"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="1" cy="1" r="0.8" fill="#d4d4d4" />
                </pattern>

                <pattern
                    id="figure-dots"
                    width="7"
                    height="7"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="3.5" cy="3.5" r="2.25" fill="#fa2442" />
                </pattern>

                <clipPath id="figure-shape">
                    <path d="
            M330 55
            C385 42 435 68 456 110
            C487 132 514 163 522 204
            C529 241 514 278 494 310
            C480 333 471 354 485 379
            C502 405 535 420 535 449
            C534 472 511 485 487 493
            L475 700
            L260 700
            C267 653 295 624 313 590
            C330 558 323 529 302 500
            C278 467 250 445 240 408
            C228 368 237 329 250 290
            C259 259 256 223 266 190
            C276 147 294 110 330 55
            Z
          " />
                </clipPath>
            </defs>

            <rect width="700" height="700" fill="url(#background-dots)" />

            <g clipPath="url(#figure-shape)">
                <rect width="700" height="700" fill="url(#figure-dots)" />

                {[
                    [320, 155], [350, 175], [410, 210],
                    [280, 260], [440, 290], [360, 340],
                    [290, 390], [460, 420], [330, 455],
                    [390, 510], [310, 570], [430, 600],
                ].map(([cx, cy], index) => (
                    <circle
                        key={index}
                        cx={cx}
                        cy={cy}
                        r="4"
                        fill="#d9092d"
                    />
                ))}
            </g>
        </svg>
    );
}

export default function Hero() {
    return (
        <section className="relative mx-auto max-w-[1360px] border-x border-neutral-200">
            <div className="relative grid h-[470px] grid-cols-1 md:h-[560px] md:grid-cols-[58.3%_41.7%]">
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between overflow-hidden border-b border-neutral-200 px-2 py-7 md:border-b-0 md:border-r md:px-[30px] md:py-[40px]">

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] tracking-[0.5px] text-neutral-500 sm:text-[11px] md:gap-7 md:text-xs">

                        <span className="border border-neutral-300 px-1 py-0.5">
                            <span className="bg-red-600 px-0.5 text-white">
                                AW26
                            </span>
                        </span>

                        <span>ساخته‌شده در لنا سنتر
</span>

                        <span className="flex items-center gap-1.5 text-red-600">
                            <span className="h-[6px] w-[6px] rounded-full bg-red-600" />
                            مجموعه جدید منتشر شد
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="my-3 md:my-0">
                        <h1 className="text-[clamp(60px,8.1vw,90px)] text-[20px] leading-[0.94] tracking-[-0.045em] text-[#080808]">
                            لـــنا
                            <br />
                            ســــنتر
                            <span
                                className="ml-4 inline-block h-[10px] w-[10px] md:h-[18px] md:w-[18px] rounded-full bg-[#ed1c35]"
                                style={{
                                    animation: "smoothBlink 1.8s ease-in-out infinite",
                                }}
                            >
                                <style>{`
    @keyframes smoothBlink {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.25;
      }
    }
  `}</style>
                            </span>
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="grid gap-2 md:grid-cols-[40%_60%] md:items-center md:gap-5">

                        <p className="text-[30px] tracking-tight text-neutral-500 md:text-[29px]">
                            انواع محصولات{" "}
                            <span className="inline-flex h-[1.2em] overflow-hidden align-bottom font-medium text-black mb-0.5 md:mb-1">
                                <span className="flex flex-col animate-word-elevator">
                                    <span className="h-[1.2em] leading-[1.2]">مردانه</span>
                                    <span className="h-[1.2em] leading-[1.2]">زنانه</span>
                                    <span className="h-[1.2em] leading-[1.2]">بچه گانه</span>
                                </span>
                            </span>
                        </p>

                        <p className="max-w-[530px] text-[12px] leading-[1.4] text-neutral-600 md:text-[19px] md:leading-[1.6]">
                            روی هر بند، یراق‌آلات مخصوص تعبیه شده تا اندازه و فیت آن دقیقاً متناسب با شما تنظیم شود.
                        </p>

                    </div>

                    {/* Buttons */}
                    <div className="mt-3 flex w-full gap-2 md:mt-7 md:flex-wrap md:gap-3">

                        <a
                            href="#club"
                            className="inline-flex h-[46px] flex-1 items-center justify-center gap-2 rounded-[5px] bg-[#080808] px-3 text-[11px] font-semibold text-white transition-colors hover:bg-neutral-700 md:h-[55px] md:flex-none md:gap-3 md:px-6 md:text-sm"
                        >
                            خرید
                            <ArrowLeft size={14} />
                        </a>

                        <a
                            href="#collections"
                            className="inline-flex h-[46px] flex-1 items-center justify-center rounded-[5px] border border-neutral-300 px-3 text-[11px] font-medium transition-colors hover:bg-neutral-100 md:h-[55px] md:flex-none md:px-6 md:text-sm bg-white"
                        >
                            مجموعه‌ها
                        </a>

                    </div>
                </div>

                {/* Artwork */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:pointer-events-auto md:relative md:col-start-2 md:row-start-1">

                    {/* Desktop metadata */}
                    <div className="relative z-10 hidden h-[51px] items-center justify-between border-b border-neutral-200 px-5 font-mono text-[10px] tracking-[0.8px] text-neutral-500 md:flex">
                        <span>شکل ۰۱ / ۰۲ · سیلوئت</span>
                        <span>۳٬۳۵۶ نقطه · کدنویسی، بدون تصویر</span>
                    </div>

                    {/* Illustration */}
                    <div className="absolute inset-0 opacity-[0.55] md:relative md:h-[calc(100%-51px)] md:opacity-100">
                        <div className="absolute inset-0 left-[8%] w-[110%] md:inset-0 md:left-0 md:w-full">
                            <DottedSilhouette />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
