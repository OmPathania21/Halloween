"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LogoutPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleLogout = async () => {
      await supabase.auth.signOut()
      // Small delay for dramatic effect
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }

    handleLogout()
  }, [router, supabase])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="halloween-glow spooky-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl halloween-text-glow">👋 Farewell, Dark Soul</CardTitle>
            <CardDescription>You are leaving the haunted realm...</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div className="text-6xl animate-pulse">🌙</div>
              <p className="text-muted-foreground">Your session is ending. You will be redirected to safety shortly.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
