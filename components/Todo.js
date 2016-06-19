import React, { Component,PropTypes } from 'react'
import { 
  StyleSheet,
  View, 
  TouchableHighlight,
  Text
} from 'react-native'

export default class Todo extends Component {
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <TouchableHighlight style={styles.row} underlayColor='#C1DBF0' onPress={this.props.onClick} onLongPress={(this.props.onLongPress)}>
        <View style={styles.rowContent}>
          <View style={[styles.rowColor,{backgroundColor: this.props.color}]}></View>
          <Text style={styles.rowText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
      
      /**
          <Text style={{
          color: this.props.completed ? 'red' : 'black',
        }}>{this.props.text}</Text>
      */
    );
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
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
    width: 6,
    height: 44,
  },
  rowText: {
    marginLeft: 4
  }
});
