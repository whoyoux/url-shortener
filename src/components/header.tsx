"use client";

import Link from "next/link";
import React from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  return (
    <header className="relative">
      <nav className="flex items-center justify-between p-6 border-b">
        <Link href="/">
          <svg
            className=" h-6 w-6"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span className="sr-only">URL Shortener</span>
        </Link>
        <div className="flex items-center gap-4">
          <UserSwitcher />
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
};

const UserSwitcher = () => {
  const { data: session, status } = useSession();

  switch (status) {
    case "authenticated":
      return <UserDropdown session={session} />;
    case "unauthenticated":
      return <LoginButton />;
    case "loading":
      return <LoadingButton />;
  }
};

type LoginButtonProps = {
  loading?: boolean;
};

const LoginButton = ({ loading = false }: LoginButtonProps) => {
  return (
    <Button size="lg" onClick={() => signIn("discord")} disabled={loading}>
      Login
    </Button>
  );
};

const LoadingButton = () => {
  return (
    <Button size="lg" disabled variant="outline">
      Loading
    </Button>
  );
};

type UserDropdownProps = {
  session: Session | null;
};

const UserDropdown = ({ session }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Button
            variant="outline"
            className="hidden md:block z-10"
            aria-label="User dropdown"
            size="lg"
          >
            {session?.user.email}
          </Button>
          <Avatar className="block md:hidden cursor-pointer z-10">
            <AvatarImage src={session?.user.image} />
            <AvatarFallback>{session?.user.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>User quick menu</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/dashboard">
          <DropdownMenuItem>
            <User className="mr-2 w-4 h-4" />
            Dashboard
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 w-4 h-4" />
          Logout
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
