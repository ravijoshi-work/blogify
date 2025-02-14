import { JwtPayload } from "@/types/jwt"; // Import your custom JwtPayload type

declare module "next/server" {
  interface NextRequest {
    user?: JwtPayload; // Add the `user` property to the NextRequest type
  }
}
