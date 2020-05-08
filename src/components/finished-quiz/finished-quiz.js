import React from 'react';
import './finihed-quiz.css';
import Button from '../UI/button/button.js';
import { Link } from 'react-router-dom';

const FinishedQuiz = props => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)

    return (
        <div className='finishedQuiz'>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                        const iconClass = ['fa', 
                        props.results[quizItem.id] === 'error' ? ' fa-times' : ' fa-check']
                        return(
                            <li key={index}>
                                <strong>{index+1}.</strong>&nbsp;
                                 {quizItem.question}
                                <i className={iconClass.join(' ')}/>
                            </li>
                        )
                    })
                }
            </ul>
            <p>Правильно {successCount} из {props.quiz.length}</p>

            <div>
                <Button 
                    onClick={props.onRetry} 
                    type='primary'
                >
                    Повторить
                </Button>
                <Link to='/'>
                    <Button 
                        type='success'
                    >
                        Перейти в список тестов
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz;