import { useState, useEffect } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'

import './HomePage.scss'
import Elem from '../components/Elem.jsx'
import ControlPanel from '../components/ControlPanel.jsx'
import Modal from '../components/Modal.jsx'

// limité à 20 results, normal ?
// similar movies dans la modale
// height de bouton de search bar en % "dur"
// modale qui s'ouvre pour last movie

function HomePage() {

  const apiKey = 'a3d86270e3f274aa02028d59b3cc317c'
  const popularLink = 'https://api.themoviedb.org/3/movie/popular?'
  const topRatedLink = 'https://api.themoviedb.org/3/movie/top_rated?'
  const upcomingLink = 'https://api.themoviedb.org/3/movie/upcoming?'
  const nowPlayingLink = 'https://api.themoviedb.org/3/movie/now_playing?'
  const searchLink = 'https://api.themoviedb.org/3/search/movie?'

  const [rangeValue, setRangeValue] = useState(0)
  const [arr, setArr] = useState('loading')
  const [displayArr, setDisplayArr] = useState([])
  const [modalInfos, setModalInfos] = useState({ state: false })

  useEffect(() => { getData(popularLink, handleData) }, [])

  useEffect(() => {
    if (arr === 'loading') { return }

    let newArr = [...arr]

    if (rangeValue <= newArr.length) {
      newArr.length = rangeValue
    }
    setDisplayArr(newArr)
  }, [arr, rangeValue])

  const getData = (apiLink, callback) => {
    setArr('loading')

    let config = {
      method: 'get',
      url: apiLink + '&api_key=' + apiKey
    }

    axios(config)
      .then((res) => {
        callback(res.data.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleData = (data) => {
    let newArr = []

    data.forEach(elem => {
      newArr.push({
        isAdult: elem.adult,
        backdrop: elem.backdrop_path,
        genres: elem.genre_ids,
        id: elem.id,
        overview: elem.overview,
        poster: elem.poster_path,
        title: elem.original_title,
        rate: elem.vote_average,
        voteCount: elem.vote_count
      })
    })
    setRangeValue(newArr.length)
    setArr(newArr)
  }

  const editModal = (type, elemInfos) => {
    let newObject = {...modalInfos}

    type !== 'close' && (newObject.infos = elemInfos)
    type !== 'close' && (newObject.state = true)
    type === 'close' && (newObject.state = false)
    setModalInfos(newObject)
  }

  return (
    <div id='HomePageContainer'>
      {
        (arr !== 'loading' && displayArr.length !== 0)
        ?
        <div id='elemGrid'>
          {
            displayArr.map((elem, i) => (
              <Elem
                key={ i }
                infos={ elem }
                click={() => editModal('', elem) }
              />
            ))
          }
        </div>
        :
        arr === 'loading' &&
        <CircularProgress
          size={ 300 }
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        />
      }
      <div id='bottomPart'>
        <ControlPanel
          max={ arr !== 'loading' ? arr.length : 0 }
          rangeValue = { rangeValue }
          change={ setRangeValue }
          validSearch={(e) =>
            getData(searchLink + '&query=' + e, handleData)
          }
          topRated={() => getData(topRatedLink, handleData) }
          popular={() => getData(popularLink, handleData) }
          upcoming={() => getData(upcomingLink, handleData) }
          nowPlaying={() => getData(nowPlayingLink, handleData) }
        />
      </div>
      {
        modalInfos.state &&
        <Modal
          infos={ modalInfos.infos }
          editModal={ editModal }
        />
      }
    </div>
  )
}
export default HomePage
