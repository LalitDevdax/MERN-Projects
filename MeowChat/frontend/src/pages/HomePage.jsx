import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useEffect } from "react";

const HomePage = () => {
  const { selectedUser, getUsers } = useChatStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="overflow-y-hidden h-screen bg-base-200 flex justify-center items-center pt-12 px-1">
      <div className="w-full max-w-6xl h-[calc(100vh-8rem)] flex gap-x-6 gap-y-6">
        <div className="w-full h-full max-w-[300px] bg-base-300 p-4 rounded-lg">
          <Sidebar />
        </div>

        <div className="w-full h-full overflow-hidden bg-base-100 p-1 rounded-lg flex flex-col">
          {/* If no user is selected, show the "No Chat Selected" screen */}
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
