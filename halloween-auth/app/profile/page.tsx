import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProfileForm } from "@/components/profile-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ProfilePage() {
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold halloween-text-glow">🔮 Profile Management</h1>
          <Button asChild variant="outline" className="spooky-border bg-transparent">
            <Link href="/protected">🏠 Back to Realm</Link>
          </Button>
        </div>

        <Card className="halloween-glow spooky-border">
          <CardHeader>
            <CardTitle className="halloween-text-glow">👻 Your Haunted Identity</CardTitle>
            <CardDescription>Customize your presence in the dark realm</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm
              user={data.user}
              profile={
                profile || {
                  id: data.user.id,
                  display_name: "Mysterious Soul",
                  bio: "A creature of the night...",
                  avatar_url: null,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                }
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
