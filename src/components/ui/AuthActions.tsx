"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export function AuthActions() {
  const { data: session } = useSession();
  const t = useTranslations();
  const locale = useLocale();

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-2 m-2 rounded-lg bg-violet-600 text-white text-md"
      >
        {t("signIn")}
      </button>
    );
  }

  return (
    <div>
      <p className="text-lg">
        {t("welcome")} {session.user?.name} 🎉
      </p>

      <button
        onClick={() => signOut({ callbackUrl: `/${locale}` })}
        className="px-4 py-2 rounded-lg bg-red-500 text-white m-4"
      >
        {t("signOut")}
      </button>
    </div>
  );
}
