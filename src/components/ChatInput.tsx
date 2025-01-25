// import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";


interface ChatInputProps {
    socket: any;
    inputRef: any;
}

const ChatInput = ({ socket, inputRef }: ChatInputProps) => {
    const [userInput, setUserInput] = useState("");
    const [room, setRoom] = useState("");
    //   const debouncedValue = useDebounce(userInput, 1000);
    const chatOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };
    console.log(socket)
    const sendMessage = () => {
        if (userInput.trim()) {
            //   console.log("Message sent:", debouncedValue); // Replace this with your send message logic
            socket.emit("messageReceive", { message: userInput, room });
            // socket.emit("messageReceive", { message: userInput });
            //   setRoom("")ghj.
            setUserInput(""); // Clear the input after sending
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="flex gap-5 p-3">
            <input
                type="text"
                className="w-full border text-black focus:outline-none p-2"
                onChange={chatOnChange}
                onKeyDown={handleKeyDown}
                value={userInput}
                ref={inputRef}
                name="message"
                placeholder="Type a message..."
            />
            <textarea
                // type="text"
                className="w-full border text-black focus:outline-none p-2"
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                placeholder="chat in room ....."
            />

            <button
                onClick={sendMessage}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
