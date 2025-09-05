"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/protected`,
          data: {
            display_name: displayName || "Mysterious Soul",
            bio: "A new creature of the night...",
          },
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card className="halloween-glow spooky-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl halloween-text-glow">🦇 Join the Darkness</CardTitle>
            <CardDescription>Create your haunted account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-foreground">
                  Display Name
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Your spooky alias..."
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="spooky-border bg-input text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@haunted.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="spooky-border bg-input text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create your secret spell..."
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="spooky-border bg-input text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repeatPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="repeatPassword"
                  type="password"
                  placeholder="Repeat your secret spell..."
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="spooky-border bg-input text-foreground"
                />
              </div>
              {error && (
                <div className="text-destructive text-sm bg-destructive/10 p-2 rounded spooky-border">🚫 {error}</div>
              )}
              <Button type="submit" className="w-full halloween-glow" disabled={isLoading}>
                {isLoading ? "🔮 Conjuring Account..." : "🎃 Join the Realm"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already haunting these halls? </span>
              <Link href="/auth/login" className="text-primary hover:text-primary/80 underline underline-offset-4">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
