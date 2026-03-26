"use client";

import { useMemo } from "react";
import type {
  UseProductContentOptions,
  UseProductContentResult,
} from "@/types/hooks";

/**
 * Hook for accessing product data.
 * Since products are static content, this hook simply returns the initial product
 * without any client-side fetching.
 */
export function useProductContent(
  _slug: string,
  { initialProduct = null }: UseProductContentOptions = {},
): UseProductContentResult {
  return useMemo(
    () => ({
      product: initialProduct,
      loading: false,
      isFetching: false,
      error: null,
    }),
    [initialProduct],
  );
}


