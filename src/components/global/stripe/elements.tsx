"use client"
import { useStripeElements } from "@/hooks/payment"
import { Elements } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"

type StripeElementsProps = {
  children: React.ReactNode
}

export const StripeElements = ({ children }: StripeElementsProps) => {
  const { StripePromise } = useStripeElements()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    const initializeStripe = async () => {
      const promise = await StripePromise()
      if (promise) {
        setClientSecret(promise)
      }
    }
    initializeStripe()
  }, [StripePromise])

  if (!clientSecret) {
    return null // or a loading state
  }

  return <Elements stripe={clientSecret}>{children}</Elements>
}
