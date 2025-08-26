import { defineRouting, Pathnames } from "next-intl/routing";

export const locales = ["en", "fa"] as const;
export const defaultLocale = "fa" as const;

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/auth/signIn": "/auth/signIn",
  "/auth/logout": "/auth/logout",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames,
});
