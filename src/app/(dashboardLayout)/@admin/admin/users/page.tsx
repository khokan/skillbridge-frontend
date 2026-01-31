"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminUsers, setUserBanned } from "@/actions/admin.actions";

type User = { id: string; name: string; email: string; role: string; isBanned: boolean };

export default function AdminUsersPage() {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const { data, error } = await getAdminUsers();
      if (error) throw error;
      setItems(data?.data?.items ?? []);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleBan = async (u: User) => {
    try {
      setLoading(true);
      const { error } = await setUserBanned(u.id, !u.isBanned);
      if (error) throw error;
      toast.success(!u.isBanned ? "User banned" : "User unbanned");
      await load();
    } catch (e: any) {
      toast.error(e?.message ?? "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>

      {items.map((u) => (
        <Card key={u.id} className="rounded-2xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-muted-foreground">{u.email}</div>
              <div className="text-xs mt-1">{u.role} • {u.isBanned ? "BANNED" : "ACTIVE"}</div>
            </div>

            <Button
              variant={u.isBanned ? "outline" : "destructive"}
              disabled={loading}
              onClick={() => toggleBan(u)}
            >
              {u.isBanned ? "Unban" : "Ban"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
