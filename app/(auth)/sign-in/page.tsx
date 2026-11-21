"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogoMark } from "@/components/logo-mark"
import { cn } from "@/lib/utils"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const fieldInputClass =
  "h-11 rounded-lg border-[#e4e2df] bg-[#fcfbfa] pl-10 text-sm text-[#2b1414] transition-colors placeholder:text-[#a9a09a] hover:border-[#d5d1cd] focus-visible:border-[#8e2333] focus-visible:bg-white focus-visible:ring-[#8e2333]/15"

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

function FieldIcon({ icon: Icon }: { icon: typeof Mail }) {
  return (
    <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#a9a09a]" />
  )
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      })

      if (error) {
        setErrorMessage(error.message || "Unable to sign in.")
        return
      }

      // "/dashboard" redirects to the portal matching the user's role.
      router.push("/dashboard")
      router.refresh()
    } catch {
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })

    if (error) {
      setErrorMessage(error.message || "Google sign in failed.")
    }
  }

  return (
    <>
      <main className="relative min-h-[calc(100vh_-_4rem)] overflow-hidden bg-[#333232] px-4 py-12">
        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, transparent 35%, rgba(8,5,5,0.55) 100%), radial-gradient(760px 520px at 50% 42%, rgba(255,255,255,0.05), transparent 70%), radial-gradient(900px 520px at 50% -80px, rgba(142,35,51,0.35), transparent 70%), radial-gradient(700px 480px at 88% 115%, rgba(242,201,76,0.10), transparent 65%)",
          }}
        />

        <div className="relative flex min-h-[calc(100vh_-_14rem)] items-center justify-center">
          <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3),0_20px_48px_-12px_rgba(0,0,0,0.55),0_48px_100px_-48px_rgba(142,35,51,0.55)]">
            {/* Accent */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7c1d2e] via-[#8e2333] to-[#f2c94c]"
            />

            {/* Header */}
            <div className="bg-gradient-to-b from-[#7a7876] to-white px-8 pt-9 pb-7">
              <div className="flex flex-col items-center text-center">
                <LogoMark className="size-12" svgClassName="size-6" />

                <h1 className="mt-5 font-serif text-[26px] font-bold text-[#2b1414]">
                  Welcome Back to WedPlan
                </h1>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#6b625d]">
                  Sign in to explore service details, manage bookings, or grow
                  your wedding studio.
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-white px-8 pb-7"
            >
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[#2b1414]">
                  Email Address
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#2b1414]">
                    Password
                  </Label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-[#8e2333] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <FieldIcon icon={Lock} />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={cn(fieldInputClass, "pr-11")}
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
              </div>

              {/* Remember Me */}
              <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#6b625d]">
                <input
                  type="checkbox"
                  name="remember"
                  className="size-4 rounded border-[#d5d1cd] accent-[#8e2333]"
                />
                Remember me
              </label>

              {/* Error */}
              {errorMessage && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMessage}
                </p>
              )}

              {/* Sign In */}
              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full gap-2 rounded-lg bg-[#7c1d2e] text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(124,29,46,0.6)] transition-all hover:bg-[#6b1826]"
              >
                {loading ? "Signing In..." : "Sign In"}
                {!loading && <ArrowRight className="size-4" />}
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

              {/* Google */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="h-11 w-full gap-2.5 rounded-lg border-[#e4e2df] bg-white text-sm font-medium text-[#2b1414] hover:bg-[#f7f6f4] hover:text-[#2b1414]"
              >
                <GoogleIcon />
                Continue with Google
              </Button>
            </form>

            {/* Footer */}
            <div className="border-t border-[#f0eeeb] bg-[#fbf9f8] px-8 py-4 text-center text-sm text-[#6b625d]">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-[#8e2333] underline-offset-2 hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
