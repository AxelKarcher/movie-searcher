import './App.scss'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import HomePage from './pages/home/HomePage.jsx'

function App() {
  return (
    <div id='appContainer'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={ <HomePage /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
