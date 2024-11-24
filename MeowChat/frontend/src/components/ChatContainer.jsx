import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";

// Utility function to format message time
const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
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
    if (selectedUser?._id) {
      getMessages(selectedUser._id); // Fetch messages only if a user is selected
    }
  }, [selectedUser, getMessages]); // Only call getMessages when selectedUser changes

  useEffect(() => {
    // Scroll to the latest message when messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Re-run when messages are updated

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-100px)]">
        {isMessagesLoading ? (
          <MessageSkeleton />
        ) : messages.length === 0 ? (
          <div className="text-center text-base text-gray-500">
            No messages yet
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.senderId === authUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
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
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
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
        <div ref={messageEndRef} />{" "}
        {/* This is the reference to the last message */}
      </div>

      {/* Message Input */}
      <div className="border-t pt-5 border-base-300">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
