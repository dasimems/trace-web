import useUserStore from "@/stores/user-store"
import axios, { AxiosRequestConfig } from "axios"
import { toast } from "sonner"

const controller = new AbortController()

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`

// Lazy initialization to avoid circular dependency
const getResetUserDetails = () => useUserStore.getState().clearStore

const api = axios.create({
  baseURL,
  signal: controller.signal,
  withCredentials: true,
})

// Read the token from the persisted user-store on every outgoing request.
// Avoids the rehydration race where requests fired before `axios.defaults`
// was populated would go out unauthenticated and trip the 401 interceptor.
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`)
  }
  return config
})

// URLs whose 401s are handled by their own callers (bootstrap, auth flow) and
// must not trip the global "session expired" cleanup — otherwise refresh-time
// revalidation would wipe a freshly-rehydrated token before the bootstrap
// gets a chance to interpret the failure.
const SKIP_401_LOGOUT_URLS = new Set([
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/me",
])

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const url = error?.config?.url as string | undefined
    const userDetails = useUserStore.getState().userDetails
    if (
      status === 401 &&
      (!url || !SKIP_401_LOGOUT_URLS.has(url)) &&
      userDetails !== null
    ) {
      getResetUserDetails()()
      toast.error("Login expired! Please login again.")
    }
    return Promise.reject(error)
  }
)

export const postData = <T, D>(
  url: string,
  data?: T | undefined,
  options?: AxiosRequestConfig
): TApiRequestResponseType<D> => {
  return api.post(url, data, options)
}

export const getData = <T>(
  url: string,
  options?: AxiosRequestConfig
): TApiRequestResponseType<T> => {
  return api.get(url, options)
}

export const putData = <T, D>(
  url: string,
  data: T | undefined,
  options?: AxiosRequestConfig
): TApiRequestResponseType<D> => {
  return api.put(url, data, options)
}

export const patchData = <T, D>(
  url: string,
  data: T | undefined,
  options?: AxiosRequestConfig
): TApiRequestResponseType<D> => {
  return api.patch(url, data, options)
}

export const deleteData = <T>(
  url: string,
  options?: AxiosRequestConfig
): TApiRequestResponseType<T | undefined> => {
  return api.delete(url, options)
}

export const abortOutgoingRequest = () => {
  controller.abort()
}

export default api
