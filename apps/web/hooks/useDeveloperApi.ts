"use client";

import { useState, useEffect } from "react";
import {
  createApiKey,
  getApiKeys,
  deleteApiKey,
  ApiKey,
  CreateApiKeyResponse,
  CreateApiKeyRequest,
} from "../lib/developer-api";

export function useDeveloperApi() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadApiKeys = async () => {
    try {
      setLoading(true);
      const keys = await getApiKeys();
      setApiKeys(keys);
    } catch (error) {
      console.error("Failed to load API keys:", error);
    } finally {
      setLoading(false);
    }
  };

  const createNewApiKey = async (
    payload: CreateApiKeyRequest
  ): Promise<CreateApiKeyResponse> => {
    try {
      setCreating(true);
      const newKey = await createApiKey(payload);

      const apiKey: ApiKey = {
        ...newKey,
        lastUsedAt: null,
      };

      setApiKeys((prev) => [apiKey, ...prev]);
      return newKey;
    } catch (error) {
      console.error("Failed to create API key:", error);
      throw error;
    } finally {
      setCreating(false);
    }
  };

  const deleteApiKeyById = async (keyId: string): Promise<void> => {
    try {
      setDeleting(keyId);
      await deleteApiKey(keyId);
      setApiKeys((prev) => prev.filter((key) => key.id !== keyId));
    } catch (error) {
      console.error("Failed to delete API key:", error);
      throw error;
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    loadApiKeys();
  }, []);

  return {
    apiKeys,
    loading,
    creating,
    deleting,
    loadApiKeys,
    createNewApiKey,
    deleteApiKeyById,
  };
}
