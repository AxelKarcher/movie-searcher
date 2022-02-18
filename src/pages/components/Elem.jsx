import './Elem.scss'

function Elem(props) {
  return (
    <div id='elemContainer' onClick={ props.click }>
      <div id='topPart'>
        <img
          id='posterImg'
          src={ 'https://image.tmdb.org/t/p/original/' + props.infos.poster }
          alt='poster'
        />
      </div>
      <div className='separator'></div>
      <div id='title'>{ props.infos.title }</div>
    </div>
  )
}
export default Elem
