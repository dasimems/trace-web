"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { ArrowRight, Check } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { NubanCard } from "@/components/auth/nuban-card"
import { PillPicker, type PillOption } from "@/components/auth/pill-picker"
import { getNextStep } from "@/components/auth/sign-up-steps"
import { UserCategories } from "@/lib/enum"
import {
  categorySchema,
  firstNameSchema,
  lastNameSchema,
  middleNameSchema,
  phoneNumberSchema,
} from "@/lib/validation"
import useSignUpBufferStore from "@/stores/sign-up-buffer-store"
import useUserStore from "@/stores/user-store"

const CATEGORY_OPTIONS: ReadonlyArray<PillOption<UserCategories>> = [
  { id: UserCategories.TRADER, label: "Trader / shop owner" },
  { id: UserCategories.FREELANCER, label: "Freelancer" },
  { id: UserCategories.EMPLOYEE, label: "Salary earner" },
  { id: UserCategories.STUDENT, label: "Student hustler" },
  { id: UserCategories.SMALL_BUSINESS_OWNER, label: "Small business owner" },
]

const NUBAN_PILLS: readonly string[] = [
  "Reusable across all CBN banks",
  "Receives salary & POS settlements",
  "Free virtual card on activation",
] as const

type FormValues = {
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  category: UserCategories
}

const schema = Joi.object<FormValues>({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  middleName: middleNameSchema,
  phoneNumber: phoneNumberSchema,
  category: categorySchema,
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

export function SignUpBankForm() {
  const router = useRouter()
  const buffered = useSignUpBufferStore((s) => s.bankStep)
  const setBankStep = useSignUpBufferStore((s) => s.setBankStep)
  const userEmail = useUserStore((s) => s.userDetails?.email)

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: joiResolver(schema),
    mode: "onTouched",
    defaultValues: {
      firstName: buffered?.firstName ?? "",
      lastName: buffered?.lastName ?? "",
      middleName: buffered?.middleName ?? "",
      phoneNumber: buffered?.phoneNumber ?? "+234",
      category: (buffered?.category as UserCategories) ?? undefined,
    },
  })

  useEffect(() => {
    if (buffered) {
      reset({
        firstName: buffered.firstName,
        lastName: buffered.lastName,
        middleName: buffered.middleName,
        phoneNumber: buffered.phoneNumber,
        category: (buffered.category ?? undefined) as UserCategories,
      })
    }
  }, [buffered, reset])

  const firstName = watch("firstName")
  const lastName = watch("lastName")
  const previewName =
    [firstName, lastName].filter(Boolean).join(" ").toUpperCase() || "YOUR NAME"

  function onSubmit(values: FormValues) {
    setBankStep({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      middleName: values.middleName.trim(),
      phoneNumber: values.phoneNumber.trim(),
      category: values.category,
    })
    const next = getNextStep("bank")
    if (next) router.push(next.path)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-8"
    >
      <section className="space-y-5">
        <h2 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text-3">
          YOUR DETAILS
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="first-name">First name</FieldLabel>
            <Input
              id="first-name"
              autoComplete="given-name"
              aria-invalid={Boolean(errors.firstName)}
              className="h-11 bg-card text-base"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="last-name">Last name (Surname)</FieldLabel>
            <Input
              id="last-name"
              autoComplete="family-name"
              aria-invalid={Boolean(errors.lastName)}
              className="h-11 bg-card text-base"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="middle-name">Middle name</FieldLabel>
            <Input
              id="middle-name"
              autoComplete="additional-name"
              aria-invalid={Boolean(errors.middleName)}
              className="h-11 bg-card text-base"
              {...register("middleName")}
            />
            {errors.middleName && (
              <p className="text-sm text-destructive">
                {errors.middleName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="phone-number">Phone</FieldLabel>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  id="phone-number"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  aria-invalid={Boolean(errors.phoneNumber)}
                  placeholder="+2348012345678"
                  className="h-11 bg-card text-base"
                />
              )}
            />
            {errors.phoneNumber ? (
              <p className="text-sm text-destructive">
                {errors.phoneNumber.message}
              </p>
            ) : (
              <p className="text-xs text-text-3">
                Used by Squad for transaction alerts. International format.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <FieldLabel htmlFor="category">I am a…</FieldLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <PillPicker
                options={CATEGORY_OPTIONS}
                value={field.value ?? null}
                onChange={field.onChange}
                ariaLabel="What kind of earner are you?"
                name="category"
              />
            )}
          />
          {errors.category ? (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          ) : (
            <p className="text-sm text-text-3">
              Helps Copilot tune insights to how you actually earn and spend.
            </p>
          )}
        </div>

        {userEmail && (
          <p className="text-xs text-text-3">
            Signed in as{" "}
            <span className="font-medium text-text-2">{userEmail}</span>.
          </p>
        )}
      </section>

      <NubanCard
        accountNumber="0000000000"
        accountName={previewName}
        bank="Squad / GTCO · 058"
        status="pending"
      />

      <ul className="flex flex-wrap gap-2">
        {NUBAN_PILLS.map((label) => (
          <li
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-text-2"
          >
            <Check className="size-3.5 text-lime-500" />
            {label}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-11 rounded-full px-5 shadow-primary"
        >
          Continue to identity <ArrowRight />
        </Button>
      </div>
    </motion.form>
  )
}
