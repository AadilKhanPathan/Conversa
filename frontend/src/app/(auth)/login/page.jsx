"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardFooter,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@base-ui/react";
import api from "@/lib/axios";
import { Input } from "@base-ui/react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Loader2 } from "lucide-react";

function LoginPage() {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(email, password);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      if (res.data.success) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950 bg-[url('/login-bg2.jpg')] bg-cover bg-center h-screen w-full">
      <Card className="w-full max-w-md border border-black bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 rounded-none">
        <CardHeader className="space-y-1 ml-1 sm:text-left">
          <CardTitle className="text-2xl font-bold tracking-tight text-[#025469] dark:text-zinc-50">
            Log in
          </CardTitle>
          <CardDescription className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>

        <form onSubmit={login}>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="aadilkhan@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="w-full rounded border border-zinc-300 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:focus:ring-zinc-100"
              />
            </div>

            {/* ENTER PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Set Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="w-full rounded border border-zinc-300 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:focus:ring-zinc-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-2 flex flex-col space-y-4">
            {loading ? (
              <Button
                type="submit"
                disabled
                className="flex items-center justify-center w-full rounded bg-[#025469] py-2.5 text-sm font-semibold text-white shadow opacity-70 cursor-not-allowed"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Logging in...</span>
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full rounded bg-[#025469] py-2.5 text-sm font-semibold text-white shadow hover:bg-[#025469]/70 active:scale-[0.99] transition-all dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer"
              >
                Log in
              </Button>
            )}

            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-[#025469] underline-offset-4 hover:underline dark:text-zinc-50"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
