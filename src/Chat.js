// Chat.js
import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from "./firebase"; // Use named import for db

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      const messagesRef = collection(db, "channels", channelId, "messages");
      const messagesQuery = query(messagesRef, orderBy("timestamp", "desc"));

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))) // Attach id for key
      );

      return unsubscribe;
    }
  }, [channelId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (channelId && input) {
      try {
        const messagesRef = collection(db, "channels", channelId, "messages");
        await addDoc(messagesRef, {
          timestamp: serverTimestamp(),
          message: input,
          user,
        });
        setInput("");
      } catch (error) {
        console.error("Error adding message: ", error);
      }
    }
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message 
            key={message.id} // Use document id as key
            user={message.user}
            timestamp={message.timestamp}
            message={message.message}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <input
          value={input}
          disabled={!channelId}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName || "channel"}`}
        />
        <button
          disabled={!channelId}
          className="chat__inputButton"
          type="submit"
          onClick={sendMessage}
        >
          Send Message
        </button>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
