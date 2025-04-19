"use client"

import ReCAPTCHA from "react-google-recaptcha"
import { useEffect } from "react"

interface RecaptchaWrapperProps {
  sitekey: string
  onChange: (token: string | null) => void
}

export default function RecaptchaWrapper({ sitekey, onChange }: RecaptchaWrapperProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-expect-error - ReCAPTCHA is loaded via script tag
      window.recaptchaCallback = onChange;
    }
  }, [onChange]);

  return (
    // @ts-ignore
    <ReCAPTCHA
      sitekey={sitekey}
      onChange={onChange}
    />
  )
} 