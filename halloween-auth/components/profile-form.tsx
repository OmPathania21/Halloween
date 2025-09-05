"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

interface ProfileFormProps {
  user: User
  profile: Profile
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile.display_name || "")
  const [bio, setBio] = useState(profile.bio || "")
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "")
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  // Auto-save functionality with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (displayName !== profile.display_name || bio !== profile.bio || avatarUrl !== profile.avatar_url) {
        handleAutoSave()
      }
    }, 2000) // Auto-save after 2 seconds of no changes

    return () => clearTimeout(timeoutId)
  }, [displayName, bio, avatarUrl, profile])

  const handleAutoSave = async () => {
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        display_name: displayName || null,
        bio: bio || null,
        avatar_url: avatarUrl || null,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      setLastSaved(new Date())
    } catch (error) {
      console.error("Auto-save error:", error)
    }
  }

  const handleManualSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        display_name: displayName || null,
        bio: bio || null,
        avatar_url: avatarUrl || null,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      setLastSaved(new Date())
      toast({
        title: "🎃 Profile Updated!",
        description: "Your haunted identity has been saved to the realm.",
      })
    } catch (error) {
      toast({
        title: "🚫 Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleManualSave} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            📧 Email Address (Cannot be changed)
          </Label>
          <Input
            id="email"
            type="email"
            value={user.email || ""}
            disabled
            className="spooky-border bg-muted text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="displayName" className="text-foreground">
            👻 Display Name
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
          <Label htmlFor="bio" className="text-foreground">
            📜 Bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell us about your haunted existence..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="spooky-border bg-input text-foreground min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="avatarUrl" className="text-foreground">
            🖼️ Avatar URL (Optional)
          </Label>
          <Input
            id="avatarUrl"
            type="url"
            placeholder="https://example.com/your-spooky-avatar.jpg"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="spooky-border bg-input text-foreground"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            {lastSaved ? (
              <span>✅ Last saved: {lastSaved.toLocaleTimeString()}</span>
            ) : (
              <span>💾 Auto-save enabled</span>
            )}
          </div>
          <Button type="submit" className="halloween-glow" disabled={isLoading}>
            {isLoading ? "🔮 Saving..." : "💾 Save Changes"}
          </Button>
        </div>
      </form>

      {/* Profile Preview */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-primary mb-4">🔍 Profile Preview</h3>
        <Card className="spooky-border bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              {avatarUrl ? (
                <img
                  src={avatarUrl || "/placeholder.svg"}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover spooky-border"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center spooky-border">
                  <span className="text-2xl">👻</span>
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{displayName || "Mysterious Soul"}</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground mt-2">{bio || "A creature of the night..."}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
