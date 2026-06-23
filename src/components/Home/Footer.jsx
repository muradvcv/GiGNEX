"use client";

import React from "react";
import { Link } from "@heroui/react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebookF,
  FaEnvelope
} from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

    // dashboard er jonno nav hide
    const pathname = usePathname();
  
    if (pathname?.startsWith("/dashboard")) {
      return null;
    }

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 text-slate-600 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">


        <div className="col-span-2 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3">


              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-3 text-inherit no-underline"
              >
                <Image
                  src="/logoR.png"
                  alt="GIGNEX Logo"
                  width={36}
                  height={36}
                  priority
                />
                <span className="font-extrabold text-2xl tracking-tight">

                  <span className="text-[#06B6D4]">Skill</span>


                  <span className="text-[#7700ff]">Swap</span>
                </span>
              </Link>



            </div>

            <p className="mt-4 text-sm text-slate-500 max-w-xs">
              Connect with top freelance talent or find your next big project today.
            </p>
          </div>

          <p className="text-xs text-slate-400">
            &copy; {currentYear} GiGNEX. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-semibold text-slate-900 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Home</Link></li>
            <li><Link href="#">Browse Tasks</Link></li>
            <li><Link href="#">Browse Freelancers</Link></li>
            <li><Link href="#">How It Works</Link></li>
            <li><Link href="#">Categories</Link></li>
          </ul>
        </div>

        {/* Clients */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-semibold text-slate-900 text-sm">For Clients</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Post a Task</Link></li>
            <li><Link href="#">My Tasks</Link></li>
            <li><Link href="#">Proposals</Link></li>
          </ul>
        </div>

        {/* Freelancers */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-semibold text-slate-900 text-sm">For Freelancers</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Browse Tasks</Link></li>
            <li><Link href="#">My Proposals</Link></li>
            <li><Link href="#">Earnings</Link></li>
          </ul>
        </div>

        {/* Support + Social */}
        <div className="col-span-2 md:col-span-1 flex flex-col space-y-6">

          {/* Support */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-slate-900 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Contact Us</Link></li>
              <li><Link href="#">Terms</Link></li>
              <li><Link href="#">Privacy</Link></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-blue-600 transition">
              <FaTwitter size={14} />
            </a>

            <a className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-blue-600 transition">
              <FaFacebookF size={14} />
            </a>

            <a className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-blue-600 transition">
              <FaLinkedin size={14} />
            </a>

            <a className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-blue-600 transition">
              <FaInstagram size={14} />
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FaEnvelope size={14} />
            <span>info@gignex.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
}