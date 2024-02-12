
import Answer from "./Answer.jsx"

export default function Quetion(props) {

    

    const answers = props.allAnswers.map(answer => {
        return <Answer
            holdAnswer={() => props.holdAnswer(answer.id)}
            check={props.check}
            key={answer.id}
            answer={answer}
        />
    })



    return (
        <div className='quetion'>
            <h3>{ props.quetion }</h3>
            <ul>
                {answers}
            </ul>
            <hr></hr>
        </div>
    )
}