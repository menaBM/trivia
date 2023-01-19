import React, { Component } from 'react';
import { Question } from './components';
import { categories } from './lib';

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      question: null,
      category: '',
    }
  }

  componentDidMount(){
    let TRIVIA_API = `https://opentdb.com/api.php?amount=10&category=${this.state.category}&difficulty=easy`
    fetch(TRIVIA_API)
    .then(response => response.json())
    .then(data => {this.setState({question: data.results})})
    .catch(error => console.log(error))
  }

  componentDidUpdate(prevProps, prevState){
    let TRIVIA_API = `https://opentdb.com/api.php?amount=10&category=${this.state.category}&difficulty=easy`
    if (this.state.category !== prevState.category){
      fetch(TRIVIA_API)
      .then(response => response.json())
      .then(data => {this.setState({question: data.results})})
      .catch(error => console.log(error))
    }
  }

  render() {
    return (
      <div className='container l:w-50 p-5'>
        <h1 className='display-1'>Trivia</h1>
        <h2 className='fw-lighter fs-5 mb-4'>
          (we couldn&lsquo;t think of a better name,{' '}
          <span className='fw-bolder'>sorry</span>)
        </h2>
        <select onChange={(e) => this.setState({category : e.target.value})} >
          {categories.map((category) => {
            return (
              
            <option key={category.id} value={category.id}>{category.value}</option>
            )
          })}
        </select>
        <hr />
        <div>
          {/* Render question here */}
          {this.state.question && 
            // console.log(this.state.question)
            this.state.question.map(question => {
              return <Question question={question}/>
            })
            }
        </div>
      </div>
    );
  }
}

export { App };
