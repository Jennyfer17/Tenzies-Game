import {useState, useEffect} from 'react'
import Die from './Die';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  const diceElements = dice.map((die)=>
  {  
    return <Die 
    key={die.id} 
    value={die.value}
    isHeld={die.isHeld}
    holdDice={()=>holdDice(die.id)}
    />
  })

  function allNewDice() {
    const newArray = []
    for (let i=0; i<10; i++) {
      const randomNumber = Math.ceil(Math.random()*6)
      newArray.push({
        value: randomNumber,
        isHeld: false,
        id: nanoid()
      })
    }

    return newArray
  }

  function rollDice() {
    setDice(prevDice=> {
      return prevDice.map((die)=>{
        return die.isHeld ? 
        die :
         {...die, value: Math.ceil(Math.random()*6)}
      })
    })
  }

  function holdDice(id) {
    setDice(prevDice=>{
      return prevDice.map((die)=>{
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    })
   
  }

  useEffect(
    ()=>{
      const firstValue = dice[0].value
      const isAllHeld = dice.every((die)=>die.isHeld)
      const allSameValue = dice.every((die)=>die.value === firstValue)

      if (isAllHeld && allSameValue) {
        setTenzies(true)
        console.log("You won")
      }

      if (tenzies) {
        setDice(allNewDice)
        setTenzies(false)
        console.log("New Game")
      }


    },
    [dice]
  )

  return (
    <>
    {tenzies && <Confetti/>}
    <main>
      <h1>Tenzies</h1>
      <p>Roll until dice are the same. Click <br/>
      each die to freeze it at it's current value <br/>
      between rolls.</p>

      <div className="container">
       {diceElements}
      </div>
      <button onClick={rollDice}>
        <h2>{tenzies ? "New Game" : "Roll"}</h2>
      </button>
    </main>
    </>
  )
}

export default App;