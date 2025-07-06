import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Profile = () => {
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    bio: user.bio || "",
    joinDate: user.joinDate || new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{profileData.name || "User"}</h3>
                  <p className="text-gray-600 mb-4">{profileData.email}</p>
                  <Badge className="bg-blue-100 text-blue-800">Verified Member</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Member Since</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                      placeholder="City, State, India"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
