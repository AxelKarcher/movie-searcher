import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

import './ControlPanel.scss'

function ControlPanel(props) {

  const [inputValue, setInputValue] = useState()

  return (
    <div id='controlContainer'>
      <div id='rangePanel'>
        <div>{ props.rangeValue }</div>
        <input
          type='range'
          value={ props.rangeValue }
          onChange={(e) => props.change(e.target.value)}
          min={ 0 }
          max={ props.max }
        />
      </div>

      <div id='searchContainer'>
        <TextField
          label='Search a film title'
          variant='outlined'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          style={{ height: '74%' }}
          variant='contained'
          onClick={() => props.validSearch(inputValue) }
        ><SearchIcon /></Button>
      </div>

      <div id='btns'>
        <Button
          variant='contained'
          onClick={ props.popular }
        >Popular</Button>
        <Button
          variant='contained'
          onClick={ props.topRated }
        >Top rated</Button>
        <Button
          variant='contained'
          onClick={ props.upcoming }
        >Upcoming</Button>
        <Button
          variant='contained'
          onClick={ props.nowPlaying }
        >Now playing</Button>
      </div>
    </div>
  )
}
export default ControlPanel
