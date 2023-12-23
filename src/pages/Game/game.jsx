// In GamePage.jsx
import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../components/GameProvider';
import Ruleta from '../../components/Roulette';
import '../../App.css';
import rerollImage from '../../resources/reroll.png';
import image50 from '../../resources/50.png';
import rouletteImage from '../../resources/ruleta.png';
import IaImage from '../../resources/ai.png';


const GamePage = () => {
  const { currentQuestion, setCurrentQuestion } = useGameContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const { questionData, setQuestionData } = useGameContext();
  const [solved, setSolved] = useState(null);
  const [usedReroll, setReroll] = useState(null);
  const [usedIa, setIA] = useState(null);
  const [used50, set50] = useState(null);
  const [usedRoulette, setRoulette] = useState(null);
  const [visibleRoulette, setVisibleRoulette] = useState(null);

  const totalQuestions = 15;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    
  };

  const closeRoulette = () => {
    setIsVisible(!isVisible);
    localStorage.setItem('visibleRoulette', "no");
  };

  useEffect(() => {
    // Check localStorage for selected option
    const storedOption = localStorage.getItem('selectedOption');
    const storeQuestion = localStorage.getItem('currentQuestion');
    const storeQuestionData = JSON.parse(localStorage.getItem('questionData'));
    const storeSolved = localStorage.getItem('solved');
    const storeReroll = localStorage.getItem('reroll');
    const storeIA = localStorage.getItem('ia');
    const store50 = localStorage.getItem('comodin50');
    const storeRoulette = localStorage.getItem('roulette');
    const storeVisibleRoulette = localStorage.getItem('visibleRoulette');
    if (storeQuestion) {
      setSelectedOption(storedOption);
    }
    if (storedOption) {
      setCurrentQuestion(storeQuestion);
    }
    if (storeQuestionData) {
      setQuestionData(storeQuestionData);
    }
    if (storeSolved === "yes") {
      setSolved((prevSolved) => {
        if (prevSolved !== "yes") {
          return "yes";
        }
        return prevSolved;
      });
    }
    if (storeReroll === "yes") {
      setReroll((usedReroll) => {
        if (usedReroll !== "yes") {
          return "yes";
        }
        return usedReroll;
      });
    }
    if (storeIA === "yes") {
      setIA((usedia) => {
        if (usedia !== "yes") {
          return "yes";
        }
        return usedia;
      });
    }
    if (store50 === "yes") {
      set50((used50) => {
        if (used50 !== "yes") {
          return "yes";
        }
        return used50;
      });
    }
    if (storeRoulette === "yes") {
      setRoulette((usedRoulette) => {
        if (usedRoulette !== "yes") {
          return "yes";
        }
        return usedRoulette;
      });
    }
    if (storeVisibleRoulette === "yes") {
      setVisibleRoulette((usedVisibleRoulette) => {
        if (usedVisibleRoulette !== "yes") {
          return "yes";
        }
        return usedVisibleRoulette;
      });
      toggleVisibility();
    }

    // Add event listener for changes in localStorage
    const handleStorageChange = () => {
      const updatedOption = localStorage.getItem('selectedOption');
      const updatedQuestion = localStorage.getItem('currentQuestion');
      const updatedData = JSON.parse(localStorage.getItem('questionData'));
      const updatedSolved = localStorage.getItem('solved');
      const updatedReroll = localStorage.getItem('reroll');
      const updatedIa = localStorage.getItem('ia');
      const updated50 = localStorage.getItem('comodin50');
      const updatedRoulette = localStorage.getItem('roulette');
      const updatedVisibleRoulette = localStorage.getItem('visibleRoulette');

      setSelectedOption(updatedOption);
      setCurrentQuestion(updatedQuestion);
      setSolved(updatedSolved);
      setReroll(updatedReroll);
      set50(updated50);
      setRoulette(updatedRoulette);
      setVisibleRoulette(updatedVisibleRoulette);
      setIA(updatedIa);
      if (updatedData.visible) {
        setQuestionData(updatedData);
      }
      if (updatedSolved === "yes") {
        setSolved((prevSolved) => {
          if (prevSolved !== "yes") {
            return "yes";
          }
          return prevSolved;
        });
      }
      if (updatedReroll === "yes") {
        setReroll((usedReroll) => {
          if (usedReroll !== "yes") {
            return "yes";
          }
          return usedReroll;
        });
      }
      if (updatedIa === "yes") {
        setIA((usedia) => {
          if (usedia !== "yes") {
            return "yes";
          }
          return usedia;
        });
      }
      if (updated50 === "yes") {
        set50((used50) => {
          if (used50 !== "yes") {
            return "yes";
          }
          return used50;
        });
      }
      if (updatedRoulette === "yes") {
        setRoulette((usedRoulette) => {
          if (usedRoulette !== "yes") {
            return "yes";
          }
          return usedRoulette;
        });
      }
      if (updatedVisibleRoulette === "yes") {
        setVisibleRoulette((usedVisibleRoulette) => {
          if (usedVisibleRoulette !== "yes") {
            return "yes";
          }
          return usedVisibleRoulette;
        });
        toggleVisibility();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array to run the effect once on mount

  const renderQuestionNumbers = () => {
    const questionNumbers = [];
    for (let i = 1; i <= totalQuestions; i++) {
      questionNumbers.push(
        <div key={i} className={`question-number ${i == currentQuestion ? 'current' : ''}`}>
          {i}
        </div>
      );
    }
    return questionNumbers;
  };

  return (
    <div className='container'>
      <div className="roulette-container">
        {isVisible && <div><Ruleta onSpinStop={closeRoulette}></Ruleta></div>}
      </div>
      <div className="image-container">
        <div className="circular-border">
          <img src={rerollImage} style={{ opacity: usedReroll === "yes" ? 0.5 : 1 }} />
        </div>
        <div className="circular-border" style={{ marginLeft: 30 }}>
          <img src={image50} style={{ opacity: used50 === "yes" ? 0.5 : 1 }} />
        </div>
        <div className="circular-border" style={{ marginLeft: 30 }}>
          <img src={rouletteImage} style={{ opacity: usedRoulette === "yes" ? 0.5 : 1 }} />
        </div>
        <div className="circular-border" style={{ marginLeft: 30 }}>
          <img src={IaImage} style={{ opacity: usedIa === "yes" ? 0.5 : 1 }} />
        </div>
      </div>
      <div className="game-page">
        <div className="question-numbers">{renderQuestionNumbers()}</div>
        <div className="question-box">
          <h2>{questionData.text || '\u00A0'}</h2>
        </div>
        <div className="answer-box">
          {questionData.options &&
            questionData.options.map((option, index) => {
              const isSelected = String.fromCharCode(65 + index) === selectedOption;
              const isCorrect = (selectedOption && questionData.correct) ? selectedOption.trim() === questionData.correct.trim() : false;
              return (
                <div
                  key={index}
                  className={`answer-option ${isSelected && solved === "yes" ? (isCorrect ? 'selectedcorrect' : 'selected') : solved === "yes" && String.fromCharCode(65 + index) === questionData.correct.trim() ? 'selectedcorrect' : isSelected ? 'selected' : ''}`}
                >
                  <span className="answer-label">{option}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
