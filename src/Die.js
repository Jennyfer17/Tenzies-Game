
export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
      }
    return (
        <div style={styles} className="die" onClick={props.holdDice}>
            <h2>{props.value}</h2>
        </div>
        
    )
}