import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CreateSubscription from '../components/CreateSubscription';
import UploadMedia from '../components/UploadMedia';

const SuperadminHomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CreateSubscription />
      <UploadMedia />
    </ScrollView>
  );
};

export default SuperadminHomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 30,
  },
});
