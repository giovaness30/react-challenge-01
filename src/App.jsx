import { Fragment, useState } from 'react'
import './App.css'

function App() {
  const [pointList, setPointList] = useState([])
  const [undoList, setUndoList] = useState([])

  //Evita que evento de click seja Chamado e criado ponto a onde não deveria.
  const stopEvent = (event) => (event.stopPropagation())

  const handleUndo = (event)=> {
    stopEvent(event)

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
    stopEvent(event)

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
    if(e.className == 'buttons') return
    setPointList((current)=> {
      const where = {pageX: e.pageX - 5, pageY: e.pageY-5}
      return [...current, where]
    })
  }

  return (
  <Fragment>
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
    <div className='title-project' onClick={(e) => stopEvent(e)}>React Challenge #01</div>
    </div>
  </Fragment>
  )
}

export default App
