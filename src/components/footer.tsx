import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="absolute bottom-0  left-0 right-0 px-4 md:px-10">
      <div className="border-t w-full py-6 flex flex-col items-center justify-center">
        © 2023 URL Shortener
        <div className="flex gap-4">
          <Button variant="link" asChild>
            <Link href="/policy">Privacy Policy</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/terms">Terms of Service</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
