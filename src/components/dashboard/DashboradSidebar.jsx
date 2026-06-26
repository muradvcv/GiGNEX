"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { House, LayoutHeaderCells, Magnifier, ListCheck, Folder, CircleDollar, Person, CirclePlus, Archive, Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import DashProfile from "./DashProfile";
import { useSession } from "@/lib/auth-client";

export default function DashboradSidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const DashboardItem = {
    client: [
      { icon: House, label: "Home", href: "/" },
      { icon: LayoutHeaderCells, label: "Overview", href: "/dashboard/client" },
      { icon: ListCheck, label: "My Tasks", href: "/dashboard/client/task" },
      { icon: CirclePlus, label: "Post Task", href: "/dashboard/client/task/new" },
      { icon: Archive, label: "Proposals", href: "/dashboard/profile" },
      { icon: CircleDollar, label: "Payments", href: "/dashboard/settings" },
    ],
    freelancer: [
      { icon: LayoutHeaderCells, label: "Overview", href: "/dashboard/freelancer" },
      { icon: Magnifier, label: "Browse Tasks", href: "/public/browsetasks" },
      { icon: ListCheck, label: "My Proposals", href: "/dashboard/proposals" },
      { icon: Folder, label: "Active Projects", href: "/dashboard/projects" },
      { icon: CircleDollar, label: "Earnings", href: "/dashboard/earnings" },
      { icon: Person, label: "Edit Profile", href: "/public/freelancers/editprofile" },
    ],
    admin: [
      { icon: CirclePlus, label: "Overview", href: "/dashboard/messages" },
      { icon: CirclePlus, label: "User", href: "/dashboard/users" },
      { icon: Archive, label: "Tasks", href: "/dashboard/tasks" },
      { icon: CircleDollar, label: "Payments", href: "/dashboard/payments" },
    ]
  };

  // ✅ Role-wise নেভিগেশন (default 'client' যদি role না থাকে)
  const navItems = DashboardItem[user?.role || "client"] || DashboardItem.client;

  // ✅ শুধু ড্রয়ার বন্ধ করুন, reload করবেন না
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        isIconOnly
        variant="light"
        className="lg:hidden"
        onPress={() => setOpen(true)}
      >
        <Bars />
      </Button>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col gap-1 h-full">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logoR.png" alt="SkillSwap Logo" width={36} height={36} />
          <span className="font-extrabold text-2xl">
            <span className="text-[#0080ff]">Skill</span>
            <span className="text-[#7700ff]">Swap</span>
          </span>
        </Link>

        {navItems?.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all
              ${isActive
                  ? "bg-[#f5e9f5a3] text-[#0b8cf5] shadow-md"
                  : "text-gray-500 hover:text-black hover:bg-gray-50"
                }`}
            >
              <item.icon
                className={`size-5 ${isActive
                  ? "text-[#0babf5]"
                  : "text-gray-500 group-hover:text-black"
                  }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="mt-auto">
          <DashProfile />
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer isOpen={open} onOpenChange={(val) => setOpen(val)}>
        <Drawer.Backdrop onClick={handleClose} />

        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger onClick={handleClose} />

            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleClose} // 
                      className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all
                      ${isActive
                        ? "bg-[#f5e9f5a3] text-[#0b8cf5] shadow-md"
                        : "text-gray-500 hover:text-black hover:bg-gray-50"
                        }`}
                    >
                      <item.icon
                        className={`size-5 ${isActive
                          ? "text-[#0babf5]"
                          : "text-gray-500 group-hover:text-black"
                          }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
}