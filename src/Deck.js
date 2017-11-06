import React, { Component } from 'react'
import { Dimensions, PanResponder, View, Animated } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class Deck extends Component {
  constructor (props) {
    super(props)

    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      // when user taps on screen react to it
      onStartShouldSetPanResponder: () => true,
      // when user drags fingers around the screen
      // event==is what touched
      // gesture==info on what exactly is doing with their finger
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dy, y: gesture.dy })
      },
      // when user releases finger on the screen
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left')
        } else {
          this.resetPosition()
        }
      }
    })

    this.state = { panResponder, position }
  }

  forceSwipe (direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    // Moved it directly to position without animation
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start()
  }
  forceSwipeLeft () {
    // Moved it directly to position without animation
    Animated.timing(this.state.position, {
      toValue: { x: 0, y: SCREEN_WIDTH },
      duration: SWIPE_OUT_DURATION
    }).start()
  }

  resetPosition () {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start()
  }
  getCardStyle () {
    const { position } = this.state
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
      ...this.state.position.getLayout(),
      transform: [{ rotate }]
    }
  }
  renderCards () {
    return this.props.data.map((item, index) => {
      if (index == 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }
      return this.props.renderCard(item)
    })
  }
  render () {
    return (
      <View>
        {this.renderCards()}
      </View>
    )
  }
}

export default Deck
