// Sidebar.js
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CallIcon from "@mui/icons-material/Call";
import { Avatar } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import HeadsetIcon from "@mui/icons-material/Headset";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "./userSlice";
import { db, auth } from "../firebase";  
import { collection, onSnapshot, addDoc } from "firebase/firestore";  // Import Firestore functions

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'channels'), snapshot => 
      setChannels(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })))
    );
    return unsubscribe;
  }, []);

  const handleAddChannel = async () => {
    const channelName = prompt('Enter a new channel name');
    if (channelName) {
      await addDoc(collection(db, 'channels'), {
        channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Clever Programmer</h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar_channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar_addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, data }) => (
            <SidebarChannel key={id} id={id} channelName={data.channelName} />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon className="sidebar__voiceIcon" fontSize="large" />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user?.photo} />
        <div className="sidebar__profileinfo">
          <h3>{user?.displayName}</h3>
          <p>#{user?.uid?.substring(0, 5) || "00000"}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
