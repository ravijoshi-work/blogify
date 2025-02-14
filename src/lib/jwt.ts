import jwt from "jsonwebtoken";

export function signJwtToken(payload: object, options: object = {}) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign(payload, secret, options);
  return token;
}

export function verifyJwtToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const payload = jwt.verify(token, secret ?? "");
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
