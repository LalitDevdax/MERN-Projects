import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import avatars from "../../public/avatars"; // Ensure this is an array of default avatars

const ProfilePage = () => {
  const { authUser, isCheckingAuth, updateProfile, isUpdatingProfile } =
    useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  // Helper to fetch avatar from localStorage or generate one
  const getAvatar = () => {
    const storedAvatar = localStorage.getItem("profileAvatar");
    if (storedAvatar) {
      return storedAvatar; // Return stored avatar
    } else {
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      localStorage.setItem("profileAvatar", randomAvatar); // Save to localStorage
      return randomAvatar;
    }
  };

  useEffect(() => {
    if (!isCheckingAuth) {
      if (authUser?.profilePic) {
        setSelectedImg(authUser.profilePic);
      } else {
        setSelectedImg(getAvatar()); // Fetch or generate an avatar only once
      }
    }
  }, [authUser, isCheckingAuth]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image); // Show the uploaded image as preview
      await updateProfile({ profilePic: base64Image }); // Update profile with the new image
    };
  };

  const handleCloseProfile = () => {
    navigate("/"); // Redirect to the home page when the close button is clicked
  };

  return (
    <div className="relative h-screen">
      {/* Background blur */}
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md z-10"></div>

      {/* Profile container */}
      <div className="h-screen flex justify-center items-center relative z-20">
        <div className="w-full max-w-6xl mx-auto p-4 py-8 space-y-8 bg-zinc-900 rounded-xl shadow-lg relative">
          <button
            onClick={handleCloseProfile}
            className="absolute top-4 right-4 text-white hover:text-red-500"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 gap-8">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center md:w-1/3 space-y-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || getAvatar()}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-base-content p-2 rounded-full cursor-pointer transition-all duration-200 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-zinc-400">
                {isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* Profile Details Section */}
            <div className="md:w-2/3 space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {authUser?.fullName}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {authUser?.email}
                </p>
              </div>

              <div className="mt-6 bg-base-300 rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">
                  Account Information
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                    <span>Member Since</span>
                    <span>{authUser.createdAt?.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Account Status</span>
                    <span className="text-green-500">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;