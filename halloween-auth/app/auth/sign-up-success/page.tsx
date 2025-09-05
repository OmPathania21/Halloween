import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="halloween-glow spooky-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl halloween-text-glow">🎉 Welcome to the Darkness!</CardTitle>
            <CardDescription>Your haunted account has been created</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-muted-foreground">
              <p>📧 Check your email for a confirmation link.</p>
              <p>Once confirmed, you can access the haunted realm!</p>
            </div>
            <Button asChild className="w-full halloween-glow">
              <Link href="/auth/login">👻 Return to Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
