
export default function Answer(props) {

    function style() {
        let style;
        if (props.check) {
            if (props.answer.isHold && !props.answer.answer) {
                style = {
                    background: "#F8BCBC",
                    border: 'none'
                }                
            } else if (props.answer.answer) {
                style = {
                    background: '#94D7A2',
                    border: 'none'
                }
            }         
        } else {
            if (props.answer.isHold) {
                style = {
                    background: "#D6DBF5",
                    border: 'none'
                }                
            }
        }
        return style
    }

    return (
        <li
            style={style()}
            onClick={props.holdAnswer}>
            {props.answer.value}
        </li>
    )
}