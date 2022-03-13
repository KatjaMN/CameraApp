import React, { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const db = SQLite.openDatabase('photodb.db');

export default function Gallery() {

  const [gallery, setGallery] = useState([]);
  
  useEffect( () => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists photogallery (id integer primary key not null, photoname text, photobase64 text);');
    }, null, updateGallery)
}, []);

//Update what is shown in the photogallery
const updateGallery = () => {
  db.transaction(tx => {
      tx.executeSql('select * from photogallery;', [], (_, { rows }) =>
      setGallery(rows._array)
      );
  });
}

// { name: 'TURQUOISE', code: '#1abc9c' },

const [items, setItems] = React.useState([
  { name: '', photo: source={ uri: `data:image/gif;base64,${photoBase64}`} }
  ]);




  return (
    <FlatGrid
      itemDimension={100}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Image source={item.photo} />
        </View>
      )}
    />
  );
}

//<Image source={require('../photos/kuva05.jpg')} />

const styles = StyleSheet.create({
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

