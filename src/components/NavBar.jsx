"use client";

import { useState } from "react";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";

export default function NavBar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);


  // dashboard er jonno nav hide
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Tasks", href: "/public/browsetasks" },
    { label: "Freelancers", href: "/public/freelancers" },
  ];

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      // Force refresh + redirect
      router.refresh();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow">
      <div className="max-w-7xl mx-auto h-16 px-4 lg:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logoR.png"
            alt="SkillSwap Logo"
            width={36}
            height={36}
            priority
          />

          <span className="font-extrabold text-2xl tracking-tight">
            <span className="text-[#06B6D4]">Skill</span>
            <span className="text-[#7700ff]">Swap</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-[#4B4CFE] transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="flex items-center justify-between w-full px-4">
              {/* Dashboard */}
              <div className="h-5 w-24 mr-5 bg-gray-200 animate-pulse rounded"></div>

              {/* Profile + Logout */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-5 w-5 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          ) : user ? (
            <>
              <div className="flex items-center gap-4">
                {/* Dashboard */}
                <Link
                  href={`/dashboard/${user.role}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                >
                  <LayoutDashboard size={18} />
                  <span className="font-medium">Dashboard</span>
                </Link>

                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user?.name || "User"}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />

                  ) : (
                    <div className="w-full h-full bg-amber-100 text-amber-600 flex items-center justify-center font-semibold text-sm">
                      {user?.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg  bg-red-50 text-red-800 transition hover:bg-red-200 cursor-pointer"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-6 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                    className="px-6 h-10 flex items-center justify-center rounded-xl bg-[#06B6D4] text-white font-medium shadow-sm hover:shadow-md hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 border-t" : "max-h-0"
          }`}
      >
        <div className="px-4 py-5 bg-white">
          {/* Links */}
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Auth */}
          <div className="flex flex-col gap-3 mt-6">
            {isPending ? (
              <div className="text-center text-sm text-gray-500">
                Loading...
              </div>
            ) : user ? (
              <>
                <div className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3">

                  {/* Dashboard */}
                  <Link
                    href="/dashboard/client"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-gray-600 hover:text-black transition"
                  >
                    <LayoutDashboard size={18} />
                    <span className="text-sm font-medium">Dashboard</span>
                  </Link>

                  {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt={user?.name || "User"}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover shadow"
                        />

                      ) : (
                        <div className="w-full h-full bg-amber-100 text-amber-600 flex items-center justify-center font-semibold text-sm">
                          {user?.name?.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="w-full h-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>

                <Link
                  href="/auth/register"
                  className="w-full h-11 flex items-center justify-center rounded-xl bg-[#0080ff] text-white font-medium shadow-sm hover:shadow-md hover:opacity-90 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}