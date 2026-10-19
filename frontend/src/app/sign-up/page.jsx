import { SignInForm } from "@/components/signin-form"

export default function SignInPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[url('/wallpaper2.jpg')] md:bg-none md:bg-muted p-6 md:p-10  bg-cover bg-no-repeat">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignInForm />
      </div>
    </div>
  )
}
