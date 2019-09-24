import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  backBtn: { fontSize: 18, marginTop: 15, backgroundColor: '#78B7BB', borderRadius: 2, padding: 10, fontSize: 18 },
  backBtnInactive: { fontSize: 18, marginTop: 15, backgroundColor: '#eeeeee', borderRadius: 2, padding: 10, fontSize: 18 }
});

export const handleBackButton = () => true;

export const back = () => {
  return (
    <TouchableOpacity onPress={() => Actions.pop()}>
      <View style={styles.backBtn}>
        <Text>back to Login...</Text>
      </View>
    </TouchableOpacity>
  );
}

export const pageIncView = (handler, disabled) => {
  if (disabled) {
    return (
      <View style={styles.backBtnInactive}>
        <Text>page forward &gt;&gt;</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={handler}>
      <View style={styles.backBtn}>
        <Text>page forward &gt;&gt;</Text>
      </View>
    </TouchableOpacity>
  );
}
export const pageDecView = (handler, disabled) => {
  if (disabled) {
    return (
      <View style={styles.backBtnInactive}>
        <Text>&lt;&lt;page backward</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={handler}>
      <View style={styles.backBtn}>
        <Text>&lt;&lt;page backward</Text>
      </View>
    </TouchableOpacity>
  );
}
