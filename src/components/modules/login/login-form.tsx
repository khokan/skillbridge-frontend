
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth";


export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") ?? "/dashboard";

  async function onSubmit(formData: FormData) {
    setLoading(true);
    try {
      const email = String(formData.get("email") ?? "");
      const password = String(formData.get("password") ?? "");

     const {data, error} = await  authClient.signIn.email({email, password});
     console.log({data, error});

     if(error) {
        toast.error(`Login failed: ${error.message}`);
        return;
     }
      toast.success("Welcome back!");
      router.push(next);
      router.refresh();

    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-6xl justify-center px-4 py-14">
      <Card className="w-full max-w-md rounded-2xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Access your dashboard and bookings.</p>

          <form action={onSubmit} className="mt-6 space-y-3">
            <Input name="email" placeholder="Email" type="email" required />
            <Input name="password" placeholder="Password" type="password" required />
            <Button className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
