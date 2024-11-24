import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";

// Utility function to format message time
const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);

  // Format time as 'hh:mm AM/PM'
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-200px)]">
        {isMessagesLoading ? (
          <MessageSkeleton />
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.senderId === authUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
              ref={messageEndRef}
            >
              <div
                className={`flex items-end gap-3 ${
                  message.senderId === authUser._id ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full border border-base-300 overflow-hidden ${
                    message.senderId === authUser._id
                      ? "pointer-events-none relative group"
                      : ""
                  }`}
                >
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/happy.png"
                        : selectedUser.profilePic || "/happy.png"
                    }
                    alt="profile pic"
                  />

                  {/* Tooltip for Time (visible on hover/swipe) */}
                  {message.senderId === authUser._id && (
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatMessageTime(message.createdAt)}
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] p-3 rounded-lg shadow-sm text-sm ${
                    message.senderId === authUser._id
                      ? "bg-primary text-primary-content"
                      : "bg-base-200 text-base-content"
                  }`}
                >
                  {/* Attachment (Image) */}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="rounded-md mb-2 max-w-full max-h-[200px] object-contain"
                    />
                  )}
                  {/* Text */}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-base-300 overflow-y-hidden sticky bottom-0 bg-base-100 z-10">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
