import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const mockUser = {
  id: "1",
  name: "Anna",
  email: "anna@example.com",
  password: "123456",
};

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Verify Google reCAPTCHA token before checking credentials
        const recaptchaToken = (credentials as any)?.recaptchaToken as
          | string
          | undefined;

        if (!recaptchaToken) {
          return null;
        }

        try {
          const secret = process.env.RECAPTCHA_SECRET_KEY;
          if (!secret) {
            throw new Error("Missing RECAPTCHA_SECRET_KEY");
          }

          const params = new URLSearchParams();
          params.append("secret", secret);
          params.append("response", recaptchaToken);

          const verifyRes = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: params.toString(),
            }
          );

          const verifyJson = (await verifyRes.json()) as {
            success: boolean;
            challenge_ts?: string;
            hostname?: string;
            "error-codes"?: string[];
          };

          if (!verifyJson.success) {
            return null;
          }
        } catch (err) {
          return null;
        }

        if (
          credentials?.email === mockUser.email &&
          credentials?.password === mockUser.password
        ) {
          return {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
