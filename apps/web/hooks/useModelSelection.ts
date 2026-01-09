"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";
import { 
  hasModelCookie, 
  setModelCookie, 
  getModelCookie,
  clearModelCookie 
} from "../lib/auth";

export function useModelSelection() {
  const { isAuthenticated } = useAuth();
  const { user, loading: profileLoading, updateUserProfile } = useProfile();
  const [showModelModal, setShowModelModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !profileLoading) {
      const hasCookie = hasModelCookie();
      const hasDefaultModel = user?.defaultModel;
      
      if (!hasCookie && !hasDefaultModel) {
        setShowModelModal(true);
      } else if (hasCookie && !hasDefaultModel) {
        const modelFromCookie = getModelCookie();
        if (modelFromCookie) {
          updateUserProfile({ defaultModel: modelFromCookie as "QWEN25" | "QWEN323" | "QWEN332" | "QWENQWQ" | "REDHAT" }).catch(console.error);
        }
      }
    }
  }, [isAuthenticated, profileLoading, user, updateUserProfile]);

  const selectModel = async (model: "QWEN25" | "QWEN323" | "QWEN332" | "QWENQWQ" | "REDHAT") => {
    setLoading(true);
    try {
      await updateUserProfile({ defaultModel: model });
      setModelCookie(model);
      setShowModelModal(false);
    } catch (error) {
      console.error("Failed to save model selection:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearModelSelection = () => {
    clearModelCookie();
    setShowModelModal(false);
  };

  return {
    showModelModal,
    loading,
    selectModel,
    clearModelSelection,
    setShowModelModal,
  };
}
