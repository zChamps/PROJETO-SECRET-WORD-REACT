import './App.css';
import { useState, useCallback, useEffect } from 'react';
import StartGame from "./Components/StartGame"
import MidGame from './Components/MidGame';
import EndGame from "./Components/EndGame"
import { wordsList } from "./data/words"

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {

  const [gamestage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategorie] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [guesses, setGuesses] = useState(5);
  const [wrongLetters, setWrongLetters] = useState([])
  // console.log(wrongLetters)
  const [score, setScore] = useState(0)
  
  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    // console.log(category, word);

    return { category, word };
  }, [words]);
  
  const startGame = useCallback(() => {
    clearLetterStates()
    
    const { word, category } = pickWordAndCategory()
    // console.log(word, category)

    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    // console.log(wordLetters)
    
    setPickedWord(word)
    setPickedCategorie(category)
    setLetters(wordLetters)
    
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])
  
  
  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toString().toLowerCase();
    
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }
    
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else if (typeof normalizedLetter === 'string' && normalizedLetter.length === 1) {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
        
      ])
      
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
    
  }
  
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }
  
  
  useEffect(() => {
    if (guesses <= 0){
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])
  
  
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    
    if(guessedLetters.length === uniqueLetters.length && gamestage === stages[1].name){
      setScore((actualScore) => (actualScore += 100))
      
      startGame()
    }
  }, [guessedLetters, letters, startGame])
  
  const retry = () => {
    setScore(0)
    setGuesses(5)
    setGameStage(stages[0].name)
  }
  
  return (
    <div className="App">
      {gamestage === "start" && <StartGame startGame={startGame} />}
      {gamestage === "game" && <MidGame
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        score={score} 
        guesses={guesses}
        />}
        {}
      {gamestage === "end" && <EndGame retry={retry} score={score} />}

    </div>
  );
}

export default App;
