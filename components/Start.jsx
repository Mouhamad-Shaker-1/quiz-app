
export default function Start(props) {

    return (
        <div className='start'>
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={props.turnStart}>Start quiz</button>
        </div>
    )
}