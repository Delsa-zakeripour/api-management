"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeIcon } from "lucide-react";
import { Button } from "./button";

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
        <Button
          className="w-9 h-9"
          variant="ghost"
          size="icon"
          aria-label="Select language"
        >
          <GlobeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => navigateToLocale("en")}>
          English | انگلیسی
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigateToLocale("fa")}>
          Persian | فارسی
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
