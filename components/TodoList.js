import React, { Component, PropTypes } from 'react'
import { View,StyleSheet,ListView,TouchableHighlight,Text,Alert } from 'react-native'
import AddTodo from './AddTodo'
import TodoDetail from './TodoDetail'
import Todo from './Todo'
import { blackColor, blueColor,greenColor,yellowColor,orangeColor,redColor } from './ColorConst'
import { connect, dispatch } from 'react-redux'
import { addTodo, deleteTodo } from '../actions/action'

class TodoList extends Component {
  static propTypes = {}

  static defaultProps = {
    onTodoClick: PropTypes.func.isRequired
  }

  constructor(props) {      
    super(props)    
  }

  render() {
    return (
       <ListView   
         style={styles.container}
         dataSource={this.props.todos} 
         renderRow={(todo) => this.renderRow(todo)}
         enableEmptySections = {true}>
      </ListView>
    );
  }

  renderRow(todo) {
    return (
      <Todo {...todo} onClick={this.showDetailPage.bind(this,todo)} onLongPress={this.longPress.bind(this,todo)}></Todo>
    );
  }
  
  showDetailPage(todo) {
    this.props.navigator.push({
      title: '任务详情',
      component: TodoDetail,
      params:{onAddClick: () => {console.log('保存')},todo: todo},
    }) 
  }
  
  longPress(todo){
    const {dispatch} = this.props
    Alert.alert(
      '是否删除此条任务？',
      todo.text,
      [
        {text:'取消',onPress:() => {},style: 'cancel'},
        {text:'删除',onPress:() => dispatch(deleteTodo(todo.id))},
      ]
    )
  }
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    backgroundColor: '#eeeeee',
  },
  row: {
    marginTop: 10,
    height: 44,
    backgroundColor: 'white',
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowColor: {
    backgroundColor: 'red',
    width: 4,
    height: 44,
  },
  rowText: {
    marginLeft: 4
  }
});

function select(state) {
  const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
  return {
    todos: ds.cloneWithRows(state)
  };
}

export default connect(select)(TodoList);