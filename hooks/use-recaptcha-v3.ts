"use client"

import { useEffect, useState, useCallback } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      enterprise: {
        ready: (callback: () => void) => void
        execute: (siteKey: string, options: { action: string }) => Promise<string>
      }
    }
  }
}

export function useRecaptchaV3(siteKey: string) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if Enterprise script is already loaded
    if (window.grecaptcha?.enterprise) {
      setIsLoaded(true)
      return
    }

    // Check if script is already in the document
    const existingScript = document.querySelector(
      `script[src*="recaptcha/enterprise.js"]`
    )
    if (existingScript) {
      // Wait for it to load
      existingScript.addEventListener('load', () => {
        if (window.grecaptcha?.enterprise) {
          window.grecaptcha.enterprise.ready(() => {
            setIsLoaded(true)
            setIsLoading(false)
          })
        }
      })
      return
    }

    // Load the reCAPTCHA Enterprise script
    setIsLoading(true)
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`
    script.async = true
    script.defer = true

    script.onload = () => {
      if (window.grecaptcha?.enterprise) {
        window.grecaptcha.enterprise.ready(() => {
          setIsLoaded(true)
          setIsLoading(false)
        })
      }
    }

    script.onerror = () => {
      console.error('Failed to load reCAPTCHA Enterprise script')
      setIsLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const scriptToRemove = document.querySelector(
        `script[src*="recaptcha/enterprise.js"]`
      )
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [siteKey])

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!isLoaded || !window.grecaptcha?.enterprise) {
        console.error('reCAPTCHA Enterprise not loaded yet')
        return null
      }

      try {
        const token = await window.grecaptcha.enterprise.execute(siteKey, { action })
        return token
      } catch (error) {
        console.error('Error executing reCAPTCHA:', error)
        return null
      }
    },
    [isLoaded, siteKey]
  )

  return { executeRecaptcha, isLoaded, isLoading }
}
