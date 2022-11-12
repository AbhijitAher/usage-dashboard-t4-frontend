import './App.css'
import Chart from './components/Chart'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [usageData, setUsageData] = useState(false)

  const handleDateChange = (event) => {
    let date = event.target.value
    getData(date)
  }

  const getData = (date) => {
    setIsLoading(true)
    axios
      .get(`http://localhost:3031/usage/${date}`)
      .then((res) => {
        console.log('API Response', res.data.usageData)
        handleSetUsageData(res.data.usageData)
      })
      .catch((e) => {
        console.log('Error', e)
      })
    setIsLoading(false)
  }

  const handleSetUsageData = (data) => {
    if (data != []) {
      let usage = {}
      for (let i = 0; i < data.length; i++) {
        let app = data[i].hostName

        if (usage[app] === undefined) {
          usage[app] = data[i].useageSeconds
        } else {
          usage[app] = usage[app] + data[i].useageSeconds
        }
      }

      let sortedKeys = Object.keys(usage).sort()

      let ans = []
      for (let i = 0; i < sortedKeys.length; i++) {
        ans.push([sortedKeys[i], usage[sortedKeys[i]] / 60])
      }

      let labels = ans.map((el) => el[0])
      let labelUsage = ans.map((el) => el[1].toFixed(2))

      setUsageData({ labels, labelUsage })
    } else {
      setUsageData(false)
    }
  }

  return (
    <div className="App">
      <div className="text-center">
        <h2>Welcome to your App usage Statistics</h2>
        <label htmlFor="date">Choose a date</label>
        <input type="date" name="date" id="date" onChange={handleDateChange} />
      </div>

      <div></div>
      {/* {usageData != false  ? ( */}
      <Chart usageData={usageData} />
      {/* ) : null} */}
    </div>
  )
}

export default App
