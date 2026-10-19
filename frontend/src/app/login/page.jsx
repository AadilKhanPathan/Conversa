import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[url('/wallpaper.jpg')] md:bg-none md:bg-muted p-6 md:p-10  bg-cover bg-no-repeat">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
