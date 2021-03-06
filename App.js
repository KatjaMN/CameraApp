import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraApp from './components/CameraApp';
import Gallery from './components/Gallery';
import ImagePickerKMN from './components/ImagePickerKMN'


const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === 'CameraApp') {
      iconName = 'md-camera',
        color = 'black';
    }
    else if (route.name === 'Gallery') {
      iconName = 'md-grid',
        color = 'black';
    }
    else if (route.name === 'Image Picker') {
      iconName = 'md-crop',
        color = 'black';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  }
});



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="CameraApp" component={CameraApp} />
        <Tab.Screen name="Gallery" component={Gallery} />
        <Tab.Screen name="Image Picker" component={ImagePickerKMN} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

