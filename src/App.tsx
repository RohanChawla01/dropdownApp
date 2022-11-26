import React from 'react';
import {SafeAreaView} from 'react-native';
import {RegionSelectorScreen} from './screens/screens/RegionSelectorScreen/regionSelector';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <RegionSelectorScreen />
    </SafeAreaView>
  );
};

export default App;
