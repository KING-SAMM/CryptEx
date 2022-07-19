import React from 'react'

function Video() {
  return (
    <div className="h-[300px] overflow-y-hidden">
      <video autoplay="autoplay" loop="loop" muted="muted" class="w-[100vw] mr-[-300px]">
          <source src="../../vid/trading-graph-loop.webm" type="video/webm" />
      </video>
    </div>
      
  )
}

export default Video