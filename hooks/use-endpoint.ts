"use client"

import { useQuery, type UseQueryResult } from "@tanstack/react-query"

export type UseEndpointResult<T> = {
  data: T | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

function messageFor(error: unknown): string {
  const e = error as TApiErrorResponseType
  return e?.response?.data?.message ?? "Couldn't load that just yet."
}

export function useEndpoint<T>(
  key: string | null,
  fetcher: () => Promise<T>,
): UseEndpointResult<T> {
  const query: UseQueryResult<T, unknown> = useQuery<T, unknown, T, string[]>({
    queryKey: key ? [key] : ["__disabled__"],
    queryFn: fetcher,
    enabled: Boolean(key),
  })

  return {
    data: (query.data ?? null) as T | null,
    isLoading: query.isLoading || query.isFetching && !query.data,
    error: query.error ? messageFor(query.error) : null,
    refetch: async () => {
      await query.refetch()
    },
  }
}
