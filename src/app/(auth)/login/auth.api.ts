import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
} from '@/app/(auth)/login/auth.schema';
import http from '@/lib/http';
import { ApiResponse, UserType } from '@/types/api';

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: RefreshTokenResType;
  }> | null,
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/api/v1/auth/login', body),
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, {
      baseUrl: '',
    }),
  getMe: () => http.get<ApiResponse<UserType>>('/users/me'),
  sLogout: (
    body: LogoutBodyType & {
      accessToken: string;
    }
  ) =>
    http.post(
      '/api/v1/auth/logout',
      {
        refreshToken: body.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    ),
  logout: () => http.post('/api/auth/logout', null, { baseUrl: '' }),
  sRefreshToken: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>('/auth/refresh-token', body),
  async refreshToken() {
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest;
    }
    this.refreshTokenRequest = http.post<RefreshTokenResType>('/api/auth/refresh-token', null, {
      baseUrl: '',
    });
    const result = await this.refreshTokenRequest;
    this.refreshTokenRequest = null;
    return result;
  },
  setTokenToCookie: (body: { accessToken: string; refreshToken: string }) =>
    http.post('/api/auth/token', body, { baseUrl: '' }),
  getProfile: () => http.get<any>('/api/v1/auth/profile'),
};

export default authApiRequest;
