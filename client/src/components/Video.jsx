import React from 'react'
import video from '../../vid/trading-graph-loop.mp4';

const Video = () => {
  return (
    <div className="h-[300px] overflow-y-hidden">
      <video 
        src={ video } 
        autoPlay 
        loop 
        muted
        className="w-[100vw]"></video>
    </div>
      
  )
}

export default Video