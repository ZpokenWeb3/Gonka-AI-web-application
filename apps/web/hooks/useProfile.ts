"use client";

import { useState, useEffect } from "react";
import { getMe, updateProfile, GetMeResponse } from "../lib/auth";

export function useProfile() {
  const [user, setUser] = useState<GetMeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (data: {
    displayName?: string;
    avatarUrl?: string;
  }) => {
    try {
      setUpdating(true);
      const updatedUser = await updateProfile(data);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return {
    user,
    loading,
    updating,
    loadUserData,
    updateUserProfile,
  };
}
