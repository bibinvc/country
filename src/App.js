import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Countries from './containers/Countries'
// import Country from './containers/Country'

function App() {
  return (
    <Router>
      <>
        <Route exact path="/">
          <Countries />
        </Route>
        <Route path="/countries/:name"></Route>
      </>
    </Router>
  )
}

export default App
