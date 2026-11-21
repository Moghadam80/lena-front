"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// One in-flight/finished request per endpoint, so components that need the
// same data (and React strict mode's double effects) share a single call.
const cache = new Map<() => Promise<unknown>, Promise<unknown>>();

function load<T>(request: () => Promise<T>) {
  let promise = cache.get(request) as Promise<T> | undefined;

  if (!promise) {
    promise = request();
    cache.set(request, promise);
    // Allow a retry on the next mount if it failed.
    promise.catch(() => cache.delete(request));
  }

  return promise;
}

// Loads data once on mount. `request` must be a stable (module-level) function.
export function useApi<T>(request: () => Promise<T>, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    load(request)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        toast.error("دریافت اطلاعات از سرور ناموفق بود", { id: "api-error" });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [request]);

  return { data, loading };
}