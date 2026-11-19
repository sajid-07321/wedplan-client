
"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogoMark } from "@/components/logo-mark"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"

import {
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Heart,
  Image as ImageIcon,
  Lock,
  Mail,
  Store,
  User,
} from "lucide-react"

// Account roles
const roles = [
  {
    id: "customer",
    title: "Customer",
    description: "Plan & book services",
    icon: Heart,
  },
  {
    id: "vendor",
    title: "Vendor",
    description: "Publish wedding services",
    icon: Store,
  },
] as const

type RoleId = (typeof roles)[number]["id"]

// Input styling
const fieldInputClass =
  "h-11 rounded-lg border-[#e4e2df] bg-[#fcfbfa] pl-10 text-sm text-[#2b1414] transition-colors placeholder:text-[#a9a09a] hover:border-[#d5d1cd] focus-visible:border-[#8e2333] focus-visible:bg-white focus-visible:ring-[#8e2333]/15"

// Input icon
function FieldIcon({ icon: Icon }: { icon: typeof User }) {
  return (
    <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#a9a09a]" />
  )
}

// Google icon
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.28 1.5-1.12 2.77-2.39 3.62v3.02h3.86c2.26-2.09 3.55-5.17 3.55-8.86z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.94-2.91l-3.86-3.02c-1.08.72-2.45 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.11C3.27 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.26c-.25-.72-.38-1.49-.38-2.26s.14-1.54.38-2.26V6.63H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.37l3.98-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.27 2.7 1.29 6.63l3.98 3.11C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  )
}

// Password strength
function passwordScore(value: string) {
  let score = 0

  if (value.length >= 6) score++
  if (value.length >= 10) score++
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++
  if (/\d/.test(value)) score++

  return score
}

const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"]

const strengthColors = [
  "#d64545",
  "#d64545",
  "#e9a13b",
  "#4c9a5f",
  "#4c9a5f",
]

