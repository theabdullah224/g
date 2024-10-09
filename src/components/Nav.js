import React from 'react'
import "./tailwind.css"

function Nav() {
  return (
    <div>
      <div className="nav flex flex-col h-[12vh] w-[100vw]">
  <div className="up flex flex-col items-center h-fit w-fit absolute">
    <div className="item1 h-[0.5vh] w-[94vw] bg-blue-500 border-t-2 border-l-2 border-r-2 border-red-500"></div>
    <div className="item2 h-[0.5vh] w-[94.6vw] bg-blue-500 relative">
      <div className="absolute top-[0.5vh] left-[1.3vw] w-[0.3vw] h-[2px] bg-red-500"></div>
    </div>
    <div className="item3 h-[0.5vh] w-[95.2vw] bg-blue-500"></div>
    <div className="item4 h-[0.5vh] w-[95.8vw] bg-blue-500"></div>
    <div className="item5 h-[0.5vh] w-[96.4vw] bg-blue-500"></div>
    <div className="item6 h-[5vh] w-[97vw] bg-blue-500 border-l-2 border-r-2 border-red-500"></div>
    <div className="item7 h-[0.5vh] w-[96.4vw] bg-blue-500"></div>
    <div className="item8 h-[0.5vh] w-[95.8vw] bg-blue-500"></div>
    <div className="item9 h-[0.5vh] w-[95.2vw] bg-blue-500"></div>
    <div className="item10 h-[0.5vh] w-[94.6vw] bg-blue-500"></div>
    <div className="item11 h-[0.5vh] w-[94vw] bg-blue-500 border-b-2 border-l-2 border-r-2 border-red-500"></div>
  </div>
  <div className="down flex flex-col items-center h-fit w-fit absolute z-[-1] top-[3.2vh] left-[1.9vw]">
    <div className="item1 bg-purple-500 h-[0.5vh] w-[94vw]"></div>
    <div className="item2 bg-purple-500 h-[0.5vh] w-[94.6vw]"></div>
    <div className="item3 bg-purple-500 h-[0.5vh] w-[95.2vw]"></div>
    <div className="item4 bg-purple-500 h-[0.5vh] w-[95.8vw]"></div>
    <div className="item5 bg-purple-500 h-[0.5vh] w-[96.4vw]"></div>
    <div className="item6 bg-purple-500 h-[5vh] w-[97vw]"></div>
    <div className="item7 bg-purple-500 h-[0.5vh] w-[96.4vw]"></div>
    <div className="item8 bg-purple-500 h-[0.5vh] w-[95.8vw]"></div>
    <div className="item9 bg-purple-500 h-[0.5vh] w-[95.2vw]"></div>
    <div className="item10 bg-purple-500 h-[0.5vh] w-[94.6vw]"></div>
    <div className="item11 bg-purple-500 h-[0.5vh] w-[94vw]"></div>
  </div>
  <h1>hello</h1>
</div>

    </div>
  )
}

export default Nav
