import { NextIntlClientProvider, useMessages } from "next-intl";
import Providers from "../providers";

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  const { locale } = params;
  console.log("locale", locale);
  const dir = ["fa"].includes(locale) ? "rtl" : "ltr";

  return (
    <div dir={dir}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Providers>{children}</Providers>
      </NextIntlClientProvider>
    </div>
  );
}

