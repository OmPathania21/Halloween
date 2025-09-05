import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="halloween-glow spooky-border creepy-hover floating-ghost phantom-mist">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold halloween-text-glow mb-4 blood-drip">🎃 Haunted Auth</CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Enter if you dare... A mystical authentication realm awaits your presence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button asChild className="w-full halloween-glow creepy-hover text-lg py-6">
              <Link href="/auth/login">👻 Enter the Shadow Realm</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full spooky-border bg-transparent creepy-hover text-lg py-6 phantom-mist"
            >
              <Link href="/auth/sign-up">🦇 Join the Ethereal Covenant</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
