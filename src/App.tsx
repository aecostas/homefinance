import dayjs from 'dayjs'

import './App.scss'
import Timeserie from './ui-components/charts/Timeserie'

function App() {
  

  const baseTime = dayjs();

  const values = [{t: baseTime.toDate().getTime(), value: 1}]

  const trend = 2/365
  const noise = 0.3

  for (let i=1; i<365*2; i++) {
    values.push({t: baseTime.add(i, 'day').toDate().getTime(), value: values[i-1].value + (Math.random() - 0.5)*noise + trend }   )
  }


  console.log('loading...: ', values)
  return (
    <div className='app'>
      <div className='controls'>

      </div>
    
      <div className='data'>
         <Timeserie series={values}/>
     </div>

    </div>
  )
}

export default App
