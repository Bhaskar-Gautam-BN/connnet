"use client";

import { io } from "socket.io-client";

import ChatInput from "@/components/ChatInput";
import { useEffect, useMemo, useRef, useState } from "react";

const ChatMessage: React.FC = () => {
  const socket = useMemo(
    () =>
      io("http://localhost:3001", {
        // withCredentials: true,
      }),
    []
  );
  const [socketId, setSocketId] = useState<string | number | undefined>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [receivedMessage, setReceivedMessage] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      setSocketId(socket.id);
    });
    socket.on("message", (data) => {
      console.log(data);
    })
    // socket.on("joinChat", (data) => {
    //   console.log(data);
    // });
    // socket.on("received-message", (data) => {
    //   console.log(data);
    //   setReceivedMessage(data.message);
    // });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault(); // Prevent the default behavior of Ctrl + K
        inputRef.current?.focus(); // Focus on the input field
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const chatMessageData = [
    {
      sender: "mentor",
      query: "hello",
      updatedAt: "2am",
      attachment: "",
    },
    {
      sender: "",
      query: "hello",
      updatedAt: "4pm",
      attachment: "",
    },
  ];
  return (
    <div>
      <div className="w-full h-[95%]">
        <h1>Chat {socketId}</h1>
        <div className="">
          <p className="text-white bg-slate-500 rounded p-2">
            message : {receivedMessage}
          </p>

          <ChatInput inputRef={inputRef} socket={socket} />
        </div>
        {/* <div className="duration-200 mx-auto  bg-white   overflow-hidden h-full">
          <div className="flex flex-col h-full w-full duration-200 bg-white">
            <div className=" bg-chat-bg  border-transparent  h-[90%]">
              <div
                className={`flex-1 bg-[url('/images/chatbg.jpg')] p-3 overflow-y-auto flex flex-col space-y-2 bg-white/30 h-full rounded border-2 border-transparent  shadow-inner`}
                id="chatDisplay"
                //   ref={chatDisplayRef}
              >
                {chatMessageData?.map((message, index) => (
                  <div
                    key={message.query + index}
                    className={`chat-message max-w-xs rounded-lg px-3 py-1.5 text-sm ${
                      message.sender === "mentor"
                        ? "self-end bg-blue-500 shadow-md dark:text-white text-black"
                        : "self-start bg-white shadow-md"
                    }`}
                  >
                    <div className="flex flex-col space-y-2">
                      {message.query && (
                        <div
                          className={`${
                            message.sender === "mentor"
                              ? "text-white "
                              : " text-black "
                          }`}
                          dangerouslySetInnerHTML={{ __html: message.query }}
                        ></div>
                      )}
                      <div className="flex justify-end space-x-2 items-end text-xs text-gray-800 dark:text-gray-300">
                        {message.query && (
                          <span
                            className={`${
                              message.sender === "mentor"
                                ? "text-white/80"
                                : "text-gray-500"
                            }`}
                          >
                            {message?.updatedAt}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ChatInput socket={socket} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ChatMessage;
