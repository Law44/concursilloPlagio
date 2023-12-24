import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();
var question = 1;
var level = 1;
var option = 0;
var [text, optionA, optionB, optionC, optionD, answer, creator, difficulty] = "";
let contador = 0;

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionData, setQuestionData] = useState({ text: "", options: [] }); // Add new state for question data
  const [solved, setSolved] = useState("no");
  const [usedReroll, setReroll] = useState("no");
  const [usedIa, setIA] = useState("no");
  const [used50, set50] = useState("no");
  const [visibleRoulette, setVisibleRoulette] = useState("no");
  const [usedRoulette, setRoulette] = useState("no");
  const [usedQuestionIndices, setUsedQuestionIndices] = useState([]);

  const selectOption = (option) => {
    setSelectedOption(option);
    // Save selected option to localStorage
    localStorage.setItem('selectedOption', option);
  };

  const solveQuestion = () => {
    setSolved("yes");
    localStorage.setItem('solved', solved);
  }

  const setQuestion = () => {
    question++;
    setCurrentQuestion(question);
    localStorage.setItem('currentQuestion', question);
  }

  const reroll = () => {
    setReroll("yes");
    localStorage.setItem('reroll', usedReroll);
  }

  const ia = () => {
    setIA("yes");
    localStorage.setItem('ia', usedIa);
  }

  const comodin50 = () => {
    set50("yes");
    localStorage.setItem('comodin50', used50);
    let indexToChange1 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
    let indexToChange2 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
    while (indexToChange1 === indexToChange2) {
      indexToChange2 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
    }
    let newData = questionData.options;
    newData[indexToChange1] = '\u00A0';
    newData[indexToChange2] = '\u00A0';

    setQuestionData(prevQuestionData => ({
      ...prevQuestionData,
      options: newData,
      visible: true
    }));
  }

  const roulette = () => {
    setRoulette("yes");
    localStorage.setItem('roulette', usedRoulette);
    setVisibleRoulette("yes");
    localStorage.setItem('visibleRoulette', visibleRoulette);
  };

  const levelUp = () => {
    level++;
  }

  const getRandomIndex = (excludeIndex) => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * 4);
    } while (randomIndex === excludeIndex);

    return randomIndex;
  };

  const getQuestion = async () => {
    try {
      setSolved("no");
      localStorage.setItem('solved', solved);

      // Fetch random line from the CSV file
      const response = await fetch('/preguntas.csv');
      const data = await response.text();
      const lines = data.split('\n');

      // Filter out used question indices
      const availableIndices = lines
        .map((_, index) => index)
        .filter(index => !usedQuestionIndices.includes(index));
      
      const availableQuestions = availableIndices.filter(
        index => parseInt(lines[index].split(';')[7].trim()) === level
      );

      // Check if there are available questions
      if (availableIndices.length === 0 || availableQuestions.length === 0) {
        console.log('All questions have been used');
        return; // Handle the case where all questions have been used
      }

      // Choose a random index from the available ones
      let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

      var randomLine = lines[randomIndex];
      // Parse the line and set the question data
      [text, optionA, optionB, optionC, optionD, answer, creator, difficulty] = randomLine.split(';');
      while (level != difficulty) {
        randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

        randomLine = lines[randomIndex];
        // Parse the line and set the question data
        [text, optionA, optionB, optionC, optionD, answer, creator, difficulty] = randomLine.split(';');
      }

      // Mark the question as used
      setUsedQuestionIndices((prevIndices) => [...prevIndices, randomIndex]);

      // Update local storage after state is set
      setQuestionData({
        text: text,
        options: ['\u00A0', '\u00A0', '\u00A0', '\u00A0'],
        correct: answer,
        visible: false,
        creator: creator,
        level: difficulty
      });
    } catch (error) {
      console.error('Error fetching or processing CSV file:', error);
    }

    contador++;
    console.log(contador);
  }

  const showQuestion = async () => {
    if (option == 0) {
      setQuestionData(prevQuestionData => ({
        ...prevQuestionData,
        visible: true
      }));
    }
    else if (option == 1) {
      setQuestionData(prevQuestionData => ({
        ...prevQuestionData,
        options: ["A:" + optionA, '\u00A0', '\u00A0', '\u00A0'],
        visible: true
      }));
    }
    else if (option == 2) {
      setQuestionData(prevQuestionData => ({
        ...prevQuestionData,
        options: ["A:" + optionA, "B:" + optionB, '\u00A0', '\u00A0'],
        visible: true
      }));
    }
    else if (option == 3) {
      setQuestionData(prevQuestionData => ({
        ...prevQuestionData,
        options: ["A:" + optionA, "B:" + optionB, "C:" + optionC, '\u00A0'],
        visible: true
      }));
    }
    else if (option == 4) {
      setQuestionData(prevQuestionData => ({
        ...prevQuestionData,
        options: ["A:" + optionA, "B:" + optionB, "C:" + optionC, "D:" + optionD],
        visible: true
      }));
    }
    option++;
  };

  const deleteOptions = (option) => {
    if (option == 1) {
      let indexToChange1 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
      let newData = questionData.options;
      newData[indexToChange1] = '\u00A0';

      setQuestionData(prevQuestionData => ({
        ...prevQuestionData,
        options: newData,
        visible: true
      }));
    }
    else if (option == 2) {
      let indexToChange1 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
      let indexToChange2 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
      while (indexToChange1 === indexToChange2) {
        indexToChange2 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
      }
      let newData = questionData.options;
      newData[indexToChange1] = '\u00A0';
      newData[indexToChange2] = '\u00A0';

      setQuestionData(prevQuestionData => ({
        ...prevQuestionData,
        options: newData,
        visible: true
      }));
    }
    else if (option == 3) {

      let indexToChange1 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
      let indexToChange2 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
      while (indexToChange1 === indexToChange2) {
        indexToChange2 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
      }
      let indexToChange3 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
      while (indexToChange1 === indexToChange3 || indexToChange2 === indexToChange3) {
        indexToChange3 = questionData.correct.trim() === "A" ? getRandomIndex(0) : questionData.correct.trim() === "B" ? getRandomIndex(1) : questionData.correct.trim() === "C" ? getRandomIndex(2) : getRandomIndex(3);
      }
      let newData = questionData.options;
      newData[indexToChange1] = '\u00A0';
      newData[indexToChange2] = '\u00A0';
      newData[indexToChange3] = '\u00A0';

      setQuestionData(prevQuestionData => ({
        ...prevQuestionData,
        options: newData,
        visible: true
      }));
    }
  }

  useEffect(() => {
    // Update local storage whenever questionData changes
    localStorage.setItem('questionData', JSON.stringify(questionData));
  }, [questionData]);

  const clearQuestion = () => {
    setSelectedOption(null);
    setSolved("no");
    option = 0;
    // Clear selected option from localStorage
    localStorage.removeItem('selectedOption');
    localStorage.setItem('currentQuestion', question);
    localStorage.setItem('solved', solved);

    setQuestionData({
      text: "",
      options: ['\u00A0', '\u00A0', '\u00A0', '\u00A0'],
      correct: "",
      visible: true,
      creator: "",
      level: 0
    });

    localStorage.setItem('questionData', JSON.stringify(questionData));
  };

  const resetGame = () => {
    setUsedQuestionIndices([]);
    setSelectedOption(null);
    question = 0;
    level = 1;
    option = 0;
    setSolved("no");
    setReroll("no");
    set50("no");
    setRoulette("no");
    setIA("no");
    // Clear selected option from localStorage
    localStorage.removeItem('selectedOption');
    localStorage.setItem('currentQuestion', question);
    localStorage.setItem('solved', solved);
    localStorage.setItem('reroll', usedReroll);
    localStorage.setItem('comodin50', used50);
    localStorage.setItem('roulette', usedRoulette);
    localStorage.setItem('ia', usedIa);

    setQuestionData({
      text: "",
      options: ['\u00A0', '\u00A0', '\u00A0', '\u00A0'],
      correct: "",
      visible: true,
      creator: "",
      level: 0
    });

    localStorage.setItem('questionData', JSON.stringify(questionData));
  };

  // Check localStorage for selected option on component mount
  useEffect(() => {
    const storedOption = localStorage.getItem('selectedOption');
    const storedQuestion = localStorage.getItem('currentQuestion');
    const storedData = localStorage.getItem('questionData'); // Get the stored question data
    const solvedData = localStorage.getItem('solved'); // Get the stored question data
    const rerollData = localStorage.getItem('reroll');

    if (storedOption) {
      setSelectedOption(storedOption);
    }
    if (storedQuestion) {
      setCurrentQuestion(storedQuestion);
    }
    if (storedData) {
      setQuestionData(JSON.parse(storedData)); // Set the question data from localStorage
    }
    if (solvedData) {
      setSolved(solvedData);
    }
    if (rerollData) {
      setReroll(rerollData);
    }
  }, []);

  return (
    <GameContext.Provider value={{ currentQuestion, selectedOption, questionData, solved, used50, usedRoulette, visibleRoulette, usedIa, setIA, ia, setVisibleRoulette, deleteOptions, setRoulette, roulette, comodin50, set50, setSolved, selectOption, setQuestion, setCurrentQuestion, resetGame, showQuestion, setQuestionData, getQuestion, solveQuestion, clearQuestion, levelUp, reroll }}>
      {children}
    </GameContext.Provider>
  );
};