import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import authApiRequest from "@/app/(auth)/login/auth.api";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await authApiRequest.sLogin(body);

  const { access_token, refresh_token } = res.payload?.result;

  const decodedAccessToken = jwtDecode(access_token) as { exp: number };
  const decodedRefreshToken = jwtDecode(refresh_token) as { exp: number };
  (await cookies()).set("access_token", access_token, {
    httpOnly: true,
    secure: true,
    maxAge: decodedAccessToken.exp - Date.now() / 1000,
  });
  (await cookies()).set("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    maxAge: decodedRefreshToken.exp - Date.now() / 1000,
  });
  return NextResponse.json(res);
}
