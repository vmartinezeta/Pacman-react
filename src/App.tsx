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
const DURATION = 2000
const BOCA_SIZE = 200

const mainStyleDefault = {
  background: `conic-gradient(from 0deg, #fff 10%, #000 10%)`,
  width: BOCA_SIZE,
  height: BOCA_SIZE,
  borderRadius: "50%",
  transform: "rotate(70deg)"
}

function App() {
  const [mainStyle, setMainStyle] = useState<MainStyle>(mainStyleDefault)
  const [progress, setProgress] = useState(0)

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
      setProgress(timeFraction)

      const reverse = 1 - timeFraction

      setMainStyle({
        ...mainStyle,
        background: `conic-gradient(from ${timeFraction*20}deg, #fff ${10 * reverse}%, #000 ${10 * reverse}%)`,
      })

      if (timeFraction === 1) {
        startTime = null
        setProgress(0)
        setMainStyle({ ...mainStyleDefault })
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }

  }, [progress])

  return <div className="main" >
    <div className="cabeza" >
      <div style={ mainStyle } >
        </div>
        </div>
        </div>
}

export default App
