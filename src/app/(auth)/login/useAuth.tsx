"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { useAppStore } from "@/components/providers/app-provider";

import authApiRequest from "./auth.api";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.logout,
  });
};

export const useSetTokenToCookieMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.setTokenToCookie,
  });
};

export const useGetProfileMutation = () => {
  const { isAuth } = useAppStore();
  return useQuery({
    queryKey: ["me"],
    queryFn: authApiRequest.getProfile,
    enabled: isAuth,
  });
};
