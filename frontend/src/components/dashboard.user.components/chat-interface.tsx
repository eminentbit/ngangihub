"use client";

import React, { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Send, X, ImageIcon, Paperclip, Smile } from "lucide-react";
import EmojiPicker from "./emoji-picker";
import { useAuthStore } from "../../store/create.auth.store";

// Exchange rate: 1 USD = approximately 600 CFA
// const CFA_EXCHANGE_RATE = 600;

// Replace with your actual Socket.IO server URL (e.g. NEXT_PUBLIC_SOCKET_URL)
const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:5000";

export interface Message {
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string; // we'll store ISO strings now
  isCurrentUser: boolean;
  attachment?: {
    type: "image" | "document";
    url: string;
    name: string;
  };
}

interface ChatInterfaceProps {
  groupId?: string;
  groupName: string;
  onClose: () => void;
  currentUser?: {
    id: string;
    name: string;
  };
}

const ChatInterface = ({ groupId, groupName, onClose }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useAuthStore();

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 1️⃣ Connect to Socket.IO on mount, join room, and handle incoming messages
  useEffect(() => {
    if (!groupId) return;

    // Create a new Socket.IO client
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      query: { groupId },
    });

    socketRef.current = socket;

    // When successfully connected, join the room:
    socket.on("connect", () => {
      socket.emit("joinRoom", { groupId, userId: user?.id });
    });

    // Listen for incoming messages from the server
    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          isCurrentUser: msg.senderId == user?._id,
        },
      ]);
    });

    // OPTIONAL: Fetch chat history via HTTP (or via socket) when first joining
    // If your backend emits a "chatHistory" event upon join, you can handle it:
    socket.on("chatHistory", (history: Message[]) => {
      setMessages(
        history.map((msg) => ({
          ...msg,
          isCurrentUser: msg.senderId == user?._id,
        }))
      );
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [groupId, user?._id, user?.id]);

  // 2️⃣ Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3️⃣ Handle sending a text message via Socket.IO
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !socketRef.current || !groupId) return;
    const name = user?.email.split("@")[0];

    console.log(name, user?.email);

    const newMsg: Message = {
      senderId: user?.id || "",
      senderName: name!,
      content: message,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    };

    // Emit to the server; the server should broadcast it back to everyone in the room
    socketRef.current.emit("sendMessage", {
      groupId,
      message: newMsg,
    });

    // Optimistically append to our own chat window
    setMessage("");
  };

  // 4️⃣ Handle file uploads (still via HTTP), then emit the resulting message via Socket.IO
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "document" | "image"
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !socketRef.current || !groupId) return;

    const file = files[0];
    setIsUploading(true);

    try {
      // Use FormData for uploading
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      formData.append("sender", user!.lastName);
      formData.append("groupId", groupId);

      // Upload to your /api/upload endpoint
      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const uploadedMessage: Message = await res.json();
      // Example server response:
      // {
      //   id: 123,
      //   sender: "John Doe",
      //   content: "Shared an image:",
      //   timestamp: "2025-06-04T12:34:56.789Z",
      //   isCurrentUser: true,
      //   attachment: {
      //     type: "image",
      //     url: "https://...",
      //     name: "meeting_photo.jpg"
      //   }
      // }

      // Emit the file‐message via socket so everyone sees it
      socketRef.current.emit("sendMessage", {
        groupId,
        message: uploadedMessage,
      });

      // Add it to our own chat window
      setMessages((prev) => [...prev, uploadedMessage]);
    } catch (err) {
      console.error("File upload error:", err);
    } finally {
      setIsUploading(false);
      // Clear file input value
      if (type === "document" && fileInputRef.current) {
        fileInputRef.current.value = "";
      } else if (type === "image" && imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{groupName} Chat</h2>
          <button
            type="button"
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.isCurrentUser
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {!msg.isCurrentUser && (
                  <p className="text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                    {msg.senderName}
                  </p>
                )}
                <p>{msg.content}</p>

                {msg.attachment && (
                  <div className="mt-2">
                    {msg.attachment.type === "image" ? (
                      <img
                        src={msg.attachment.url}
                        alt="Shared image"
                        className="rounded-md max-w-full max-h-48 object-cover"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-600 rounded-md">
                        <Paperclip className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                          {msg.attachment.name}
                        </span>
                        <a
                          href={msg.attachment.url}
                          className="text-xs text-indigo-600 dark:text-indigo-400 ml-auto"
                          download={msg.attachment.name}
                        >
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <p
                  className={`text-xs mt-1 ${
                    msg.isCurrentUser
                      ? "text-indigo-200"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t dark:border-gray-700 flex items-center gap-2 relative"
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileUpload(e, "document")}
            accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
            aria-label="Upload document"
            title="Upload document"
            disabled={isUploading}
          />
          <button
            type="button"
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Paperclip className="h-5 w-5" />
          </button>

          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            onChange={(e) => handleFileUpload(e, "image")}
            aria-label="Image upload"
            accept="image/*"
            disabled={isUploading}
          />
          <button
            type="button"
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full"
            onClick={() => imageInputRef.current?.click()}
            disabled={isUploading}
          >
            <ImageIcon className="h-5 w-5" />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isUploading ? "Uploading..." : "Type a message..."}
            className="flex-1 py-2 px-3 border dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isUploading}
          />

          <button
            type="button"
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={isUploading}
          >
            <Smile className="h-5 w-5" />
          </button>

          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={message.trim() === "" || isUploading}
          >
            <Send className="h-5 w-5" />
          </button>

          <EmojiPicker
            isOpen={showEmojiPicker}
            onEmojiSelect={handleEmojiSelect}
            onClose={() => setShowEmojiPicker(false)}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
