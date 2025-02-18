import { useEffect, useState } from 'react'
import './App.css'

interface MainStyle {
  background: string,
  width: number,
  height: number,
  borderRadius: string,
  transform: string
}


let startTime: Date | null = null
const DURATION = 1000
const HEAD_SIZE = 100

const mainStyleDefault = {
  background: `conic-gradient(from 0deg, transparent 10%, #000 10%)`,
  width: HEAD_SIZE,
  height: HEAD_SIZE,
  borderRadius: "50%",
  transform: "rotate(70deg)"
}

function App() {
  const [mainStyle, setMainStyle] = useState<MainStyle>(mainStyleDefault)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!startTime) {
        startTime = new Date()
      }

      const now = new Date()
      const runTime = now.getTime() - startTime.getTime()
      let timeFraction = runTime / DURATION

      if (timeFraction > 1) {
        timeFraction = 1
      }

      const reverse = 1 - timeFraction

      setMainStyle({
        ...mainStyle,
        background: `conic-gradient(from ${timeFraction*20}deg, transparent ${10 * reverse}%, #000 ${10 * reverse}%)`,
      })

      if (timeFraction === 1) {
        startTime = null
        setMainStyle({ ...mainStyleDefault })
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }

  }, [mainStyle])

  return <div className="main" >
    <div className="cabeza" >
      <div style={ mainStyle } >
      </div>
    </div>
  </div>
}

export default App