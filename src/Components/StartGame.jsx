import "./StartGame.css"


const StartGame = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar o jogo!</p>
        <form >
        <button onClick={startGame}>COMEÇAR JOGO</button>
        </form>
    </div>
  )
}

export default StartGame