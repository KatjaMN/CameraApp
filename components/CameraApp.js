import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { FlatGrid } from 'react-native-super-grid';


const db = SQLite.openDatabase('photodb.db');


export default function CameraApp() {

  const [hasCameraPermission, setPermission] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');

  const camera = useRef(null);

  //List variable for Database, updateGallery
  const [list, setList] = useState([]);


  //Camera
  useEffect(() => {
    askCameraPermission();
  }, []);

  const askCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermission(status == 'granted');
  }

  //Camera  
  //Take a photo and set photo name and Base64 encoded information. Both as string.
  const snap = async () => {
    if (camera) {
      const photo = await camera.current.takePictureAsync({ base64: true });
      setPhotoName(photo.uri);
      setPhotoBase64(photo.base64);
    }
  };


  //Database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists photogallery (id integer primary key not null, photoname text, photobase64 text);');
    }, null, updateGallery)
  }, []);


  //Database
  //Photo taken with the CameraApp is saved to the gallery by inserting info into the database.
  const saveToGallery = () => {
    db.transaction(tx => {
      tx.executeSql('insert into photogallery (photoname, photobase64) values (?, ?);',
        [photoName, photoBase64]);
    }, null, updateGallery);
    setPhotoName('');
    setPhotoBase64('');
  }

  //Database
  //Update what is shown in the photogallery.
  const updateGallery = () => {
    db.transaction(tx => {
      tx.executeSql('select * from photogallery;', [photoBase64], (_, { rows }) =>
        setList(rows._array)
      );
    });
  }



  //Flatgrid items
  const [items, setItems] = useState([
    { info: 'Flatgrid here' },
    { info: 'Flatgrid here' },
    { info: 'Flatgrid here' }
  ]);

  //Items, that don't work:

  // { photo: require({ uri: photo }) },
  // { info: list.photoBase64 },


  return (
    <View style={{ flex: 1 }}>
      {hasCameraPermission ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Camera style={styles.camera} ref={camera} />
            <View style={styles.button}>
              <Button title="Take Photo" onPress={snap} />
            </View>
          </View>
          <View style={{ flex: 4 }}>
            <Image style={{ flex: 1 }} source={{ uri: `data:image/jpg;base64,${photoBase64}` }} />
          </View>
          <View style={styles.button2}>
            <Button title="Save photo to Gallery" onPress={saveToGallery} />

          </View>
        </View>
      ) : (
        <Text>No access to camera</Text>
      )}
      <FlatGrid
        itemDimension={100}
        data={items}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer]}>
            <Text style={styles.itemName}>{item.info}</Text>
          </View>
        )}
      />
    </View>
  );
};

//<Image style={ styles.galleryphoto } source={{ uri: `data:image/jpg;base64,${photoBase64}` }} />


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  camera: {
    flex: 1,
    width: '100%',
    paddingTop: 120
  },

  button: {
    width: '50%',
    height: 100,
    paddingTop: 20
  },

  button2: {
    width: '50%',
    paddingTop: 100
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
    color: '#000',
    fontWeight: '600',
  }

});
