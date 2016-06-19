import React, { Component, } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import todos from './reducers/todos'

let store = createStore(todos)

class HomePage extends Component {
  render() {
    return (
    <Provider store={store}>
      <App store={store}/>
    </Provider>
  );
  }
}

AppRegistry.registerComponent('ToDoList',() => HomePage);