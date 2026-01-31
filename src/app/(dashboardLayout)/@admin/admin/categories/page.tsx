"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminCategories, createCategory, updateCategory, deleteCategory } from "@/actions/admin.actions";

type Category = { id: string; name: string; slug: string; isActive: boolean };

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", slug: "" });

  const load = async () => {
    try {
      setLoading(true);
      const { data, error } = await getAdminCategories();
      if (error) throw error;
      setItems(data?.data?.items ?? []);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    try {
      setLoading(true);
      if (!form.name.trim()) throw new Error("Name is required");
      const { error } = await createCategory({ name: form.name, slug: form.slug || undefined });
      if (error) throw error;
      toast.success("Category created");
      setForm({ name: "", slug: "" });
      await load();
    } catch (e: any) {
      toast.error(e?.message ?? "Create failed");
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (c: Category) => {
    try {
      setLoading(true);
      const { error } = await updateCategory(c.id, { isActive: !c.isActive });
      if (error) throw error;
      toast.success("Category updated");
      await load();
    } catch (e: any) {
      toast.error(e?.message ?? "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await deleteCategory(id);
      if (error) throw error;
      toast.success("Category deleted");
      await load();
    } catch (e: any) {
      toast.error(e?.message ?? "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Categories</h1>

      <Card className="rounded-2xl">
        <CardContent className="p-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Slug (optional)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
          <Button onClick={add} disabled={loading}>
            Add Category
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {items.map((c) => (
          <Card key={c.id} className="rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.slug}</div>
                <div className="text-xs mt-1">{c.isActive ? "ACTIVE" : "INACTIVE"}</div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" disabled={loading} onClick={() => toggle(c)}>
                  {c.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button variant="destructive" disabled={loading} onClick={() => remove(c.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
