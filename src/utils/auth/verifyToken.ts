import type { JWTPayload } from "jose";
import { jwtVerify } from "jose";

async function verifyToken(
  token: string,
  secret: string
): Promise<JWTPayload | false> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    return payload;
  } catch (error) {
    return false;
  }
}

export default verifyToken;
