"use client";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./Search";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";

const Navbar = () => {
  // Mock data - replace with your actual cart state
  const cartItemCount = 3; // Example: 3 items in cart

  return (
    <nav className="flex p-4 bg-white h-24">
      <div className="flex items-center w-full min-h-full gap-4">
        <Link className="flex flex-1 justify-center items-center" href="/">
          <Image
            className="object-cover"
            src="/logo.png"
            alt="logo"
            width={160}
            height={160}
          />
        </Link>

        <div className="flex flex-3 justify-center">
          <SearchBar onSearch={() => {}} />
        </div>
        <div className="flex flex-3 justify-end item-center gap-6">
          <div className="relative">
            <Button className="flex items-center justify-center bg-gray-200 text-black hover:bg-gray-300">
              <span>Cart</span>
              <ShoppingCart className="size-6 ml-2" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-red-400 text-white hover:bg-red-500">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
          <Link
            className="flex items-center justify-center text-black px-2"
            href="/about"
          >
            <span>About</span>
          </Link>
          <Link
            className="flex items-center justify-center text-black px-2"
            href="/contact"
          >
            <span>Contact</span>
          </Link>
          <Button className="bg-blue-500 text-white">
            <span>Login</span>
          </Button>
        </div>
        <div className="flex flex-initial w-16 items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
