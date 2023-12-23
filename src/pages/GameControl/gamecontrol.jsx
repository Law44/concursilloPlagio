import React from 'react';
import { useGameContext } from '../../components/GameProvider'; // Adjust the path as needed

const GameControlPage = () => {
  const { selectOption, setQuestion, resetGame, showQuestion, getQuestion, solveQuestion, clearQuestion, levelUp, reroll, comodin50, roulette, deleteOptions, ia } = useGameContext();
  const { questionData, setQuestionData } = useGameContext();


  const handleOptionSelect = (option) => {
    selectOption(option);
  };

  const handleNextQuestion = () => {
    setQuestion();
  };

  const handleResetGame = () => {
    resetGame();
  };

  const handleGetQuestion = () => {
    getQuestion();
  }

  const handleShowQuestion = () => {
    showQuestion();
  }

  const handleSolveQuestion = () => {
    solveQuestion();
  }

  const handleClearGame = () => {
    clearQuestion();
  }

  const handleLevelUp = () => {
    levelUp();
  }

  const handleReroll = () => {
    reroll();
  }

  const handle50 = () => {
    comodin50();
  }

  const handleRoulette = () => {
    roulette();
  }

  const delete1 = () => {
    deleteOptions(1);
  }

  const delete2 = () => {
    deleteOptions(2);
  }

  const delete3 = () => {
    deleteOptions(3);
  }

  const handleIA = () => {
    ia();
  }

  return (
    <div className="game-control-page">
      <h2>Controles administrador</h2>
      <button onClick={handleNextQuestion}>Siguiente Pregunta</button>
      <button onClick={() => handleGetQuestion()}>Sacar Pregunta</button>
      <button onClick={() => handleShowQuestion()}>Mostrar Pregunta</button>
      <button onClick={handleSolveQuestion}>Resolver Pregunta</button>
      <br></br>

      <button onClick={() => handleOptionSelect('A')}>Marcar A</button>
      <button onClick={() => handleOptionSelect('B')}>Marcar B</button>
      <button onClick={() => handleOptionSelect('C')}>Marcar C</button>
      <button onClick={() => handleOptionSelect('D')}>Marcar D</button>
      <br></br>
      <button onClick={handleReroll}>Usar comodin reroll</button>
      <button onClick={handle50}>Usar comodin 50/50</button>
      <button onClick={handleRoulette}>Usar ruleta</button>
      <button onClick={handleIA}>Usar IA</button>

      <br></br>
      <button onClick={delete1}>Eliminar 1</button>
      <button onClick={delete2}>Eliminar 2</button>
      <button onClick={delete3}>Eliminar 3</button>

      <br></br>
      <button onClick={handleLevelUp}>Subir dificultad</button>
      <button onClick={handleClearGame}>Limpiar</button>
      <button onClick={handleResetGame}>Reiniciar</button>


      <div className="game-page" style={{ marginTop: "40px" }}>
        <p>Dificultad: {questionData.level}</p>
        <p>Creador: {questionData.creator}</p>
        <div className="question-box">
          <h2>{questionData.text || '\u00A0'}</h2>
        </div>
        <div className="answer-box">
          {questionData.options &&
            questionData.options.map((option, index) => {
              return (
                <div
                  key={index}
                  className={`answer-option ${String.fromCharCode(65 + index) === questionData.correct.trim() ? 'selectedcorrect' : ''}`}
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

export default GameControlPage;