import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'

const Roulette = ({ onSpinStop }) => {
  const data = [
    { option: '0', style: { backgroundColor: 'orangered', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'lightpink', textColor: 'white' } },
    { option: '2', style: { backgroundColor: 'lightgreen', textColor: 'white' } },
    { option: '1', style: { backgroundColor: 'lightpink', textColor: 'white' } },
    { option: '0', style: { backgroundColor: 'orangered', textColor: 'black' } },
    { option: '2', style: { backgroundColor: 'lightgreen', textColor: 'white' } },
    { option: '1', style: { backgroundColor: 'lightpink', textColor: 'white' } },
    { option: '2', style: { backgroundColor: 'lightgreen', textColor: 'white' } },
    { option: '3', style: { backgroundColor: 'yellow ', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'lightpink', textColor: 'white' } },
    { option: '2', style: { backgroundColor: 'lightgreen', textColor: 'white' } },
    { option: '1', style: { backgroundColor: 'lightpink', textColor: 'white' } },
    { option: '0', style: { backgroundColor: 'orangered', textColor: 'black' } },
    { option: '2', style: { backgroundColor: 'lightgreen', textColor: 'white' } },
    { option: '1', style: { backgroundColor: 'lightpink', textColor: 'white' } },
    { option: '2', style: { backgroundColor: 'lightgreen', textColor: 'white' } },
  ]

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        outerBorderWidth="2"
        radiusLineWidth="1"
        outerBorderColor="white"
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpinClick}>Girar</button>
      <button onClick={onSpinStop}>Cerrar</button>
    </>
  )
};

export default Roulette;
