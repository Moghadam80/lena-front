"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/api";
import { useApi } from "@/lib/useApi";

const toPersianDigits = (value: number) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

function CollectionSkeleton({ index }: { index: number }) {
  return (
    <div
      aria-hidden="true"
      className={`flex min-h-[420px] animate-pulse flex-col justify-between border-b border-neutral-200 p-4 md:min-h-[523px] md:p-6 ${
        index % 2 === 0
          ? "border-r border-neutral-200"
          : "md:border-r md:border-neutral-200"
      } ${index === 3 ? "md:border-r-0" : ""}`}
    >
      <div className="flex justify-between gap-2">
        <div className="h-3 w-6 rounded bg-neutral-200" />
        <div className="h-3 w-14 rounded bg-neutral-200" />
      </div>

      <div className="mt-8 flex justify-end md:mt-10">
        <div className="aspect-[3/4] w-[100%] max-w-[232px] rounded-[4px] bg-neutral-200 md:w-[75%]" />
      </div>

      <div className="mt-8 flex items-baseline justify-between gap-2">
        <div className="h-6 w-24 rounded bg-neutral-200 md:h-8" />
        <div className="h-3 w-16 rounded bg-neutral-200" />
      </div>
    </div>
  );
}

export default function Collections() {
  const { data: items, loading } = useApi(getCollections, []);

  const collections = items.map((item, index) => ({
    number: String(index + 1).padStart(2, "0"),
    name: item.name,
    pieces: `${toPersianDigits(item.pieceCount)} محصول`,
    price: `از ${toPersianDigits(item.startingPrice)} یورو`,
    image: item.image,
    href: `/collections/${item.slug}`,
  }));

  return (
    <section
      id="collections"
      className="border-b border-neutral-200 scroll-mt-[88px]"
    >
      <div className="mx-auto w-full max-w-[1360px] border-x border-neutral-200">
        {/* Section header */}
        <div className="flex h-[54px] items-center justify-between border-b border-neutral-200 px-6">
          <div className="font-mono text-[11px] font-medium uppercase tracking-wider">
            <span className="text-neutral-500">01 / 09</span>
            <span className="ml-5">مجموعه‌ها</span>
          </div>

          <Link
            href="/collections"
            className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 transition-colors hover:text-black"
          >
            مشاهده هر چهار مجموعه ←
          </Link>
        </div>

        {/* Collection grid */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <CollectionSkeleton key={index} index={index} />
            ))}

          {collections.map((collection, index) => (
            <Link
              key={collection.number}
              href={collection.href}
              className={`group flex min-h-[420px] flex-col justify-between border-b border-neutral-200 p-4 transition-colors duration-200 hover:bg-[#fafafa] md:min-h-[523px] md:p-6 ${
                index % 2 === 0
                  ? "border-r border-neutral-200"
                  : "md:border-r md:border-neutral-200"
              } ${
                index === 3 ? "md:border-r-0" : ""
              }`}
            >
              {/* Number and pieces */}
              <div className="flex justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-neutral-500 md:text-[11px]">
                <span>{collection.number}</span>
                <span>{collection.pieces}</span>
              </div>

              {/* Collection image */}
              <div className="mt-8 flex justify-end md:mt-10">
                <div className="relative aspect-[3/4] w-[100%] md:w-[75%] max-w-[232px] overflow-hidden rounded-[4px] bg-neutral-100">
                  <Image
                    src={collection.image}
                    alt={`${collection.name} collection`}
                    fill
                    sizes="(max-width: 768px) 40vw, 232px"
                    unoptimized
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </div>

              {/* Collection information */}
              <div className="mt-8 flex items-baseline justify-between gap-2">
                <h3 className="text-[19px] font-medium tracking-[-0.04em] md:text-[32px]">
                  {collection.name}
                  <span className="mr-2 inline-block opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                    <ArrowLeft size={14} />
                  </span>
                </h3>

                <span className="shrink-0 font-mono text-[9px] uppercase tracking-wide text-neutral-500 md:text-[11px]">
                  {collection.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}