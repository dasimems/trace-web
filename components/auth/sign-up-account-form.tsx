"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import { useMutation } from "@tanstack/react-query"
import Joi from "joi"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { getNextStep } from "@/components/auth/sign-up-steps"
import { signUp } from "@/api/auth"
import { constructErrorMessage } from "@/api/functions"
import {
  confirmPasswordSchema,
  emailSchema,
  passwordSchema,
} from "@/lib/validation"

type FormValues = {
  email: string
  password: string
  confirmPassword: string
}

const schema = Joi.object<FormValues>({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
})

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

export function SignUpAccountForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: joiResolver(schema),
    mode: "onTouched",
    defaultValues: { email: "", password: "", confirmPassword: "" },
  })

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Account created. Let's set up your bank.")
      const next = getNextStep("account")
      if (next) router.push(next.path)
    },
    onError: (error) => {
      const message = constructErrorMessage(
        error as TApiErrorResponseType,
        "Couldn't create your account. Please try again."
      )
      toast.error(message)
    },
  })

  async function onSubmit(values: FormValues) {
    await mutation.mutateAsync({
      email: values.email,
      password: values.password,
    })
  }

  const submitting = isSubmitting || mutation.isPending

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-2xl space-y-7"
    >
      <div className="space-y-2">
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.ng"
          aria-invalid={Boolean(errors.email)}
          className="h-11 bg-card text-base"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              aria-invalid={Boolean(errors.password)}
              className="h-11 bg-card pr-10 text-base"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-text-3 hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : (
            <p className="text-xs text-text-3">
              Mix upper, lower, a number and a special character.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            aria-invalid={Boolean(errors.confirmPassword)}
            className="h-11 bg-card text-base"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="h-11 rounded-full px-5 shadow-primary"
        >
          {submitting ? (
            <>
              Creating account <Spinner />
            </>
          ) : (
            <>
              Continue <ArrowRight />
            </>
          )}
        </Button>
        <p className="text-sm text-text-3">
          By continuing, you agree to our{" "}
          <a
            href="/terms"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Terms
          </a>{" "}
          ·{" "}
          <a
            href="/privacy"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Privacy
          </a>
        </p>
      </div>

      <p className="text-sm text-text-3">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </p>
    </motion.form>
  )
}
