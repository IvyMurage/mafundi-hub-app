import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { BounceInUp, BounceOutUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const HandleExeception = ({ error, setErrors }: {
  error: string | string[], setErrors:
  React.Dispatch<React.SetStateAction<string | string[]>>
}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrors('' || []);
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup the timeout on unmount
  }, []);

  return (
    <>
      {visible &&
        <Animated.View entering={BounceInUp} exiting={BounceOutUp} style={{
          backgroundColor: Colors.lighter,
          padding: 20,
          margin: 20,
          borderRadius: 20,
          position: 'absolute',
          top: 0,
          width: '90%',
          marginHorizontal: 20,
          height: 100,
        }}>
          <View>
            <Ionicons name='close-circle-outline' color='red' size={20} style={{ alignSelf: 'flex-start' }} onPress={() => setVisible(false)} />
          </View>
          <View>
            {typeof error === 'object' && error.map(err => <Text style={style.text} key={err}>{err}</Text>)}
            {typeof error === 'string' && <Text style={style.text} >{error}</Text>}
          </View>
        </Animated.View>}
    </>
  );

};
const style = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'roboto',
    letterSpacing: 1.2,
    lineHeight: 20,
  }
})
export default HandleExeception;
