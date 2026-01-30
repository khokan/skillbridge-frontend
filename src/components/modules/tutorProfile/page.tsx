"use client";

import { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  X, 
  Loader2,
  User,
  DollarSign,
  Languages,
  FileText
} from "lucide-react";

import {
  getTutorProfile,
  createTutorProfile,
  updateTutorProfile,
  deleteTutorProfile,
} from "@/actions/tutorProfile.actions";

interface TutorProfile {
  id: string;
  bio: string;
  languages: string[];
  hourlyRate: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export default function TutorProfilePage() {
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    bio: "",
    languages: "",
    hourlyRate: "",
  });

  const [errors, setErrors] = useState({
    bio: "",
    languages: "",
    hourlyRate: "",
  });

  // Load profile data
  useEffect(() => {
    loadProfile();
  }, []);

const loadProfile = async () => {
  try {
    setLoading(true);
    const { data, error } = await getTutorProfile();

    console.log("API Response:", { data, error, hasData: !!data, hasError: !!error });

    if (error) {
      // Show error only if it's not a "no profile" situation
      if (!error.message?.toLowerCase().includes("not found")) {
        toast.error(error.message || "Failed to load profile");
      }
      setProfile(null);
      return;
    }

    // Set profile even if data is null (means no profile exists)
    if (data) {
      console.log("Setting profile data:", data);
      setProfile(data.data as TutorProfile);
    } else {
      console.log("No profile data, setting to null");
      setProfile(null);
    }
  } catch (error: any) {
    console.error("Unexpected error:", error);
    toast.error("An unexpected error occurred");
    setProfile(null);
  } finally {
    setLoading(false);
  }
};

  // Open edit dialog
  const handleEdit = () => {
    if (!profile) return;
    
    setForm({
      bio: profile.bio || "",
      languages: profile.languages?.join(", ") || "",
      hourlyRate: profile.hourlyRate?.toString() || "",
    });
    setErrors({ bio: "", languages: "", hourlyRate: "" });
    setIsDialogOpen(true);
  };

  // Open create dialog
  const handleCreate = () => {
    setForm({
      bio: "",
      languages: "",
      hourlyRate: "",
    });
    setErrors({ bio: "", languages: "", hourlyRate: "" });
    setIsDialogOpen(true);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = { bio: "", languages: "", hourlyRate: "" };
    let isValid = true;

    if (!form.bio.trim()) {
      newErrors.bio = "Bio is required";
      isValid = false;
    }

    if (!form.languages.trim()) {
      newErrors.languages = "At least one language is required";
      isValid = false;
    }

    const rate = parseFloat(form.hourlyRate);
    if (!form.hourlyRate || isNaN(rate) || rate <= 0) {
      newErrors.hourlyRate = "Valid hourly rate is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Save profile
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsSaving(true);

      const payload = {
        bio: form.bio.trim(),
        languages: form.languages.split(",").map(s => s.trim()).filter(Boolean),
        hourlyRate: parseFloat(form.hourlyRate),
      };

      const res = profile 
        ? await updateTutorProfile(payload)
        : await createTutorProfile(payload);

    if (res?.error) throw new Error(res.error.message || "An error occurred");

      toast.success(profile ? "Profile updated successfully" : "Profile created successfully");
      setIsDialogOpen(false);
      await loadProfile(); // Refresh data
    } catch (error: any) {
      toast.error(error.message || "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete profile
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteTutorProfile();

    if (res?.error) throw new Error(res.error.message || "An error occurred");

      toast.success("Profile deleted successfully");
      setIsDeleteDialogOpen(false);
      setProfile(null);
    } catch (error: any) {
      toast.error(error.message || "Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tutor Profile</h1>
          <p className="text-muted-foreground">
            Manage your tutor profile information
          </p>
        </div>
        
        {!profile ? (
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Profile
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    tutor profile and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete Profile"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      {/* Profile Table */}
      {profile ? (
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>
              Your current tutor profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      Bio
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-2xl whitespace-pre-wrap">
                      {profile.bio || "Not provided"}
                    </div>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Languages className="mr-2 h-4 w-4 text-muted-foreground" />
                      Languages / Subjects
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages?.map((language, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {language}
                        </Badge>
                      )) || "Not specified"}
                    </div>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                      Hourly Rate
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-lg font-semibold">
                      ${profile.hourlyRate?.toFixed(2)}/hr
                    </Badge>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      User ID
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {profile.userId || "N/A"}
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium">Created At</TableCell>
                  <TableCell>{formatDate(profile.createdAt)}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium">Updated At</TableCell>
                  <TableCell>{formatDate(profile.updatedAt)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Profile Found</h3>
              <p className="text-muted-foreground mb-6">
                You haven&apos;t created a tutor profile yet. Create one to start offering tutoring services.
              </p>
              <Button onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Create Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {profile ? "Edit Tutor Profile" : "Create Tutor Profile"}
            </DialogTitle>
            <DialogDescription>
              {profile 
                ? "Update your tutor profile information below."
                : "Fill in your tutor profile information to get started."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Bio Field */}
            <div className="space-y-2">
              <Label htmlFor="bio">
                Bio <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell students about your teaching experience, qualifications, and approach..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className={errors.bio ? "border-destructive" : ""}
                rows={4}
              />
              {errors.bio && (
                <p className="text-sm text-destructive">{errors.bio}</p>
              )}
            </div>

            {/* Languages Field */}
            <div className="space-y-2">
              <Label htmlFor="languages">
                Languages / Subjects <span className="text-destructive">*</span>
              </Label>
              <Input
                id="languages"
                placeholder="e.g., Math, Physics, English, Programming"
                value={form.languages}
                onChange={(e) => setForm({ ...form, languages: e.target.value })}
                className={errors.languages ? "border-destructive" : ""}
              />
              {errors.languages && (
                <p className="text-sm text-destructive">{errors.languages}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Separate multiple subjects with commas
              </p>
            </div>

            {/* Hourly Rate Field */}
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">
                Hourly Rate ($) <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="hourlyRate"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="e.g., 25.00"
                  value={form.hourlyRate}
                  onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
                  className={`pl-9 ${errors.hourlyRate ? "border-destructive" : ""}`}
                />
              </div>
              {errors.hourlyRate && (
                <p className="text-sm text-destructive">{errors.hourlyRate}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSaving}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {profile ? "Update Profile" : "Create Profile"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Card (Optional) */}
      {profile && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hourly Rate</p>
                  <p className="text-2xl font-bold">${profile.hourlyRate?.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subjects</p>
                  <p className="text-2xl font-bold">{profile.languages?.length || 0}</p>
                </div>
                <Languages className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile Status</p>
                  <p className="text-2xl font-bold text-green-600">Active</p>
                </div>
                <User className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}