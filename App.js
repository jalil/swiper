import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Deck from './src/Deck'
import { Card, Button } from 'react-native-elements'

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg'
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg'
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg'
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg'
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg'
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg'
  }
]

export default class App extends Component {
  renderCard (item) {
    return (
	<Card key={item.id}  title={item.text }  imageStyle={{width: 345}}  image={{uri: item.uri}}  >
	 <Text style={{marginBottom: 10 }}>  You </Text>
 	<Button icon={{name: 'code' }} backgroundColor="#03A9F4" title="View Now" />
	</Card>
	);
  }

renderNoMoreCards() {
return (
<Card title="All Done" > 
   <Text style={{marginBottom: 10}}>
	There is no more content!
   </Text>
    <Button backgroundColor="#03A9F"
	title="Get More"
	/>
</Card>
);
}
  render () {
    return (
      <ScrollView style={{flex: 1}} >
        <Deck data={DATA} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

 image: {
  }
})

