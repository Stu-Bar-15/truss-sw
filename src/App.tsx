import React from 'react'
import './App.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'react-loading-skeleton/dist/skeleton.css'

import AllPlanets from './components/all-planets'

function App() {
  return (
    <div className="App">
      <AllPlanets />
    </div>
  )
}

export default App
