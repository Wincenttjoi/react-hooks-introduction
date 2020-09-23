import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const Character = props => {
  const [loadedCharacter, setLoadedCharacter] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setIsLoading(true)
    fetch('https://swapi.dev/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setIsLoading(false);
        setLoadedCharacter(loadedCharacter);
      })
      .catch(err => {
        console.log(err);
      });
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== props.selectedChar ||
  //     nextState.loadedCharacter.id !== state.loadedCharacter.id ||
  //     nextState.isLoading !== state.isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== props.selectedChar) {
  //     fetchData();
  //   }
  // }

  useEffect(() => {
    fetchData();
    return () => {
      console.log('Cleaning up...')
    }
  }, [props.selectedChar])

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }


    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
  
}

export default Character;
