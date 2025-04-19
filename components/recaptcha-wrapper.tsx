"use client"

import ReCAPTCHA from "react-google-recaptcha"
import { useEffect } from "react"

interface RecaptchaWrapperProps {
  sitekey: string
  onChange: (token: string | null) => void
}

declare global {
  interface Window {
    recaptchaCallback?: (token: string | null) => void
  }
}

export default function RecaptchaWrapper({ sitekey, onChange }: RecaptchaWrapperProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.recaptchaCallback = onChange;
    }
  }, [onChange]);

  return (
    <ReCAPTCHA
      sitekey={sitekey}
      onChange={onChange}
    />
  )
} 