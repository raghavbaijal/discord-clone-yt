import React from 'react';
import "./SidebarChannel.css";
import { useDispatch } from 'react-redux';
import { setChannelInfo } from './appSlice';

function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch();

  const handleChannelClick = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
  };

  return (
    <div className='sidebarChannel' onClick={handleChannelClick}>
      <h4>
        <span className='sidebarChannel__hash'>#</span>
        {channelName || "Unnamed Channel"} {/* Fallback text if channelName is undefined */}
      </h4>    
    </div>
  );
}

export default SidebarChannel;
