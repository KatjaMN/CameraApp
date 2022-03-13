import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const db = SQLite.openDatabase('imagedb.db');

export default function ImagePickerKMN() {

  //List variable for Database, updateGallery
  const [list, setList] = useState([]);

  const [image, setImage] = useState(null);

  //Image Picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };



  //Database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists imagegallery (id integer primary key not null, image text);');
    }, null, updateGallery)
  }, []);


  //Database
  //Picked image is saved to the gallery by inserting info into the database.
  const saveToGallery = () => {
    db.transaction(tx => {
      tx.executeSql('insert into imagegallery (image) values (?);',
        [image]);
    }, null, updateGallery);
    setImage('');
  }

  //Database
  //Update what is shown in the imagegallery.
  const updateGallery = () => {
    db.transaction(tx => {
      tx.executeSql('select * from imagegallery;', [], (_, { rows }) =>
        setList(rows._array)
      );
    });
  }


  //Flatgrid items
  const [items, setItems] = useState([
    { photo: require('../photos/kuva04.jpg') },
    { photo: require('../photos/kuva05.jpg') },
    { photo: require('../photos/kuva06.jpg') },
    { image: image }
  ]);

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Save to Gallery" onPress={saveToGallery} />

      <FlatGrid
        itemDimension={100}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer]}>
          
            <Text>{item.image}</Text>
          </View>
        )}
      />
    </View>
  );

};

//  <Image style={styles.galleryphoto} source={{ uri: item.image }} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: '50%',
    paddingTop: 20
  },

  galleryphoto: {
    width: '30%',
    height: '30%',
  },

  gridView: {
    marginTop: 10,
    flex: 1,
  },

  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },

  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },

  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});