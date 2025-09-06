"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignInPage() {
  const router = useRouter();
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const t = useTranslations();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!siteKey) {
      setError("reCAPTCHA is not configured");
      return;
    }
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA");
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      recaptchaToken,
      redirect: false,
    });

    if (res?.ok) {
      router.push(`/${locale}`);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-8 max-w-md mx-auto mt-auto"
    >
      <div className="w-full max-w-600 min-h-80 bg-white dark:bg-[#262626] dark:shadow-xl/30 shadow-lg rounded-md p-9 m-1">
        <h2 className="text-sm text-gray-500 mr-11">{t("signinText")}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="m-2 w-full">
          <label className="" htmlFor="email">
            {t("email")}:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="m-2 w-full">
          <label className="mt-2" htmlFor="password">
            {" "}
            {t("password")}:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        {siteKey && (
          <div className="m-2 w-full">
            <ReCAPTCHA
              sitekey={siteKey}
              onChange={(token) => setRecaptchaToken(token)}
              onExpired={() => setRecaptchaToken(null)}
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-2 rounded m-2"
        >
          {t("signIn")}
        </button>
      </div>
    </form>
  );
}
