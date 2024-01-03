import React, { useState, useEffect } from 'react'
import './App.css'

const Header = () => {
  return (
    <header>
      <h1>What you have to do?</h1>
    </header>
  )
}

const InputField = ({ addTodo }) => {
  const [inputText, setInputText] = useState('')

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      addTodo(inputText)
      setInputText('')
    } else {
      alert('Laukelis tuščias')
    }
  }

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Write something here..."
        value={inputText}
        onChange={handleInputChange}
      />
      <button id="add" onClick={handleAddTodo}>
        <svg
          height="426.66667pt"
          viewBox="0 0 426.66667 426.66667"
          fill="white"
          width="426.66667pt"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
        </svg>
      </button>
    </div>
  )
}

const TodoList = ({ todoList, removeTodo }) => {
  return (
    <ul id="todo">
      {todoList.map((todo, index) => (
        <li key={index} className="list-item">
          <div className="text">{todo}</div>
          <button className="remove" onClick={() => removeTodo(index)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </li>
      ))}
    </ul>
  )
}

const App = () => {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    const updatedTodos = [...todos, text]
    setTodos(updatedTodos)
    addToLocalStorage(updatedTodos)
  }

  const removeTodo = (indexToRemove) => {
    const updatedTodos = todos.filter((todo, index) => index !== indexToRemove)
    setTodos(updatedTodos)
    addToLocalStorage(updatedTodos)
  }

  const addToLocalStorage = (todoList) => {
    localStorage.setItem('memory-list', JSON.stringify(todoList))
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('memory-list')) || []
    setTodos(storedTodos)
  }, [])

  return (
    <div className="App">
      <Header />
      <InputField addTodo={addTodo} />
      <TodoList todoList={todos} removeTodo={removeTodo} />
    </div>
  )
}

export default App