export default function SignUpPage() {
  const router = useRouter()

  // States
  const [role, setRole] = useState<RoleId>("customer")
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const previewUrlRef = useRef<string | null>(null)

  // Page title
  useEffect(() => {
    document.title = "Create Account — WedPlan"
  }, [])

  // Cleanup image preview URL
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  // Avatar preview
  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB.")
      event.target.value = ""
      return
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }

    const url = URL.createObjectURL(file)

    previewUrlRef.current = url
    setAvatarPreview(url)
    setErrorMessage("")
  }

  // Signup handler
  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setErrorMessage("")
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const businessName = formData.get("businessName") as string | null

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        callbackURL: "/",
      })

      if (error) {
        setErrorMessage(error.message || "Something went wrong!")
        return
      }

      console.log("Signup successful:", data)

      router.push("/")

    } catch (error) {
      console.error("Signup error:", error)
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }

    // Role and businessName are collected above.
    // They need Better Auth additionalFields configuration
    // before they can be saved to the user record.
    console.log({ role, businessName })
  }

  const score = passwordScore(password)
  const showStrength = password.length > 0

  return (
    <>
      {/* Main Page */}
      <div className="relative min-h-screen overflow-hidden bg-[#333232] px-4 py-12">

        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, transparent 35%, rgba(8,5,5,0.55) 100%), radial-gradient(760px 520px at 50% 42%, rgba(255,255,255,0.05), transparent 70%), radial-gradient(900px 520px at 50% -80px, rgba(142,35,51,0.35), transparent 70%), radial-gradient(700px 480px at 88% 115%, rgba(242,201,76,0.10), transparent 65%)",
          }}
        />

        {/* Navbar */}
        <div className="relative">
          {/* Move your Navbar here if it is client-compatible */}
        </div>

        {/* Signup Card */}
        <div className="relative flex min-h-[calc(100vh_-_8rem)] items-center justify-center">

          <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3),0_20px_48px_-12px_rgba(0,0,0,0.55),0_48px_100px_-48px_rgba(142,35,51,0.55)]">

            {/* Accent bar */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7c1d2e] via-[#8e2333] to-[#f2c94c]"
            />

            {/* Header */}
            <div className="bg-gradient-to-b from-[#858481] to-white px-8 pt-9 pb-7">
              <div className="flex flex-col items-center text-center">
                <LogoMark className="size-12" svgClassName="size-6" />

                <h1 className="mt-5 font-serif text-[26px] font-bold text-[#2b1414]">
                  Create Your WedPlan Account
                </h1>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#6b625d]">
                  Join as a couple planning your wedding or as a vendor offering
                  curated services.
                </p>
              </div>
            </div>

            {/* Signup Form */}
            <form
              className="space-y-5 px-8 pb-7"
              onSubmit={handleSignUp}
            >

              {/* Account Role */}
              <div className="space-y-2.5">
                <Label className="text-[#2b1414]">
                  Account Role
                </Label>

                <div className="grid grid-cols-2 gap-3">
                  {roles.map((r) => {
                    const Icon = r.icon
                    const selected = role === r.id

                    return (
                      <button
                        key={r.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setRole(r.id)}
                        className={cn(
                          "group relative rounded-xl border p-4 text-left transition-all",
                          selected
                            ? "border-[#8e2333] bg-[#8e2333]/[0.05] shadow-[inset_0_0_0_1px_rgba(142,35,51,0.25)]"
                            : "border-[#e4e2df] bg-white hover:border-[#d5d1cd] hover:bg-[#faf9f8]"
                        )}
                      >
                        <span className="flex items-start justify-between">
                          <span
                            className={cn(
                              "flex size-8 items-center justify-center rounded-lg transition-colors",
                              selected
                                ? "bg-[#8e2333] text-white"
                                : "bg-[#f8eaec] text-[#8e2333]"
                            )}
                          >
                            <Icon className="size-4" />
                          </span>

                          {selected && (
                            <span className="flex size-5 items-center justify-center rounded-full bg-[#8e2333] text-white">
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                          )}
                        </span>

                        <span className="mt-3 block text-sm font-semibold text-[#2b1414]">
                          {r.title}
                        </span>

                        <span className="mt-0.5 block text-xs text-[#8a7f79]">
                          {r.description}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Profile Photo */}
              <div className="flex items-center gap-4 rounded-xl border border-dashed border-[#ddd8d4] bg-[#fcfbfa] p-4">

                <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f8eaec] text-sm font-semibold text-[#8e2333]">

                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Profile photo preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    "WP"
                  )}

                </span>

                <div className="min-w-0">
                  <label
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        className:
                          "h-9 cursor-pointer rounded-full border-[#d8d5d1] bg-white px-4 text-[#2b1414] hover:bg-[#f4f2f0] hover:text-[#2b1414]",
                      })
                    )}
                  >
                    <ImageIcon className="size-4" />
                    Upload Profile Photo (Optional)

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="sr-only"
                      onChange={handleAvatarChange}
                    />
                  </label>

                  <p className="mt-1.5 text-xs text-[#8a7f79]">
                    Preview only. PNG, JPG, WebP, max 5MB.
                  </p>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="full-name" className="text-[#2b1414]">
                  Full Name
                </Label>

                <div className="relative">
                  <FieldIcon icon={User} />

                  <Input
                    id="full-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Emma Watson"
                    className={fieldInputClass}
                  />
                </div>
              </div>

              {/* Business Name */}
              {role === "vendor" && (
                <div className="field-reveal space-y-1.5">
                  <Label htmlFor="business-name" className="text-[#2b1414]">
                    Business / Studio Name
                  </Label>

                  <div className="relative">
                    <FieldIcon icon={Building2} />

                    <Input
                      id="business-name"
                      name="businessName"
                      type="text"
                      required
                      autoComplete="organization"
                      placeholder="Rosewood Wedding Studio"
                      className={fieldInputClass}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[#2b1414]">
                  Email
                </Label>

                <div className="relative">
                  <FieldIcon icon={Mail} />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={fieldInputClass}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-[#2b1414]">
                  Password
                </Label>

                <div className="relative">
                  <FieldIcon icon={Lock} />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Min 6 chars, 1 uppercase & 1 lowercase"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(fieldInputClass, "pr-11")}
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[#a9a09a] transition-colors hover:text-[#2b1414]"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {/* Password Strength */}
                {showStrength && (
                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex gap-1.5">
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className="h-1 flex-1 rounded-full transition-colors duration-300"
                          style={{
                            backgroundColor:
                              i < score ? strengthColors[score] : "#eceae7",
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-[#8a7f79]">
                        At least 6 characters with 1 uppercase &amp; 1 lowercase
                        letter.
                      </span>

                      <span
                        className="font-medium"
                        style={{ color: strengthColors[score] }}
                      >
                        {strengthLabels[score]}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[#6b625d]">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 size-4 shrink-0 rounded border-[#d5d1cd] accent-[#8e2333]"
                />

                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-[#8e2333] underline-offset-2 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-[#8e2333] underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Error Message */}
              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                >
                  {errorMessage}
                </p>
              )}

              {/* Signup Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full gap-2 rounded-lg bg-[#7c1d2e] text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(124,29,46,0.6)] transition-all hover:bg-[#6b1826] hover:shadow-[0_10px_24px_-8px_rgba(124,29,46,0.75)]"
              >
                {isLoading ? "Creating Account..." : "Create Account"}

                <ArrowRight className="size-4" />
              </Button>

              {/* Divider */}
              <div className="relative text-center">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-[#e9e7e4]"
                />

                <span className="relative bg-white px-3 text-[11px] font-semibold tracking-[0.14em] text-[#9a928c] uppercase">
                  Or continue with
                </span>
              </div>

              {/* Google Signup */}
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full gap-2.5 rounded-lg border-[#e4e2df] bg-white text-sm font-medium text-[#2b1414] hover:bg-[#f7f6f4] hover:text-[#2b1414]"
              >
                <GoogleIcon />
                Sign up with Google (
                {role === "customer" ? "Customer" : "Vendor"})
              </Button>

            </form>

            {/* Footer */}
            <div className="border-t border-[#f0eeeb] bg-[#fbf9f8] px-8 py-4 text-center text-sm text-[#6b625d]">
              Already have an account?{" "}

              <Link
                href="/sign-in"
                className="font-semibold text-[#8e2333] underline-offset-2 hover:underline"
              >
                Sign in
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
