import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../constants/colors';
import {styles} from './section.style';

interface Props {
  title: string;
}

export const Section: React.FC<Props> = ({children, title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: colors.black,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
