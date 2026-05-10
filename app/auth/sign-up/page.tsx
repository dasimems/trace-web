import { redirect } from "next/navigation"

import { SIGN_UP_STEPS } from "@/components/auth/sign-up-steps"

export default function SignUpEntryPage() {
  redirect(SIGN_UP_STEPS[0].path)
}
