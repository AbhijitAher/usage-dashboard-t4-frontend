import './App.css'
import Chart from './components/Chart'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [usageData, setUsageData] = useState(false)
  const [usageAmount, setUsageAmount] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDateChange = (event) => {
    let date = event.target.value
    getData(date)
  }

  const getData = (date) => {
    setIsLoading(true)
    axios
      .get(`https://usage-dashboard-chart.herokuapp.com/usage/${date}`)
      .then((res) => {
        // console.log('API Response', res.data.usageData)
        handleSetUsageData(res.data.usageData)
        handleSetUsageAmount(res.data.usageData)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log('Error', e)
        setIsLoading(false)
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

  const handleSetUsageAmount = (data) => {
    if (data != []) {
      let usage = {}
      for (let i = 0; i < data.length; i++) {
        let app = data[i].hostName

        if (usage[app] === undefined) {
          usage[app] = data[i].download + data[i].upload
        } else {
          usage[app] = usage[app] + data[i].download + data[i].upload
        }
      }

      let sortedKeys = Object.keys(usage).sort()

      let ans = []
      for (let i = 0; i < sortedKeys.length; i++) {
        ans.push([sortedKeys[i], usage[sortedKeys[i]] / 1024])
      }

      let labels = ans.map((el) => el[0])
      let labelUsage = ans.map((el) => el[1].toFixed(2))

      setUsageAmount({ labels, labelUsage })
    } else {
      setUsageAmount(false)
    }
  }

  return (
    <div className='App'>
      <div className="text-center">
        <h2>Welcome to your App usage Statistics</h2>
        <h5>Note: There is valid data for Dates: 03/11/2022 and 04/11/2022</h5>
        <label htmlFor="date">Choose a date</label>
        <input type="date" name="date" id="date" onChange={handleDateChange} />
      </div>

      {!isLoading ? <>
        <Chart usageData={usageAmount} label='Usage Stats in Megabytes' yText='Usage in Megabytes' />
        <Chart usageData={usageData} label='Usage Stats in Minutes' yText='Usage in Minutes ' />
      </> :
        <div className="text-center loading"> Loading... </div>
      }

    </div>
  )
}

export default App
