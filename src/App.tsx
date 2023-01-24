import React, { useEffect, useState } from 'react'
import './style/App.css'

type point = [number, number];

function App() {
  const [circleHist, setCircleHist] = useState<point[]>([]);
  const [circleArr, setCircleArr] = useState<point[]>([]);
  const [EleArr, setEleArr] = useState<JSX.Element[]>([]);

  function handleAddCircle(e:React.MouseEvent) {
    const { pageX, pageY } = e;
    console.log('X: ', pageX, screen.availWidth, pageX - (screen.availWidth / 2));
    console.log('Y: ', pageY, screen.availHeight, pageY - (screen.availHeight / 2));
    setCircleArr([...circleArr, [pageX, pageY]]);
    setCircleHist([]);
  }
  
  function handleUndo(e:React.MouseEvent) {
    const removePoint = circleArr[circleArr.length - 1];
    if (removePoint !== undefined) {
      setCircleArr(circleArr.slice(0, circleArr.length - 1));
      setCircleHist([...circleHist, removePoint]);
    }
  }
  
  function handleRedo(e:React.MouseEvent) {
    const addPoint = circleHist[circleHist.length - 1];
    if (addPoint !== undefined) {
      setCircleHist(circleHist.slice(0, circleHist.length - 1));
      setCircleArr([...circleArr, addPoint]);
    }
  }

  useEffect(() => {
    const circleEle = [];
    for (const coords of circleArr) {
      circleEle.push(
        <div 
          className="circle" 
          style={{
            left:`${coords[0] - 12}px`, 
            top:`${coords[1] - 12}px`, 
            //transformOrigin:`${-(coords[0] - (screen.availWidth / 2))}px ${-(coords[1] - (screen.availHeight / 2))}px`
          }}
        ></div>
      )
    }
    setEleArr(circleEle);
  }, [circleArr]);

  return (
    <>
      <div className="btn-container">
        <button type="button" className='btn' id='undo-btn' onClick={(e: React.MouseEvent) => {handleUndo(e)}}>Undo</button>
        <button type="button" className='btn' id='redo-btn' onClick={(e: React.MouseEvent) => {handleRedo(e)}}>Redo</button>
      </div>
      <div className="app" onMouseDown={(e: React.MouseEvent) => {/* Want to add handling of adding circles while mouse is held down */}} onClick={(e: React.MouseEvent) => handleAddCircle(e)}>
        {EleArr}
      </div>
    </>
  )
}

export default App
