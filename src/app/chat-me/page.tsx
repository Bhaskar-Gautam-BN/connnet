"use client";

import { Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { io } from "socket.io-client";


interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: string; // Use string for serializable timestamps
}

interface userDetails {
  name: string;
}
  const endPoint = "http://localhost:3001";
  const socket = io(endPoint);

const Page = () => {
  const [userDetails, setUserDetails] = useState<userDetails | undefined | null>();
  const [id,setId]=useState<string| undefined>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (userDetails) {
      socket.on("connect", () => {
          console.log("Connected to the server!");
          setId(socket.id);
      });
      console.log({ user: userDetails.name });
      socket.emit("joinedUser", { user: userDetails.name });
      socket.on("welcome", (data) => {
        alert("!!" + data.user + data.message);
      });
      socket.on("joinedUser", (data) => {
        console.log("User joined:", data);
      });
      socket.on("leave", (data) => {
        console.log(data.message);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [userDetails]);



  // Initialize messages in a useEffect to avoid SSR issues
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: "1",
        content: "Hey there! How can I help you today?",
        sender: "other",
        timestamp: new Date(Date.now() - 60000).toISOString(), // Serialize timestamp
      },
      {
        id: "2",
        content: "I have a question about your services.",
        sender: "user",
        timestamp: new Date().toISOString(), // Serialize timestamp
      },
      {
        id: "3",
        content: "I have a question about your services.",
        sender: "user",
        timestamp: new Date().toISOString(), // Serialize timestamp
      },
      {
        id: "4",
        content: "I have a question about your services.",
        sender: "user",
        timestamp: new Date().toISOString(), // Serialize timestamp
      },
      {
        id: "5",
        content: "I have a question about your services.",
        sender: "other",
        timestamp: new Date().toISOString(), // Serialize timestamp
      },
      {
        id: "6",
        content: "I have a question about your services.",
        sender: "other",
        timestamp: new Date().toISOString(), // Serialize timestamp
      },
      {
        id: "7",
        content: "I have a question about your services.",
        sender: "user",
        timestamp: new Date().toISOString(), // Serialize timestamp
      },
      {
        id: "8",
        content: "I have a question about your services.",
        sender: "user",
        timestamp: new Date().toISOString(), // Serialize timestamp
      },
      {
        id: "9",
        content: "I have a question about your services.",
        sender: "other",
        timestamp: new Date().toISOString(), // Serialize timestamp
      },
    ];
    setMessages(initialMessages);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toISOString(), // Serialize timestamp
    };
    socket.emit("message", { id, message: newMessage });
    setMessages([...messages, message]);
    setNewMessage("");
     setTimeout(() => {
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
     }, 0);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Chat Header */}
      <div className="p-4 border-b flex justify-between items-center bg-white dark:bg-gray-800">
        <div className="flex gap-2">
        <div className="relative" >
          <img
            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <span className="h-3 w-3 rounded-full right-0.5 bottom-0.5 absolute bg-green-500"></span>
        </div>
        <div className="">
          <h1 className="text-lg font-bold">John Doe</h1>
          <span className="text-xs">Online</span>
        </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
           {userDetails?.name}
        </h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex ",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[70%] rounded-lg p-3",
                message.sender === "user"
                  ? "bg-primary  bg-red-200 w-fit text-black"
                  : "bg-slate-500"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white dark:bg-gray-800 border-t"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
