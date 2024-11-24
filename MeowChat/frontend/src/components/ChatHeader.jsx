import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Return early if no user is selected
  if (!selectedUser) {
    return null; // Or display a placeholder or error message if preferred
  }

  // Handle user status based on onlineUsers
  const isUserOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-4 border-b border-base-300 bg-base-100 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section: User Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden border border-base-300">
            <img
              src={selectedUser.profilePic || "/happy.png"} // Default image fallback
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-semibold text-base text-base-content">
              {selectedUser.fullName}
            </h3>
            <p
              className={`text-sm ${
                isUserOnline ? "text-green-500" : "text-base-content/70"
              }`}
            >
              {isUserOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right Section: Close Button */}
        <button
          onClick={() => setSelectedUser(null)} // Close the chat when clicked
          className="p-2 rounded-md hover:bg-base-200 transition"
          aria-label="Close Chat"
        >
          <X className="w-5 h-5 text-base-content" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
