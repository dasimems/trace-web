"use client"

import { useState } from "react"
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
import { signIn } from "@/api/auth"
import { constructErrorMessage } from "@/api/functions"
import { emailSchema } from "@/lib/validation"

type FormValues = {
  email: string
  password: string
}

const schema = Joi.object<FormValues>({
  email: emailSchema,
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
})

export function SignInForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: joiResolver(schema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  })

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: ({ user }) => {
      const dest = user.isAccountCreationCompleted
        ? "/app/overview"
        : "/auth/sign-up/bank"
      toast.success(
        user.isAccountCreationCompleted
          ? "Welcome back."
          : "Welcome back — let's finish setting up your bank.",
      )
      router.replace(dest)
    },
    onError: (error) => {
      const message = constructErrorMessage(
        error as TApiErrorResponseType,
        "Couldn't sign you in. Please try again.",
      )
      toast.error(message)
    },
  })

  async function onSubmit(values: FormValues) {
    await mutation.mutateAsync(values)
  }

  const submitting = isSubmitting || mutation.isPending

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
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

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <a
            href="/auth/reset"
            className="text-xs text-text-3 underline-offset-4 hover:text-foreground hover:underline"
          >
            Forgot?
          </a>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            className="h-11 bg-card pr-10 text-base"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-text-3 hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="h-11 w-full rounded-full px-5 shadow-primary"
      >
        {submitting ? (
          <>
            Signing in <Spinner />
          </>
        ) : (
          <>
            Sign in <ArrowRight />
          </>
        )}
      </Button>
    </motion.form>
  )
}
