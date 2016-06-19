import React, { Component, } from 'react'
import { 
  View,
  AppRegistry,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
} from 'react-native'

import { connect,dispatch } from 'react-redux'
import TodoList from './TodoList'
import addTodo from '../actions/action'
import AddTodo from './AddTodo'

export default class App extends Component {

  static propTypes = {}

  static defaultProps = {}
  
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      store: props.store
    }
  }
  
  _renderScene(route,navigator) {
    let NaviComponent = route.component;
    
    return (
      <NaviComponent {...route.params} myStore={this.state.store} navigator={navigator}/>
    );
  }
  
  _renderNavBar() {
    const styles = {
      title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      titleText: {
        fontSize: 20, 
        color: '#444444', 
      },
      button: {
        flex: 1, 
        width: 50, 
        alignItems: 'center', 
        justifyContent: 'center',
      },
      buttonText: {
        fontSize: 18, 
        color: 'rgba(90,202,91,1)', 
        textAlign:'right'
      },
      navBar: {
          alignItems: 'center',
          backgroundColor: 'white',
          shadowOffset: {
              width: 1,
              height: 0.5,
          },
          shadowColor: '#000000',
          shadowOpacity: 0.2,          
      }
    }

    var routeMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableOpacity 
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Image source={require('../images/back.png')} style={{alignSelf: 'flex-start',marginLeft: 8}}></Image>
            </TouchableOpacity>
          );
        }
      },
      RightButton(route, navigator, index, navState) {
        if(route.rightButtonText !== null) {
          return  <TouchableOpacity 
              onPress={this.showNewPage.bind(this,navigator,route)}
              style={styles.button}>
              <Text style={styles.buttonText}>{route.rightButtonText}</Text>
            </TouchableOpacity>
        }
      },
      Title(route, navigator, index, navState) {
        return (
          <View style={styles.title}>
            <Text style={styles.titleText}>{route.title ? route.title : '任务列表'}</Text>
          </View>
        );
      },
      showNewPage(navigator,route) {
        if (route.rightButtonText === '添加') {
          navigator.push({
            title: '添加任务',
            component: AddTodo,
            params:{onAddClick: () => {console.log('保存')}},
        }) 
        }
      }
    };

    return (
      <Navigator.NavigationBar
        style={styles.navBar}
        routeMapper={routeMapper}
      />
    );
  }

  render() {
    return (
        <Navigator
          initialRoute={{component:TodoList,rightButtonText:'添加'}}
          renderScene={this._renderScene.bind(this)}
          navigationBar={this._renderNavBar()}
        />
    )
  }
}
