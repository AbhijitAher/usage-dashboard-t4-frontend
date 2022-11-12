import './App.css'
import Chart from './components/Chart'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(false)

  const handleDateChange = (event) => {
    let date = event.target.value
    getData(date)
  }

  const getData = (date) => {
    setIsLoading(true)
    axios
      .get(`http://localhost:3031/usage/${date}`)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log('Error', e)
      })
    setIsLoading(false)
  }

  return (
    <div className="App">
      <h1>Welcome to your App usage Statistics</h1>
      <input type="date" name="date" id="date" onChange={handleDateChange} />
      <Chart />
    </div>
  )
}

export default App
