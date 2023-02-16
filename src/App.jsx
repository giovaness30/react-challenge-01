import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [pointList, setPointList] = useState([])
  const [undoList, setUndoList] = useState([])

  useEffect(()=>{
    console.log(pointList);
    console.log(undoList);
  },[pointList])

  const handleUndo = (event)=> {
    event.stopPropagation()

    if(pointList.length == 0) return

    const lastPoint = pointList[pointList.length -1]

    setUndoList((current)=> {
      return [...current, lastPoint]
    })

    setPointList((current)=> {
      let newArr = [...current].slice(0, -1)
      return newArr
    })
  }

  const handleReUndo = (event)=> {
    event.stopPropagation()

    if(undoList.length == 0) return

    const lastUndoPoint = undoList[undoList.length -1]

    setUndoList((current)=> {
      let newArr = [...current].slice(0, -1)
      return newArr
    })

    setPointList((current)=> {
      let newArr = [...current, lastUndoPoint]
      return newArr
    })

  }

  const handleNewPoint = (e) => {
    console.log(e);
    if(e.className == 'buttons') return
    setPointList((current)=> {
      const where = {pageX: e.pageX - 5, pageY: e.pageY-5}
      return [...current, where]
    })
  }

  return (
    <div className="app" 
    onClick={(e)=> handleNewPoint(e)}>
      <div className='content-buttons'>
      <button className='buttons' onClick={handleUndo}>Desfazer</button>
      <button className='buttons' onClick={handleReUndo}>Refazer</button>

      </div>
      {pointList.map((point, index)=>{
        return(
          <div key={index} style={{top:point.pageY, left: point.pageX}} className='point-item'></div>
        )
      })}
      
    </div>
  )
}

export default App
