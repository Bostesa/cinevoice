import React from 'react'
import CardItem from '/CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
      <h1> Check out These EPIC Images of the Movie!</h1>
      <div className='cards__container'>
         <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
            src="images/image1.gif"
            text="Explore The World of Weathering with you"
            label='Adventure'
            path='/services'
             />
             <CardItem
            src="images/image4.gif"
            text="What a view"
            label='Beautiful'
            path='/services'
             />
            <CardItem
            src="images/image3.gif"
            text="The Main Charcter gets Powers???"
            label='Mysterious'
            path='/services'
             />
           <CardItem
            src="images/image2.gif"
            text="Catch the sun a rainy day"
            label='Beautiful'
            path='/services'
             />
             <CardItem
            src="images/image6.gif"
            text="Does Someone die in a anime???"
            label='Mysterious'
            path='/services'
             />
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Cards