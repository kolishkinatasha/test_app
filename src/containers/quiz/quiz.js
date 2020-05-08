//компонент окна с вопросами и ответами

import React, { Component } from 'react';
import './quiz.css';
import ActiveQuiz from '../active-quiz/active-quiz.js';
import FinishedQuiz from '../../components/finished-quiz/finished-quiz.js';
// import axios from 'axios';
import Loader from '../../components/UI/loader/loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends Component {
    // state = {
    //     results: {}, //{[id]: 'success' или 'error'}
    //     isFinished: false,
    //     activeQuestion: 0,
    //     answerState: null, // {[id]: 'success' или 'error'}   ключ - id и строка верно или неверно
    //     quiz: [],
    //     loading: true
    // }

    // onAnswerClickHandler = (answerId) => {

        // console.log('AnswerId: ',answerId);

        // const question = this.state.quiz[this.state.activeQuestion];
        // const results = this.state.results;
       
        // if (question.rightAnswerId === answerId) {

        //     if(!results[question.id]) { //если мы в первый раз нажали и правильно
        //         results[question.id] = 'success';
        //     }

        //     this.setState({
        //         answerState: {[answerId]: 'success'},
        //         results
        //     })

        //     const timeout = window.setTimeout(() => {
        //         if(this.isQuizFinished()) {
        //             console.log('finished');
        //             this.setState({
        //                 isFinished: true
        //             })

        //         } else {
        //             this.setState({
        //                 activeQuestion: this.state.activeQuestion + 1,
        //                 answerState: null
        //             })
        //         }

        //         window.clearTimeout(timeout)
        //     }, 500)

        // } else {
        //     results[question.id] = 'error';
        //     this.setState({
        //         answerState: {[answerId]: 'error'},
        //         results
        //     })
        // }
    // }



    // isQuizFinished() {
    //     return this.state.activeQuestion + 1 === this.state.quiz.length;
    // };

    // retryHandler = () => {
    //     this.setState({
    //         activeQuestion: 0,
    //         answerState: null,
    //         isFinished: false,
    //         results: {}
    //     })
    // }

    async componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)

        // try {
        //     const response = await axios.get(`https://react-quiz-8cf92.firebaseio.com/quizes/${this.props.match.params.id}.json`);
        //     const quiz = response.data;
        //     this.setState({
        //         quiz,
        //         loading: false
        //     })
        // } catch(e) {
        //     console.log(e)
        // }
        // console.log('Quiz id: ', this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz(); //ощичаем при выходе со страницы
    }

    render() {
        return (
            <div className='quiz'>
                <div className='quizWrapper'>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader/>
                        :   this.props.isFinished 
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.props.retryQuiz}
                            />
                            : <ActiveQuiz 
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion+1}
                            answerState={this.props.answerState} /> 
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results, 
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);


