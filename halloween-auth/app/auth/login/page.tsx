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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/protected`,
        },
      })
      if (error) throw error
      router.push("/protected")
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
            <CardTitle className="text-2xl halloween-text-glow">👻 Enter the Darkness</CardTitle>
            <CardDescription>Sign in to access the haunted realm</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="Enter your secret spell..."
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="spooky-border bg-input text-foreground"
                />
              </div>
              {error && (
                <div className="text-destructive text-sm bg-destructive/10 p-2 rounded spooky-border">🚫 {error}</div>
              )}
              <Button type="submit" className="w-full halloween-glow" disabled={isLoading}>
                {isLoading ? "🔮 Summoning..." : "🎃 Sign In"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">New to the haunted realm? </span>
              <Link href="/auth/sign-up" className="text-primary hover:text-primary/80 underline underline-offset-4">
                Join the darkness
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
