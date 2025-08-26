import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { AuthActions } from "@/components/ui/AuthActions";
import { getTranslations } from "next-intl/server"; // ✅ use server API
// import Image from "next/image";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export default async function Home() {
  const session = await getServerSession(authOption);
  const t = await getTranslations();
  console.log("session", session);

  return (
    <>
      <div className="flex flex-end m-5 ml-9 justify-between">
        <div>
          <LanguageSwitcher />
        </div>
        <AuthActions />
      </div>

      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex justify-end m-4">{/* <AuthActions /> */}</div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </div>
    </>
  );
}
