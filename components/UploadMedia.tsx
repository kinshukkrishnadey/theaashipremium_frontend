// UploadMedia.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, Alert, StyleSheet, Image, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Video from 'react-native-video';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { uploadMediaToServer } from '../services/mediaUploadService';

const UploadMedia = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [accessLevel, setAccessLevel] = useState<'INDIVIDUAL' | 'SUBSCRIPTION' | 'PUBLIC'>('INDIVIDUAL');
  const [file, setFile] = useState<Asset | null>(null);

  const userId = 3; // 🔒 Replace with actual authenticated user ID

  const pickFile = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 1,
      });

      if (res.didCancel) return;
      if (res.errorCode) throw new Error(res.errorMessage);

      if (res.assets && res.assets.length > 0) {
        setFile(res.assets[0]);
      }
    } catch (err: any) {
      console.error('ImagePicker Error:', err);
      Alert.alert('Error', err?.message || 'Failed to pick media');
    }
  };

  const handleUpload = async () => {
    if (!title || !desc || !price || !file) {
      Alert.alert('All fields required');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('file', {
      uri: Platform.OS === 'android' ? file.uri! : file.uri!.replace('file://', ''),
      type: file.type,
      name: file.fileName ?? 'media',
    } as any);
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('price', price);
    formData.append('accessLevel', accessLevel);

    try {
      const res = await uploadMediaToServer(formData);
      Alert.alert('Upload success', `Media ID: ${res.mediaId}`);
      setTitle('');
      setDesc('');
      setPrice('');
      setFile(null);
    } catch (e: any) {
      Alert.alert('Upload failed', e.message);
    }
  };

  const renderPreview = () => {
    if (!file) return null;
    const isImage = file.type?.startsWith('image/');
    const isVideo = file.type?.startsWith('video/');

    return (
      <View style={styles.previewContainer}>
        {isImage && (
          <Image source={{ uri: file.uri }} style={styles.previewImage} resizeMode="cover" />
        )}
        {isVideo && (
          <Video
            source={{ uri: file.uri }}
            style={styles.previewVideo}
            controls
            resizeMode="contain"
            paused
          />
        )}
        <Text style={styles.previewName}>{file.fileName}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Media</Text>

      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Description" style={styles.input} multiline value={desc} onChangeText={setDesc} />
      <TextInput placeholder="Price (₹)" style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice} />

      <Text style={styles.label}>Access Level</Text>
      <Picker
        selectedValue={accessLevel}
        onValueChange={(val) => setAccessLevel(val)}
        style={styles.picker}
      >
        <Picker.Item label="Individual" value="INDIVIDUAL" />
        <Picker.Item label="Subscription" value="SUBSCRIPTION" />
        <Picker.Item label="Public" value="PUBLIC" />
      </Picker>

      <Button title="Pick File" onPress={pickFile} />
      {renderPreview()}

      <Button title="Upload" onPress={handleUpload} />
    </View>
  );
};

export default UploadMedia;

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 20 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, height: 40 },
  label: { fontWeight: '600', marginBottom: 4 },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f3f3f3',
  },
  previewContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  previewVideo: {
    width: 300,
    height: 200,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  previewName: {
    marginTop: 8,
    fontSize: 14,
  },
});
