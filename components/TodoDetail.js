/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Modal
} from 'react-native';

import {blackColor, blueColor, greenColor, yellowColor, orangeColor, redColor} from './ColorConst'
import { updateTodo } from '../actions/action'
import { connect } from 'react-redux'

class TodoDetail extends Component {  
  constructor(props) {
    super(props)
    
    this.state = {
      animationType: props.animationType,
      modalVisible: props.modalVisible,
      transparent: props.transparent,
      id: props.todo.id,
      color: props.todo.color,
      text: props.todo.text
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>输入标题</Text>
      <TextInput
          multiline={false}
          onChangeText={(text) => {
            this.setState({text: text});
          }}
          style={styles.textInput}
          value={this.state.text}
          placeholder='请输入任务标题...'
          returnKeyType='done'
          ref='myInput'
        />
        <Text style={styles.colorText}>选择颜色</Text>
        <View style={styles.colorBgView}>
        {
        [blackColor,blueColor, greenColor, yellowColor, orangeColor, redColor].map((color,index) => {
          return (
            <TouchableHighlight key={color} style={{marginTop:10,borderColor: 'gray',borderWidth: color === this.state.color ? 4:0}} onPress={()=>{
                this.setState({
                  color: color
                })
            }}>
            <View style={{width:100,height:100,backgroundColor: color}}></View>
          </TouchableHighlight>
          )
        })
        }
        </View>
        <TouchableOpacity style={styles.saveTouchableOpacity} onPress={this.save.bind(this)}>
          <Text style={styles.saveText}>保存</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  save() {
    if (this.state.text === undefined || this.state.color === undefined) {
      Alert.alert(
        '请输入任务标题并选择颜色',
        null,
        [
          {text:'确定',onPress:() => {},style: 'cancel'}
        ]
      )
      return
    }
    
    const { dispatch } = this.props
    dispatch(updateTodo(this.state.id,this.state.text,this.state.color))
    this.props.navigator.pop()
  }
}

TodoDetail.propTypes = {
  onAddClick: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eeeeee'
  },
  titleText: {
    marginTop:80,
    marginLeft:10
  },
  textInput: {
    marginTop:20,
    marginLeft:10,
    marginRight:10,
    height:44,
    borderColor: 'rgba(220,220,220,1)',
    borderWidth:1
  },
  colorText:{
    marginTop: 20,
    marginLeft: 10
  },
  colorBgView: {
    marginTop: 10,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around'
  },
  saveTouchableOpacity: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(220,220,220,1)',
    marginLeft: 10,
    marginRight: 10
  },
  saveText: {
    color: 'blue',
    fontSize: 18,
    color: 'rgba(90,202,91,1)', 
  }
});

export default connect()(TodoDetail)
