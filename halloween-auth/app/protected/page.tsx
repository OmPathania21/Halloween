import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="halloween-glow spooky-border">
          <CardHeader>
            <CardTitle className="halloween-text-glow">🎃 Welcome to the Haunted Realm</CardTitle>
            <CardDescription>You have successfully entered the darkness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-primary">👻 Spirit Identity</h3>
                <p className="text-muted-foreground">{data.user.email}</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary">🦇 Display Name</h3>
                <p className="text-muted-foreground">{profile?.display_name || "Mysterious Soul"}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-primary">📜 Bio</h3>
              <p className="text-muted-foreground">{profile?.bio || "A creature of the night..."}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild className="halloween-glow">
                <Link href="/profile">🔮 Manage Profile</Link>
              </Button>
              <Button asChild variant="outline" className="spooky-border bg-transparent">
                <Link href="/auth/logout">🚪 Exit the Realm</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
