import "./MidGame.css"
import { useState, useRef } from "react";


const MidGame = ({
  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score, }) => {

    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)



    const handleSubmit = (e) => {
      e.preventDefault()

      verifyLetter(letter)
      

      setLetter("")

      letterInputRef.current.focus()
    }



  return (
    <div className="container-midgame">
      <p>Pontuação: <span>{score}</span></p>

      <h1>Adivinhe a palavra:</h1>
      <h3>Dica sobre a palavra: <span>{pickedCategory}</span></h3>
      <p>Você ainda tem <span style={{ fontWeight: "bold", fontSize: "20px", }}>{guesses}</span> tentativa(s).</p>


      <div className='wordContainer'>
        {letters.map((letter, i) => (
          Array.isArray(guessedLetters) && guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>


      <div className="container-baixo">
        <p>Tente adivinhar uma letra da palavra</p>
        <div>
          <form onSubmit={handleSubmit}>
            <input required maxLength="1" type="text" onChange={e => {
              setLetter(e.target.value)}} value={letter} ref={letterInputRef} />
            <input onClick={verifyLetter} type="submit" value="Jogar!" />
          </form>

          <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {guessedLetters.filter(letter => typeof letter === 'string').map((letter, i) => (
          <span key={i}>{letter}, </span>
          
        ))}
        
      </div>
        </div>
      </div>
    </div>
  )
}

export default MidGame