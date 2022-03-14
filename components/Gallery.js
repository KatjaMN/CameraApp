import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';



export default function Gallery() {


  //Flatgrid items
  //TEST: Photos from a local folder 
  const [items, setItems] = useState([
    { photo: require('../photos/kuva04.jpg') },
    { photo: require('../photos/kuva05.jpg') },
    { photo: require('../photos/kuva06.jpg') },
  ]);



  return (

    <View style={styles.container}>

      <Text>Something like this was supposed to come from the database (not sure if these photos are shown, since they are in the project folder). The colors are for temporary orientation with flexboxes.</Text>
      <FlatGrid
        itemDimension={100}
        data={items}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer]}>
            <Image style={styles.galleryphoto} source={item.photo} />
          </View>
        )}
      />
    </View>

  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

  galleryphoto: {
    width: '100%',
    height: '100%',
  },

  gridView: {
    marginTop: 5,
    flex: 1,
    backgroundColor: 'green'
  },

  itemContainer: {
    justifyContent: 'space-evenly',
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: 'red',
  },

});



