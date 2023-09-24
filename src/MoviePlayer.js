import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoviePlayer = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const startListening = async () => {
      setIsListening(true);

      try {
        const response = await axios.post('http://localhost:5000/appmovie', null, {
          headers: {
            'Content-Type': 'audio/l16; rate=16000',
          },
          responseType: 'stream',
        });

        response.data.on('data', (chunk) => {
          // Update recognized text in real-time
          setRecognizedText(chunk.toString());
          // Add logic to control the movie based on recognized commands
          controlMovie(chunk.toString());
        });

        response.data.on('end', () => {
          setIsListening(false);
        });

        response.data.on('error', (error) => {
          console.error('Speech recognition error:', error);
          setIsListening(false);
        });
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    };

    if (isListening) {
      startListening();
    }
  }, [isListening]);

  const controlMovie = (command) => {
    // Add logic to control the movie based on recognized commands
    if (command.includes('play')) {
      // Implement play functionality
    } else if (command.includes('pause')) {
      // Implement pause functionality
    } else if (command.includes('fast forward')) {
      // Implement fast forward functionality
    } else if (command.includes('rewind')) {
      // Implement rewind functionality
    }
  };

  return (
    <div>
      <h1>Movie Player</h1>
      <div>
        <p>Recognized Text: {recognizedText}</p>
      </div>
      <div>
        {/* Add movie playback controls here */}
        <button onClick={() => controlMovie('play')}>Play</button>
        <button onClick={() => controlMovie('pause')}>Pause</button>
        <button onClick={() => controlMovie('fast forward')}>Fast Forward</button>
        <button onClick={() => controlMovie('rewind')}>Rewind</button>
      </div>
    </div>
  );
};

export default MoviePlayer;
