import { getServerSession, NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connect } from "@/lib/db";
import { signJwtToken } from "@/lib/jwt";
import { JWT } from "next-auth/jwt";
import { JwtPayload } from "jsonwebtoken";
import { IGetUser } from "@/types/user";

type CredentialsType = {
  email: string;
  password: string;
  id: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        await connect();

        const { email, password } = <CredentialsType>credentials;

        try {
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("User not found with the provided email");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Incorrect password. Please try again.");
          } else {
            const { ...currentUser } = user._doc;

            const accessToken = signJwtToken(currentUser, { expiresIn: "7d" });

            return {
              ...currentUser,
              accessToken,
            };
          }
        } catch (error: unknown) {
          throw new Error((error as Error)?.message || "Invalid Credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: unknown }) {
      if (user) {
        token.accessToken = (user as IGetUser)?.accessToken;
        token._id = (user as IGetUser)?._id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JwtPayload }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
