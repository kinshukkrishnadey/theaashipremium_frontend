// src/components/CreateSubscription.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createSubscription } from '../services/createSubscriptionService';

const CreateSubscription = () => {
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState('');

  const subscriptionLevels = ['SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];

  const handleSubmit = async () => {
    if (!price || !level) {
      return Alert.alert('Price and Subscription Level are required');
    }

    const formData = new FormData();
    formData.append('name', level); // send level as 'name'
    formData.append('price', price);

    try {
      await createSubscription(formData);
      Alert.alert('Subscription Created!');
      setPrice('');
      setLevel('');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Create Subscription</Text>

      <TextInput
        placeholder="Price (₹)"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={level}
          onValueChange={(itemValue) => setLevel(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Subscription Level" value="" />
          {subscriptionLevels.map((lvl) => (
            <Picker.Item key={lvl} label={lvl} value={lvl} />
          ))}
        </Picker>
      </View>

      <Button title="Create Subscription" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: '100%',
  },
});

export default CreateSubscription;
