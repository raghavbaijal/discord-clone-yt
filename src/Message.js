import React from "react";
import "./Message.css";
import { Avatar } from "@mui/material";

function Message({ user, timestamp, message }) {
  return (
    <div className="message">
      <Avatar src={user?.photo || ""} alt={user?.displayName || "User"} />
      <div className="message__info">
        <h4>
          {user?.displayName || "Unknown User"}
          <span className="message__timestamp">
            {timestamp ? new Date(timestamp.toDate()).toUTCString() : ""}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
