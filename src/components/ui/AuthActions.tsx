"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthActions() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-2 rounded bg-green-600 text-white"
      >
        Sign In
      </button>
    );
  }

  return (
    <div>
      <p className="text-lg">Welcome {session.user?.name} 🎉</p>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-4 py-2 rounded bg-blue-600 text-white m-4"
      >
        Sign Out
      </button>
    </div>
  );
}
