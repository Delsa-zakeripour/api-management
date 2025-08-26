"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EarthIcon } from "lucide-react";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function navigateToLocale(nextLocale: string) {
    if (!pathname) return;
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = nextLocale;
    }
    const nextPath = segments.join("/") || "/";
    startTransition(() => {
      router.replace(nextPath);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <span>
            <EarthIcon />
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => navigateToLocale("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigateToLocale("fa")}>
          فارسی
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
