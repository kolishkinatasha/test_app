import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import './quiz-list.css'
import {fetchQuizes} from "../../store/actions/quiz";
import Loader from "../../components/UI/loader/loader.js";
// import axios from 'axios';
import { connect } from "react-redux";

class QuizList extends Component {

    // state = {
    //     quizes: [],
    //     loading: true
    // }

    renderQuizes = () => {
        return this.props.quizes.map((quiz) => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
    //     try {
    //         const response = await axios.get('https://react-quiz-8cf92.firebaseio.com/quizes.json')
    //         const quizes =[];
    //         Object.keys(response.data).forEach((key, index) => {
    //             quizes.push({
    //                 id:key,
    //                 name: `Тест №${index+1}`
    //             })
    //         })

    //         this.setState({
    //             quizes,
    //             loading: false
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    }

    render() {
        return(
            <div className='quizList'>
                <div>
                    <h1>Список тестов</h1>

                    {
                        this.props.loading && this.props.lenght !== 0
                        ? <Loader/>
                        : <ul>
                            {this.renderQuizes()}
                        </ul>
                    }

                </div>
                 
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispetchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispetchToProps)(QuizList);