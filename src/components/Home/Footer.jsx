"use client";

import React from "react";
import { Link } from "@heroui/react";
import {
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
  FaLinkedinIn
} from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Dashboard-এর জন্য ফুটার হাইড রাখা হয়েছে
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 text-slate-600 py-12 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">

        {/* Brand Section */}
        <div className="sm:col-span-2 flex flex-col justify-between space-y-6">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 text-inherit no-underline hover:opacity-90 transition-opacity"
            >
              <Image
                src="/logoR.png"
                alt="GIGNEX Logo"
                width={36}
                height={36}
                priority
                className="object-contain"
              />
              <span className="font-extrabold text-2xl tracking-tight">
                <span className="text-[#06B6D4]">GiG</span>
                <span className="text-[#7700ff]">NEX</span>
              </span>
            </Link>

            <p className="mt-4 text-sm text-slate-500 max-w-xs leading-relaxed">
              Connect with top freelance talent or find your next big project today.
            </p>
          </div>

          <p className="text-xs text-slate-400">
            &copy; {currentYear} GiGNEX. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-semibold text-slate-900 text-sm tracking-wider uppercase">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="text-slate-600 hover:text-[#06B6D4] transition-colors">Home</Link></li>
            <li><Link href="/public/browsetasks" className="text-slate-600 hover:text-[#06B6D4] transition-colors">Browse Tasks</Link></li>
            <li><Link href="/public/freelancers" className="text-slate-600 hover:text-[#06B6D4] transition-colors">Browse Freelancers</Link></li>
            <li><Link href="#" className="text-slate-600 hover:text-[#06B6D4] transition-colors">How It Works</Link></li>
            <li><Link href="#" className="text-slate-600 hover:text-[#06B6D4] transition-colors">Categories</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-semibold text-slate-900 text-sm tracking-wider uppercase">Support</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="#" className="text-slate-600 hover:text-[#06B6D4] transition-colors">Help Center</Link></li>
            <li><Link href="#" className="text-slate-600 hover:text-[#06B6D4] transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="text-slate-600 hover:text-[#06B6D4] transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="text-slate-600 hover:text-[#06B6D4] transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact & Social Component */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-semibold text-slate-900 text-sm tracking-wider uppercase">Contact Us</h4>

          {/* Email */}
          <div className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-[#06B6D4] transition-colors cursor-pointer">
            <FaEnvelope size={16} className="text-slate-400" />
            <span>info@gignex.com</span>
          </div>

          {/* Official Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            {/* X / Twitter */}
            <a
              href="#"
              aria-label="Twitter"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaXTwitter size={15} />
            </a>

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaFacebookF size={15} />
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-[#0077B5] hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaLinkedinIn size={15} />
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}