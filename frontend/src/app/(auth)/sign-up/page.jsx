"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardFooter,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Button } from "@base-ui/react";
import { Input } from "@base-ui/react";
import Link from "next/link";
import api from "@/lib/axios";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    try {
      console.log(username, email, password);
      const res = await api.post(`/auth/sign-up`, {
        username,
        email,
        password,
      });

      console.log(res.data);

        if(res.data.success){
        router.push("/login");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950 h-screen w-full bg-[url('/login-bg2.jpg')] bg-cover bg-center bg-no-repeat"
    >
      {/* <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
        continue with Google
      </Button> */}
      <Card className=" w-full rounded max-w-md border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <CardHeader className="space-y-1 text-center sm:text-left">
          <CardTitle className="text-2xl font-bold tracking-tight text-[#025469] dark:text-zinc-50">
            Hello ! Register to get started
          </CardTitle>
          <CardDescription className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your details below
          </CardDescription>
        </CardHeader>

        <form onSubmit={register}>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                // autoComplete="username"
                placeholder="eg. Aadil Khan"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                className="w-full rounded border border-zinc-300 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:focus:ring-zinc-100"
              />
            </div>

         

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
                autoComplete="email"
                placeholder="eg. aadilkhan@gmail.com"
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
                Password
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

            {/* confirm password, i will work on it later */}
            {/* <div className="flex flex-col gap-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:focus:ring-zinc-100"
              />
            </div> */}
          </CardContent>

          <CardFooter className="mt-2 flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full rounded bg-[#025469] py-2.5 text-sm font-semibold text-white shadow transition-all hover:bg-[#025469]/70 active:scale-[0.99] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer"
            >
              Sign up
            </Button>

            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-[#025469] underline-offset-4 hover:underline dark:text-zinc-50"
              >
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default SignUpPage;
