// screens/UserHomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, User!</Text>
    </View>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22 },
});
