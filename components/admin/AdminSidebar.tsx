"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { signOut } from "@/app/actions/admin-auth";

interface NavItem {
  href: string;
  label: string;
  exact?: boolean;
}

interface Props {
  nav: NavItem[];
  email: string;
  role: string | null;
}

export default function AdminSidebar({ nav, email, role }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const close = () => setOpen(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 bg-charcoal border-b border-offwhite/6 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-offwhite/65 hover:text-offwhite transition-colors"
        >
          <Menu size={20} />
        </button>
        <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold">
          SJD Admin
        </p>
      </header>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar — fixed drawer on mobile, static on desktop */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-56 bg-charcoal border-r border-offwhite/6 flex flex-col
          lg:static lg:inset-auto lg:z-auto lg:translate-x-0
          transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="px-6 py-7 border-b border-offwhite/6 flex items-center justify-between">
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold">
            SJD Admin
          </p>
          <button
            onClick={close}
            aria-label="Close menu"
            className="lg:hidden text-offwhite/60 hover:text-offwhite transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={`block px-3 py-2.5 font-sans text-xs transition-colors rounded-sm ${
                isActive(item)
                  ? "text-offwhite bg-offwhite/6"
                  : "text-offwhite/75 hover:text-offwhite hover:bg-offwhite/4"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User + sign out */}
        <div className="px-6 py-5 border-t border-offwhite/6">
          <p className="font-sans text-[10px] text-offwhite/55 truncate mb-1">
            {email}
          </p>
          {role && (
            <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-offwhite/35 mb-3">
              {role}
            </p>
          )}
          <form action={signOut}>
            <button
              type="submit"
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-offwhite/60 hover:text-gold transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
