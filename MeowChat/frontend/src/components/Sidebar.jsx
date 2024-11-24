import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SideBarSkeleton";
import { PawPrint } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    getMessages,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Fetch users only once when component mounts
  useEffect(() => {
    if (users.length === 0) {
      getUsers().catch((err) => console.error("Error fetching users:", err)); // Catch any error
    }
  }, [getUsers, users.length]);

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]); // Only fetch when selectedUser changes

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full lg:w-full border-r border-base-300 flex flex-col transition-all duration-200 box-border">
      <div className="border-b-2 border-gray-400 w-full p-5 box-border">
        <div className="flex items-center gap-2">
          <PawPrint className="size-6" />
          <span className="font-medium lg:block">Meow User's</span>
        </div>
      </div>
      <div className="border-b-1 border-gray-400 w-full" />
      <div className="overflow-y-auto w-full py-3 box-border custom-scrollbar">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)} // Use the updated function to set selected user
            className={`w-full p-3 flex items-center gap-3 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-primary/50 text-white"
                : "hover:bg-base-300"
            }`}
          >
            <div className="relative flex items-center gap-3 w-full">
              <div className="relative">
                <img
                  src={user.profilePic || "/happy.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
              </div>
              <div className="text-left lg:block">
                <div className="font-medium">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
