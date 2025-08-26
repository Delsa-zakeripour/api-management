"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export default function SignInPage() {
  const router = useRouter();
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
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
      <div className="bg-white shadow-lg rounded-md p-9 m-1">
        <h2 className="text-xl font-bold m-1">{t("signIn")}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="m-2 w-full">
          <label className="my-2" htmlFor="email">
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
          <label className="my-2" htmlFor="password">
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
        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-2 rounded m-2"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
