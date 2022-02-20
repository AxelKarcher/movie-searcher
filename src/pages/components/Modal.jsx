import Button from '@mui/material/Button'
import StarRatings from 'react-star-ratings'
import CloseIcon from '@mui/icons-material/Close'

import './Modal.scss'

function Modal(props) {
  return (
    <div id='modalContainer'>
      <div
        id='modalPanel'
        style={{
          backgroundImage: `linear-gradient(
            rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)
          ), url(https://image.tmdb.org/t/p/original${props.infos.backdrop})`
        }}
      >
        <h2>{ props.infos.title }</h2>
        <div>{ props.infos.overview }</div>
        <br />
        <div>{ props.infos.isAdult ? 'For adults' : 'For everyone' }</div>
        <div>ID: { props.infos.id }</div>
        <br />
        <StarRatings
          rating={ props.infos.rate / 2 }
          starRatedColor='rgb(255, 200, 0)'
          numberOfStars={ 5 }
          name='rating'
        />
        <div>{ '' + props.infos.rate + ' (' + props.infos.voteCount + ' votes)'}</div>
        <br />
        <Button
          id='closeModalBtn'
          variant='contained'
          onClick={() => props.editModal('close')}
        ><CloseIcon /></Button>
      </div>
    </div>
  )
}
export default Modal
