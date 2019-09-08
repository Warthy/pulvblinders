import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
      <FontAwesome
          name={props.name}
          size={26}
          style={ props.style || { marginBottom: -3 }}
          color={Colors.tabIconSelected}
      />
  );
}
