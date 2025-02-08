import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const ChatBox = ()=> {  
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(()=> {
        
    })
}

export default ChatBox;