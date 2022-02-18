import { useState, useEffect } from 'react'
import './HomePage.scss'
import Button from '@mui/material/Button'
import axios from 'axios'

import Elem from '../components/Elem.jsx'

function HomePage() {

  const apiKey = 'a3d86270e3f274aa02028d59b3cc317c'
  const popularLink = 'https://api.themoviedb.org/3/movie/popular?'

  const [rangeValue, setRangeValue] = useState(0)
  const [arr, setArr] = useState([])
  const [displayArr, setDisplayArr] = useState([])
  const [modalInfos, setModalInfos] = useState({ state: false })

  useEffect(() => { getData(popularLink) }, [])

  useEffect(() => {
    let newArr = [...arr]

    if (rangeValue <= newArr.length) {
      newArr.length = rangeValue
    }
    setDisplayArr(newArr)
  }, [arr, rangeValue])

  const handleData = (data) => {
    let newArr = []

    data.forEach(elem => {
      newArr.push({
        isAdult: elem.adult, //
        backdrop: elem.backdrop_path,
        genres: elem.genre_ids,
        overview: elem.overview, //
        poster: elem.poster_path,
        title: elem.original_title, //
        rate: elem.vote_average, //
        voteCount: elem.vote_count //
      })
    })
    setRangeValue(newArr.length)
    setArr(newArr)
  }

  const getData = (apiLink) => {
    let config = {
      method: 'get',
      url: apiLink + 'api_key=' + apiKey + '&language=en-US&page=1'
    }

    axios(config)
      .then((res) => {
        handleData(res.data.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const editModal = (type, elemInfos) => {
    let newObject = {...modalInfos}

    type !== 'close' && (newObject.infos = elemInfos)
    type !== 'close' && (newObject.state = true)
    type === 'close' && (newObject.state = false)
    console.log(newObject)
    setModalInfos(newObject)
  }

  return (
    <div id='HomePageContainer'>
      <div id='elemGrid'>
        {
          arr.length !== 0 && displayArr.map((elem, i) => (
            <Elem
              key={ i }
              id='elem'
              infos={ elem }
              click={() => editModal('', elem) }
            />
          ))
        }
      </div>

      <div id='controlPanel'>
        <div id='rangePanel'>
          <div>{ rangeValue }</div>
          <input
            type='range'
            value={ rangeValue }
            onChange={(e) => setRangeValue(e.target.value)}
            min={ 0 }
            max={ arr.length }
          />
        </div>
        <div id='btns'>
          <Button
            variant='contained'
            onClick={() => alert('test')}
          >Test</Button>
        </div>
      </div>

      {
        modalInfos.state &&
        <div id='modal'>
          <div id='modalPanel'>
            <img
              id='modalBackground'
              src={ 'https://image.tmdb.org/t/p/original/' + modalInfos.infos.backdrop }
              alt='backdrop'
            />
            <div>{ modalInfos.infos.title }</div>
            <br />
            <div>{ modalInfos.infos.overview }</div>
            <br />
            <div>{ modalInfos.infos.isAdult ? 'For adults' : 'For everyone' }</div>
            <br />
            <div>{ '' + modalInfos.infos.rate + ' (' + modalInfos.infos.voteCount + ' votes)'}</div>
            <br />
            <Button
              id='closeModalBtn'
              variant='contained'
              onClick={() => editModal('close')}
            >Close</Button>
          </div>
        </div>
      }
    </div>
  )
}
export default HomePage
