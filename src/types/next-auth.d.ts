import { DefaultSession } from "next-auth";

// Extend the default session type to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      _id: string; // Add a custom ID field
      name: string;
      email: string;
      accessToken: string; // Optional role field
    };
  }
}

export { DefaultSession };
