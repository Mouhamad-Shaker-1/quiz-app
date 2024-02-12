import { useState, useEffect } from "react";
import {nanoid} from 'nanoid'
import Quetion from "./Quetion.jsx";

export default function Quiz() {

    const [quetions, setQuetions] = useState()

    const [check, setCheck] = useState(false)
    const [countAnswerCorrect, setCountAnswerCorrect] = useState(0)
    const [updateNewQuetions, setUpdateNewQuetions] = useState(false)

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(data => data.results)
            .then(data => {
                let array = []
                for (let i = 0; i < data.length; i++) {
                    let allAnswers = [...data[i].incorrect_answers, data[i].correct_answer]
                    allAnswers = allAnswers.map((answer, index) => {
                        if (index == 3) {
                            return {value: answer, answer: true, isHold: false, id: nanoid()}
                        } else {
                            return {value: answer, answer: false, isHold: false, id: nanoid()}
                        }
                    })
                    array.push({ ...data[i], allAnswers: allAnswers })
                }
                shuffleArray(array)
                setQuetions(array)
            })
    }, [updateNewQuetions])

    useEffect(() => {
        plusCount()
    }, [check])
    
    function plusCount() {
        if (check) {
            setCountAnswerCorrect(() => {
                let count = 0
                quetions.map(quetion => {
                    quetion.allAnswers.map(answer => {
                        if (answer.isHold && answer.answer) {
                            count++
                        }
                    })
                })
                return count
            })
        }        
    }

    
    function holdAnswer(id) {
        if (!check) {
            setQuetions(oldQuetions => {
                return oldQuetions.map(quetion => {
                    let allAnswers;
                    if (quetion.allAnswers.every(answer => answer.id != id)) {
                        allAnswers = quetion.allAnswers
                    } else {
                        allAnswers = quetion.allAnswers.map(answer => {
                            return answer.id == id ? {...answer, isHold: true} : {...answer, isHold: false}
                        })
                    }
                    return {...quetion, allAnswers: allAnswers}
                })
            })
        }
    }
    
    function checkQue() {
        let anwerAllAnswer = quetions.every(quetion => {
            return !quetion.allAnswers.every(answer => answer.isHold == false)
        })
        if (anwerAllAnswer) {    
            if (!check) {
                setCheck(true)
            } else {
                setCheck(false)
                // revom
                setUpdateNewQuetions(prevupdate => !prevupdate)
            }
        } else {
            alert("you have to answer all questions")
        }
    }

    const quetionsElements = quetions && quetions.map(quetion => {
        return (
            <Quetion
                key={quetion.correct_answer}
                check={check}
                holdAnswer={holdAnswer}
                quetion={quetion.question}
                allAnswers={quetion.allAnswers}
                correct_answer={quetion.correct_answer}
                incorrect_answers={quetion.incorrect_answers}
            />
        )
    })


    return (
        <div className='app'>
            <div className='questions'>
                {quetionsElements}
            </div>
            <div className='containerBtn'>
                {check && <p>You scored { countAnswerCorrect }/5 correct answers</p>}
            <button onClick={checkQue} className='btn'>{check ? 'try again' : 'Check answers'}</button>
            </div>
        </div>
    )
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}


    // const [quetions, setQuetions] = useState([
    //     {
    //         "type": "multiple",
    //         "difficulty": "hard",
    //         "category": "History",
    //         "question": "What year was the United States Declaration of Independence signed?",
    //         "correct_answer": "1776",
    //         "incorrect_answers": [
    //             "1775",
    //             "1774",
    //             "1777"
    //         ],
    //         "allAnswers": [
    //             {
    //                 "value": "1775",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "rAkPOFtDXb00gYxn2Vg9P"
    //             },
    //             {
    //                 "value": "1774",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "kwkpYa1YCitOXAfWa8-QJ"
    //             },
    //             {
    //                 "value": "1777",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "RM_ZUF2GIjfoZWKRn_RET"
    //             },
    //             {
    //                 "value": "1776",
    //                 "answer": true,
    //                 "isHold": false,
    //                 "id": "u4cW852lQKQoKgs1NB-4p"
    //             }
    //         ]
    //     },
    //     {
    //         "type": "multiple",
    //         "difficulty": "medium",
    //         "category": "Entertainment: Video Games",
    //         "question": "In the game Pok&eacute;mon Conquest, how many kingdoms make up the region of Ransei?",
    //         "correct_answer": "17",
    //         "incorrect_answers": [
    //             "18",
    //             "15",
    //             "16"
    //         ],
    //         "allAnswers": [
    //             {
    //                 "value": "18",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "AOWKHB3-Wi_z7LodaJYeJ"
    //             },
    //             {
    //                 "value": "15",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "eeOBpIAyl2nvgClCtmBKm"
    //             },
    //             {
    //                 "value": "16",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "9LwiVV_oplL46QCQfKX8X"
    //             },
    //             {
    //                 "value": "17",
    //                 "answer": true,
    //                 "isHold": false,
    //                 "id": "nzvaH3WOsQML3idZV_6va"
    //             }
    //         ]
    //     },
    //     {
    //         "type": "multiple",
    //         "difficulty": "medium",
    //         "category": "Entertainment: Japanese Anime &amp; Manga",
    //         "question": "In the &quot;Toaru Majutsu no Index&quot; anime, Touma Kamijou is a level 0 esper that has the ability to do what?",
    //         "correct_answer": "Dispell any esper or magical powers",
    //         "incorrect_answers": [
    //             "Teleport",
    //             "Make telepathic communications",
    //             "Create electricity from his own body"
    //         ],
    //         "allAnswers": [
    //             {
    //                 "value": "Teleport",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "h-foOp8NAnuF8hEON8-49"
    //             },
    //             {
    //                 "value": "Make telepathic communications",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "4_H0jz9wCLK-PT2HoOVRX"
    //             },
    //             {
    //                 "value": "Create electricity from his own body",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "UGqoy6MpcRZ67sBAkmKpO"
    //             },
    //             {
    //                 "value": "Dispell any esper or magical powers",
    //                 "answer": true,
    //                 "isHold": false,
    //                 "id": "tlhzxLLSvyWLUKIkztr5l"
    //             }
    //         ]
    //     },
    //     {
    //         "type": "multiple",
    //         "difficulty": "easy",
    //         "category": "Entertainment: Japanese Anime &amp; Manga",
    //         "question": "In &quot;The Melancholy of Haruhi Suzumiya&quot; series, the SOS Brigade club leader is unknowingly treated as a(n) __ by her peers.",
    //         "correct_answer": "God",
    //         "incorrect_answers": [
    //             "Alien",
    //             "Time Traveler",
    //             "Esper"
    //         ],
    //         "allAnswers": [
    //             {
    //                 "value": "Alien",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "uVBcnGuDKLYx6cRVcwH1V"
    //             },
    //             {
    //                 "value": "Time Traveler",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "-j1ZiIoRF9RAzlr7GGlvv"
    //             },
    //             {
    //                 "value": "Esper",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "smlsWSGL_k6ePt7XNwHcM"
    //             },
    //             {
    //                 "value": "God",
    //                 "answer": true,
    //                 "isHold": false,
    //                 "id": "9OiLk1J8j_ppmdjxh9Jsu"
    //             }
    //         ]
    //     },
    //     {
    //         "type": "multiple",
    //         "difficulty": "easy",
    //         "category": "Science &amp; Nature",
    //         "question": "Which type of rock is created by intense heat AND pressure?",
    //         "correct_answer": "Metamorphic",
    //         "incorrect_answers": [
    //             "Sedimentary",
    //             "Igneous",
    //             "Diamond"
    //         ],
    //         "allAnswers": [
    //             {
    //                 "value": "Sedimentary",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "H7S1uPzhkdngMJMWF-hEo"
    //             },
    //             {
    //                 "value": "Igneous",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "ZsyYSNt21Jn1w5rqPxVY_"
    //             },
    //             {
    //                 "value": "Diamond",
    //                 "answer": false,
    //                 "isHold": false,
    //                 "id": "Lw6wAEkqcMk2LYNXvI_DB"
    //             },
    //             {
    //                 "value": "Metamorphic",
    //                 "answer": true,
    //                 "isHold": false,
    //                 "id": "OyDG0c6Fk_cfyX4zMWOvn"
    //             }
    //         ]
    //     }
    // ])