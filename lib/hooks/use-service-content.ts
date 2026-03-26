"use client";

import { useMemo } from "react";
import type {
  UseServiceContentOptions,
  UseServiceContentResult,
} from "@/types/hooks";

/**
 * Hook for accessing service data.
 * Since services are static content, this hook simply returns the initial service
 * without any client-side fetching.
 */
export function useServiceContent(
  _slug: string,
  { initialService = null }: UseServiceContentOptions = {},
): UseServiceContentResult {
  return useMemo(
    () => ({
      service: initialService,
      loading: false,
      isFetching: false,
      error: null,
    }),
    [initialService],
  );
}


