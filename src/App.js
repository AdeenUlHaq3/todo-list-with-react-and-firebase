import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import swal from 'sweetalert';

class App extends Component {
  constructor() {
    super();
    this.state ={
      text: '',
      todos: [],
      isUpdate: false
    }
    this.beforeEditTodo = this.beforeEditTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.onTodoAdded();
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  beforeEditTodo(key, title) {
    this.setState({
      text: title,
      isUpdate: true,
      keyForUpdate: key 
    })
  }

  onTodoAdded() {
    const { todos } = this.state;
    firebase.database().ref('todos')
      .on(`child_added`, (snapshot) => {
        todos.push(snapshot);
        this.setState({ todos });
      });
  }

  addTodo() {
    const { text } = this.state;
    firebase.database().ref(`todos`).push({
      title: text,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    })
    swal('Success', 'Todo Added');
    this.setState({ text: '' })
  }

  editTodo() {
    const { todos, keyForUpdate, text } = this.state;
    firebase.database().ref(`todos/${keyForUpdate}`).update({
      title: text
    })
    todos.map((todo, index) => {
      if(todo.key === keyForUpdate){
        
      }
    })
    swal('Success', 'Todo Updated');
    this.setState({ text: '' })
  }
  
  deleteTodo(key) {
    const { todos } = this.state;
    firebase.database().ref(`todos/${key}`).remove();
    todos.map((todo, index) => {
      if(todo.key === key){
        todos.splice(index, 1);
      }
    })
    swal('Success', 'Todo Deleted');
    this.setState({ todos })
  }

  render() {
    const { text, todos, isUpdate } = this.state;
    
    return (
      <div className="App">
        <h1>todoList</h1>
        <input className='form-control' placeholder='Todo' value={ text } onChange={ this.handleChange } />
        {
          isUpdate
          ?
          <input className='btn btn-danger' onClick={ this.editTodo } type='button' value='Update Todo'/>
          :
          <input className='btn btn-danger' onClick={ this.addTodo } type='button' value='Add Todo'/>
        }
        <ol>
          {
            todos.map(todo => 
            <li key={todo.key}>
              <span>{ todo.val().title }</span>
              <button className='fa fa-trash' onClick={ this.deleteTodo.bind(this, todo.key) }></button>
              <button className='fa fa-edit' onClick={ this.beforeEditTodo.bind(this, todo.key, todo.val().title) }></button>
            </li>)
          }
        </ol>
      </div>
    );
  }
}

export default App;
