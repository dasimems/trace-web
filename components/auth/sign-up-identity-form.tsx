"use client"

import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileUploadZone } from "@/components/auth/file-upload-zone"
import { getNextStep } from "@/components/auth/sign-up-steps"

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
      {children}
    </label>
  )
}

export function SignUpIdentityForm() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = getNextStep("identity")
    if (next) router.push(next.path)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="space-y-7"
    >
      <div className="space-y-2">
        <FieldLabel htmlFor="bvn">Bank Verification Number (BVN)</FieldLabel>
        <div className="relative flex h-11 items-center rounded-lg border border-input bg-card pl-3 pr-2 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
          <input
            id="bvn"
            name="bvn"
            inputMode="numeric"
            defaultValue="2214 ··· ··78"
            className="h-full flex-1 bg-transparent text-base outline-none"
          />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-good-200 bg-good-50 px-2.5 py-1 text-xs font-medium text-good-700 dark:border-good-500/30 dark:bg-good-500/15 dark:text-good-300">
            <Check className="size-3.5" /> Verified
          </span>
        </div>
        <p className="text-sm text-text-3">
          We do an SMS-OTP check with NIBSS. We never store your full BVN.
        </p>
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="nin">National Identity Number (NIN)</FieldLabel>
        <Input
          id="nin"
          name="nin"
          inputMode="numeric"
          defaultValue="8174 5520 9981"
          className="h-11 bg-card text-base"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="dob">Date of birth</FieldLabel>
          <Input
            id="dob"
            name="dob"
            defaultValue="14 March 1996"
            className="h-11 bg-card text-base"
          />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="state">Residential state</FieldLabel>
          <Input
            id="state"
            name="state"
            defaultValue="Lagos · Mainland"
            className="h-11 bg-card text-base"
          />
        </div>
      </div>

      <div className="space-y-3">
        <FieldLabel htmlFor="id_upload-input">
          Upload government-issued ID
        </FieldLabel>
        <FileUploadZone
          name="id_upload"
          title="Drop a clear photo of your driver's license or NIN slip"
          hint="Or use your phone — we'll text a secure link"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          type="submit"
          size="lg"
          className="h-11 rounded-full px-5 shadow-primary"
        >
          Submit for verification <ArrowRight />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-11 rounded-full px-5"
        >
          Save &amp; continue later
        </Button>
      </div>
    </motion.form>
  )
}
