import axios, { AxiosError } from "axios";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export const AUTH_COOKIE_NAME = "gonka_token";
export const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days


export type GetNonceResponse = {
  nonce: string;
};

export type VerifyWalletResponse = {
  token: string;
};

export type AuthError = {
  message: string;
  code?: string;
};


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


apiClient.interceptors.request.use((config) => {
  const token = getAuthTokenCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
        | { message?: string; error?: string }
        | string
        | undefined;

    if (typeof data === "string") return data || fallback;
    if (data?.message) return data.message;
    if (data?.error) return data.error;

    return error.message || fallback;
  }

  if (error instanceof Error) return error.message || fallback;

  return fallback;
}


export async function getNonce(address: string): Promise<GetNonceResponse> {
  if (!address || typeof address !== "string") {
    throw new Error("Invalid address provided");
  }

  try {
    const { data } = await apiClient.post<GetNonceResponse>("/auth/nonce", {
      address: address.toLowerCase(),
    });

    if (!data?.nonce) {
      throw new Error("Invalid response: nonce is missing");
    }

    return data;
  } catch (error) {
    const message = extractErrorMessage(error, "Failed to get nonce");
    throw new Error(message);
  }
}

export async function verifyWallet(params: {
  address: string;
  signature: string;
  nonce: string;
}): Promise<VerifyWalletResponse> {
  if (!params.address || !params.signature || !params.nonce) {
    throw new Error("Missing required parameters for wallet verification");
  }

  try {
    const { data } = await apiClient.post<VerifyWalletResponse>(
        "/auth/verify",
        {
          address: params.address.toLowerCase(),
          nonce: params.nonce,
          signature: params.signature,
        }
    );

    if (!data?.token) {
      throw new Error("Invalid response: token is missing");
    }

    return data;
  } catch (error) {
    const message = extractErrorMessage(error, "Failed to verify wallet");
    throw new Error(message);
  }
}

export function setAuthTokenCookie(token: string): boolean {
  if (typeof document === "undefined") {
    console.warn("setAuthTokenCookie called in non-browser environment");
    return false;
  }

  if (!token || typeof token !== "string") {
    console.error("Invalid token provided");
    return false;
  }

  try {
    const cookieString = [
      `${AUTH_COOKIE_NAME}=${token}`,
      "Path=/",
      `Max-Age=${AUTH_COOKIE_MAX_AGE_SECONDS}`,
      "SameSite=Lax",
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
        .filter(Boolean)
        .join("; ");

    document.cookie = cookieString;
    return true;
  } catch (error) {
    console.error("Failed to set auth cookie:", error);
    return false;
  }
}

export function getAuthTokenCookie(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) =>
      row.startsWith(`${AUTH_COOKIE_NAME}=`)
  );

  if (!tokenCookie) return null;

  const token = tokenCookie.split("=")[1];
  return token || null;
}

export function hasAuthTokenCookie(): boolean {
  return getAuthTokenCookie() !== null;
}

export function clearAuthTokenCookie(): boolean {
  if (typeof document === "undefined") return false;

  try {
    document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
    return true;
  } catch (error) {
    console.error("Failed to clear auth cookie:", error);
    return false;
  }
}

export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}



