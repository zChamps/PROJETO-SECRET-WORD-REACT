import "./EndGame.css"

const EndGame = ({retry, score}) => {
  return (
    <div className="container-endgame">
      <h1>Fim de jogo!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>Resetar jogo</button>
    </div>
  )
}

export default EndGame