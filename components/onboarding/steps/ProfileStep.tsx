import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface ProfileData {
  fullName: string;
  nickname: string;
  email: string;
  phone: string;
}

interface ProfileStepProps {
  data: ProfileData;
  onUpdate: (key: keyof ProfileData, value: string) => void;
}

export default function ProfileStep({ data, onUpdate }: ProfileStepProps) {
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>
          <Text style={styles.profileImageText}>👤</Text>
        </View>
        <TouchableOpacity style={styles.editImageButton}>
          <Text style={styles.editImageText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            value={data.fullName}
            onChangeText={(value) => onUpdate('fullName', value)}
            placeholder="Madison Smith"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nickname</Text>
          <TextInput
            style={styles.textInput}
            value={data.nickname}
            onChangeText={(value) => onUpdate('nickname', value)}
            placeholder="Madison"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={data.email}
            onChangeText={(value) => onUpdate('email', value)}
            placeholder="madisonsmith@example.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput
            style={styles.textInput}
            value={data.phone}
            onChangeText={(value) => onUpdate('phone', value)}
            placeholder="+123 567 89000"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImageText: {
    fontSize: 32,
  },
  editImageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#c4ff47',
  },
  editImageText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
    gap: 20,
  },
  inputGroup: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: '#444',
  },
}); 