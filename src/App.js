import React, { Component } from 'react';
import Layout from './hoc/layout/Layout';
import Quiz from './containers/quiz/quiz.js';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import QuizList from './containers/quiz-list/quiz-list';
import Auth from './containers/auth/auth';
import QuizCreator from './containers/quiz-creator/quiz-creator';
import { connect } from 'react-redux';
import Logout from './components/logout/logout';
import { authLogin } from './store/actions/auth';

class App extends Component {

  componentDidMount() {
    this.props.authLogin() //если что-то хранится в сторадже то автоматически зайдем
  }

  render() {

    let routes = (
      <Switch>
          <Route path='/auth' component={Auth} />
          {/* <Route path='/quiz-creator' component={QuizCreator} /> */}
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/' exact component={QuizList} />
          <Redirect to='/'/>
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* <Route path='/auth' component={Auth} /> */}
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={QuizList} />
          <Redirect to='/'/>
        </Switch>
      )
    }

    return (
      <Layout className='bg-danger '>
        {routes}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToPrips(dispatch) {
  return {
    authLogin: () => dispatch(authLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToPrips)(App));