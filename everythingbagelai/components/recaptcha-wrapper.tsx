"use client"

import ReCAPTCHA from "react-google-recaptcha"

interface RecaptchaWrapperProps {
  sitekey: string
  onChange: (token: string | null) => void
}

export default function RecaptchaWrapper({ sitekey, onChange }: RecaptchaWrapperProps) {
  return (
    // @ts-ignore
    <ReCAPTCHA
      sitekey={sitekey}
      onChange={onChange}
    />
  )
} 