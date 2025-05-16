"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send, X, ImageIcon, Paperclip, Smile } from "lucide-react";
import EmojiPicker from "./emoji-picker";

// Exchange rate: 1 USD = approximately 600 CFA
const CFA_EXCHANGE_RATE = 600;

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
  attachment?: {
    type: "image" | "document";
    url: string;
    name: string;
  };
}

interface ChatInterfaceProps {
  groupId: number;
  groupName: string;
  onClose: () => void;
}

const ChatInterface = ({ groupId, groupName, onClose }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Simulate initial messages
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: 1,
        sender: "John Doe",
        content: "Hello everyone! Welcome to the group chat.",
        timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
        isCurrentUser: true,
      },
      {
        id: 2,
        sender: "Sarah Johnson",
        content: "Thanks for adding me to the group!",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        isCurrentUser: false,
      },
      {
        id: 3,
        sender: "Michael Brown",
        content: `I've sent my contribution of ${(
          250 * CFA_EXCHANGE_RATE
        ).toLocaleString()} CFA.`,
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        isCurrentUser: false,
      },
      {
        id: 4,
        sender: "John Doe",
        content: "Great! I'll confirm once I receive it.",
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        isCurrentUser: true,
      },
      {
        id: 5,
        sender: "Sarah Johnson",
        content: "I've attached the receipt for my payment.",
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
        isCurrentUser: false,
        attachment: {
          type: "document",
          url: "#",
          name: "payment_receipt.pdf",
        },
      },
      {
        id: 6,
        sender: "John Doe",
        content: "Here's a photo from our last meeting:",
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        isCurrentUser: true,
        attachment: {
          type: "image",
          url: "/placeholder.svg?height=200&width=300",
          name: "meeting_photo.jpg",
        },
      },
    ];

    setMessages(initialMessages);
  }, [groupId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "John Doe",
      content: message,
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate response after 1 second
    if (messages.length % 3 === 0) {
      setTimeout(() => {
        const responseMessage: Message = {
          id: messages.length + 2,
          sender: "Sarah Johnson",
          content: "Thanks for the update!",
          timestamp: new Date(),
          isCurrentUser: false,
        };
        setMessages((prev) => [...prev, responseMessage]);
      }, 1000);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "document" | "image"
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);

    // Simulate file upload
    setTimeout(() => {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "John Doe",
        content:
          type === "image"
            ? "Shared an image:"
            : `Shared a document: ${file.name}`,
        timestamp: new Date(),
        isCurrentUser: true,
        attachment: {
          type,
          url: type === "image" ? "/placeholder.svg?height=200&width=300" : "#",
          name: file.name,
        },
      };

      setMessages([...messages, newMessage]);
      setIsUploading(false);

      // Clear the file input
      if (type === "document" && fileInputRef.current) {
        fileInputRef.current.value = "";
      } else if (type === "image" && imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{groupName} Chat</h2>
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
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
                    {msg.sender}
                  </p>
                )}
                <p>{msg.content}</p>

                {msg.attachment && (
                  <div className="mt-2">
                    {msg.attachment.type === "image" ? (
                      <img
                        src={msg.attachment.url || "/placeholder.svg"}
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
                          href="#"
                          className="text-xs text-indigo-600 dark:text-indigo-400 ml-auto"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Downloading ${msg.attachment?.name}...`);
                          }}
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
