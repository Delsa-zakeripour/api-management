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
    <>
      <div className="flex justify-end">
        <p className="text-lg text-center mt-9">
          {t("welcome")} {session.user?.name} 🎉
        </p>
      </div>
      <div className="">
        <button
          onClick={() => signOut({ callbackUrl: `/` })}
          className="px-4 py-2 rounded-lg bg-red-500 text-white m-1"
        >
          {t("signOut")}
        </button>
      </div>
    </>
  );
}
