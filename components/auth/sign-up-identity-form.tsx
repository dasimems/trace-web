"use client"

import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import { useMutation } from "@tanstack/react-query"
import Joi from "joi"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NumericInput } from "@/components/ui/numeric-input"
import { Spinner } from "@/components/ui/spinner"
import { PillPicker, type PillOption } from "@/components/auth/pill-picker"
import { getNextStep, SIGN_UP_STEPS } from "@/components/auth/sign-up-steps"
import { createAccount } from "@/api/auth"
import { constructErrorMessage } from "@/api/functions"
import { UserGenders } from "@/lib/enum"
import {
  addressSchema,
  bvnSchema,
  dateOfBirthSchema,
  genderSchema,
  ninSchema,
} from "@/lib/validation"
import useSignUpBufferStore from "@/stores/sign-up-buffer-store"

const GENDER_OPTIONS: ReadonlyArray<PillOption<UserGenders>> = [
  { id: UserGenders.MALE,   label: "Male" },
  { id: UserGenders.FEMALE, label: "Female" },
]

type FormValues = {
  bvn: string
  nin: string
  dateOfBirth: string
  gender: UserGenders
  address: string
}

const schema = Joi.object<FormValues>({
  bvn: bvnSchema,
  nin: ninSchema,
  dateOfBirth: dateOfBirthSchema,
  gender: genderSchema,
  address: addressSchema,
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

export function SignUpIdentityForm() {
  const router = useRouter()
  const bankStep = useSignUpBufferStore((s) => s.bankStep)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: joiResolver(schema),
    mode: "onTouched",
    defaultValues: {
      bvn: "",
      nin: "",
      dateOfBirth: "",
      gender: undefined as unknown as UserGenders,
      address: "",
    },
  })

  const mutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      toast.success("Verified. Spinning up your virtual account…")
      const next = getNextStep("identity")
      if (next) router.push(next.path)
    },
    onError: (error) => {
      const message = constructErrorMessage(
        error as TApiErrorResponseType,
        "Couldn't verify your identity. Please try again.",
      )
      toast.error(message)
    },
  })

  async function onSubmit(values: FormValues) {
    if (!bankStep || !bankStep.category) {
      toast.error("Missing earlier details — let's restart from the bank step.")
      router.replace(SIGN_UP_STEPS[1].path)
      return
    }
    await mutation.mutateAsync({
      firstName: bankStep.firstName,
      lastName: bankStep.lastName,
      middleName: bankStep.middleName,
      phoneNumber: bankStep.phoneNumber,
      category: bankStep.category,
      dateOfBirth: new Date(values.dateOfBirth).toISOString(),
      gender: values.gender,
      address: values.address.trim(),
      bvn: values.bvn.trim(),
      ...(values.nin?.trim() ? { nin: values.nin.trim() } : {}),
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
      className="space-y-7"
    >
      <div className="space-y-2">
        <FieldLabel htmlFor="bvn">Bank Verification Number (BVN)</FieldLabel>
        <Controller
          name="bvn"
          control={control}
          render={({ field }) => (
            <NumericInput
              id="bvn"
              maxDigits={11}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-invalid={Boolean(errors.bvn)}
              placeholder="11-digit BVN"
              className="h-11 bg-card text-base"
            />
          )}
        />
        {errors.bvn ? (
          <p className="text-sm text-destructive">{errors.bvn.message}</p>
        ) : (
          <p className="text-sm text-text-3">
            We use NIBSS for verification. Your BVN is encrypted at rest.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="nin">
          National Identity Number (NIN){" "}
          <span className="ml-1 text-xs font-normal text-text-3">optional</span>
        </FieldLabel>
        <Controller
          name="nin"
          control={control}
          render={({ field }) => (
            <NumericInput
              id="nin"
              maxDigits={11}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-invalid={Boolean(errors.nin)}
              placeholder="11-digit NIN"
              className="h-11 bg-card text-base"
            />
          )}
        />
        {errors.nin && <p className="text-sm text-destructive">{errors.nin.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="dob">Date of birth</FieldLabel>
          <Input
            id="dob"
            type="date"
            aria-invalid={Boolean(errors.dateOfBirth)}
            className="h-11 bg-card text-base"
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-destructive">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="gender">Gender</FieldLabel>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <PillPicker
                options={GENDER_OPTIONS}
                value={field.value ?? null}
                onChange={field.onChange}
                ariaLabel="Select your gender"
                name="gender"
              />
            )}
          />
          {errors.gender && (
            <p className="text-sm text-destructive">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="address">Residential address</FieldLabel>
        <Input
          id="address"
          autoComplete="street-address"
          aria-invalid={Boolean(errors.address)}
          placeholder="12 Marina Road, Lagos"
          className="h-11 bg-card text-base"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address.message}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="h-11 rounded-full px-5 shadow-primary"
        >
          {submitting ? (
            <>
              Verifying <Spinner />
            </>
          ) : (
            <>
              Submit for verification <ArrowRight />
            </>
          )}
        </Button>
      </div>
    </motion.form>
  )
}
