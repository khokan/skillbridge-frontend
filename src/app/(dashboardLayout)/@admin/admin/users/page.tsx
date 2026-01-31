"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAdminUsers, setUserStatus } from "@/actions/admin.actions";

type UserItem = {
  id: string;
  name: string;
  email: string;
  role?: string | null;
  status?: string | null;
  emailVerified: boolean;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [items, setItems] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const { data, error } = await getAdminUsers();
      if (error) throw error;

      setItems((data?.data?.items ?? []) as UserItem[]);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleBan = async (u: UserItem) => {
    try {
      setLoading(true);

      const current = (u.status ?? "ACTIVE").toUpperCase();
      const next = current === "BANNED" ? "ACTIVE" : "BANNED";

      const { error } = await setUserStatus(u.id, next as "ACTIVE" | "BANNED");
      if (error) throw error;

      toast.success(next === "BANNED" ? "User banned" : "User unbanned");
      await load();
    } catch (e: any) {
      toast.error(e?.message ?? "Update failed");
    } finally {
      setLoading(false);
    }
  };

  console.log(items)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      {items.map((u) => {
        const status = (u.status ?? "ACTIVE").toUpperCase();
        const isBanned = status === "BANNED";

        return (
          <Card key={u.id} className="rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">{u.name}</div>
                <div className="text-sm text-muted-foreground">{u.email}</div>
                <div className="text-xs text-muted-foreground">
                  Role: {u.role ?? "USER"} • Status: {status}
                </div>
              </div>

              <Button
                variant={isBanned ? "outline" : "destructive"}
                disabled={loading}
                onClick={() => toggleBan(u)}
              >
                {isBanned ? "Unban" : "Ban"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
