import React,{ useState} from 'react'
import { Button } from './button'
import '../App.css';
import'./HeroSection.css';
import MoviePlayer from '../MoviePlayer';


function HeroSection() {
  
const App = () => {
  const [isMoviePlayerVisible, 
    setIsMoviePlayerVisible] 
    = useState(false);}
  
  const showMoviePlayer = () => {
    setIsMoviePlayerVisible(true);
  };
  return (
    <div className='hero-container'>
       <video src="/videos/movie.mp4" autoPlay loop muted />
       <h1>WEATHERING WITH YOU</h1>
       <p> Watch now with remote voice commands</p>
       <Button className='btns' 
       buttonStyle='btn--outline' 
       ButtonSize='btn-large' 
       onClick={showMoviePlayer}
       >

       </Button>
       <Button className='btns' buttonStyle='btn--primary' ButtonSize='btn-large'
       >
         WatchMovie <i className='far fa-play-circle'/>
       </Button>
    </div>
  )
}

export default HeroSection