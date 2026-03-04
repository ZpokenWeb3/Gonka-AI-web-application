import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

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

function getAuthTokenCookie(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) =>
    row.startsWith("gonka_token=")
  );

  if (!tokenCookie) return null;

  const token = tokenCookie.split("=")[1];
  return token || null;
}

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
  lastUsedAt: string | null;
  isActive: boolean;
  rateLimitPerMinute?: number | null;
  rateLimitPerDay?: number | null;
  monthlySpendLimit?: number | null;
}

export interface CreateApiKeyResponse {
  id: string;
  name: string;
  keyPrefix: string;
  fullKey: string;
  rateLimitPerMinute?: number | null;
  rateLimitPerDay?: number | null;
  monthlySpendLimit?: number | null;
  createdAt: string;
  isActive: boolean;
}

export interface CreateApiKeyRequest {
  name: string;
  rateLimitPerMinute?: number;
  rateLimitPerDay?: number;
  monthlySpendLimit?: number;
}

export interface UpdateApiKeyRequest {
  name?: string;
  rateLimitPerMinute?: number;
  rateLimitPerDay?: number;
  monthlySpendLimit?: number;
  isActive?: boolean;
}

export async function createApiKey(payload: CreateApiKeyRequest): Promise<CreateApiKeyResponse> {
  try {
    const { data } = await apiClient.post<{success: boolean; data: CreateApiKeyResponse}>(
      "/developer/keys",
      payload
    );
    
    if (!data.success || !data.data) {
      throw new Error("Invalid response structure");
    }
    
    return data.data;
  } catch(error) {
    const message = extractErrorMessage(error, "Failed to create API key");
    throw new Error(message);
  }
}

export async function getApiKeys(): Promise<ApiKey[]> {
  try {
    const { data } = await apiClient.get<{success: boolean; data: ApiKey[]}>("/developer/keys");
    
    if (!data.success || !data.data) {
      throw new Error("Invalid response structure");
    }
    
    return data.data;
  } catch(error) {
    const message = extractErrorMessage(error, "Failed to get API keys");
    throw new Error(message);
  }
}

export async function deleteApiKey(keyId: string): Promise<void> {
  try {
    await apiClient.delete(`/developer/keys/${keyId}`);
  } catch(error) {
    const message = extractErrorMessage(error, "Failed to delete API key");
    throw new Error(message);
  }
}

export async function updateApiKey(
  keyId: string,
  payload: UpdateApiKeyRequest
): Promise<ApiKey> {
  try {
    const { data } = await apiClient.patch<{ success: boolean; data: ApiKey }>(
      `/developer/keys/${keyId}`,
      payload
    );

    if (!data.success || !data.data) {
      throw new Error("Invalid response structure");
    }

    return data.data;
  } catch (error) {
    const message = extractErrorMessage(error, "Failed to update API key");
    throw new Error(message);
  }
}
