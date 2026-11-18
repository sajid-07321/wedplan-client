
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SignInForm } from "@/components/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In — WedPlan",
  description:
    "Sign in to your WedPlan account to manage bookings and wedding services.",
}

export default function SignInPage() {
  return (
    <>
      <Navbar />

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
          <SignInForm />
        </div>

      </main>
    </>
  )
}
