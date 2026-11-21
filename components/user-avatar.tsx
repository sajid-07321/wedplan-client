"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient, useSession } from "@/lib/auth-client"
import { ChevronDown, LayoutDashboard, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export function UserAvatar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const user = session?.user

  if (!user) return null

  async function handleLogout() {
    await authClient.signOut()
    setIsOpen(false)
    router.push("/sign-in")
    router.refresh()
  }

  const initials = user.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  // "/dashboard" resolves to the user's own portal server-side.
  const dashboardLink = "/dashboard"

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1 pr-3 pl-1 transition hover:bg-white/15"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "Profile"}
            width={36}
            height={36}
            unoptimized
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-9 items-center justify-center rounded-full bg-[#8e2333] text-sm font-semibold text-white">
            {initials || "U"}
          </div>
        )}

        <div className="hidden text-left sm:block">
          <p className="max-w-32 truncate text-sm font-medium text-[#f7f0e8]">
            {user.name || "User"}
          </p>

          <p className="text-[10px] text-[#c2b4ab] capitalize">
            {user.role || "Customer"}
          </p>
        </div>

        <ChevronDown
          className={cn(
            "size-4 text-[#c2b4ab] transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close profile menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full right-0 z-50 mt-3 w-64 overflow-hidden rounded-xl border border-[#e9e3dd] bg-white shadow-xl">
            {/* User Information */}
            <div className="border-b border-[#eee9e4] px-4 py-4">
              <p className="truncate text-sm font-semibold text-[#2b1414]">
                {user.name || "User"}
              </p>

              <p className="mt-1 truncate text-xs text-[#8a817b]">
                {user.email}
              </p>

              <div className="mt-3">
                <span className="rounded-full bg-[#f8e9eb] px-3 py-1 text-[11px] font-semibold text-[#8e2333] capitalize">
                  {user.role || "Customer"}
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="border-b border-[#eee9e4] p-2">
              <Link
                href={dashboardLink}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#39302d] transition hover:bg-[#f7f4f2]"
              >
                <LayoutDashboard className="size-4 text-[#8e2333]" />
                Dashboard
              </Link>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#39302d] transition hover:bg-[#f7f4f2]"
              >
                <Settings className="size-4 text-[#8e2333]" />
                Profile Settings
              </Link>
            </div>

            {/* Logout */}
            <div className="p-2">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#a43b43] transition hover:bg-[#f8e9eb]"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
