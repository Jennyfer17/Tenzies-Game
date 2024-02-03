import {useState, useEffect} from 'react'
import Die from './Die';
import {nanoid} from 'nanoid'

function App() {

  const [dice, setDice] = useState(allNewDice())

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
    setDice(allNewDice())
  }

  function holdDice(id) {
    setDice(prevDice=>{
      prevDice.map((die)=>{
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    })
    // dice.map(
    //   (die)=>{
    //     return die.id === id ? {...die, isHeld: !die.isHeld} : die
    //   }
    // )
  }
  console.log(dice)


  return (
    <main>
      <div className="container">
       {diceElements}
      </div>
      <button onClick={rollDice}>
        <h2>Roll</h2>
      </button>
    </main>
  )
}

export default App;