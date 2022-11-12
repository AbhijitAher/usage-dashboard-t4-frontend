import './App.css'
import Chart from './components/Chart'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [usageData, setUsageData] = useState(false)

  const handleDateChange = (event) => {
    let date = event.target.value
    getData(date)
  }

  const getData = (date) => {
    axios
      .get(`https://usage-dashboard-chart.herokuapp.com/usage/${date}`)
      .then((res) => {
        console.log('API Response', res.data.usageData)
        handleSetUsageData(res.data.usageData)
      })
      .catch((e) => {
        console.log('Error', e)
      })
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

      <Chart usageData={usageData} />
      <h5>Note: There is valid data for Dates: 03/11/2022 and 04/11/2022</h5>
    </div>
  )
}

export default App
