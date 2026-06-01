import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type PasswordVisibility = {
  old: boolean;
  new: boolean;
  confirm: boolean;
};

type PasswordFields = {
  old: string;
  new: string;
  confirm: string;
};

const EditProfileScreen: React.FC = () => {

  const [username, setUsername] = useState<string>('john_doe');
  const [profilePhoto, setProfilePhoto] = useState<string>('https://i.pravatar.cc/150?img=3');
  const [passwordModalVisible, setPasswordModalVisible] = useState<boolean>(false);
  const [passwords, setPasswords] = useState<PasswordFields>({ old: '', new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState<PasswordVisibility>({ old: false, new: false, confirm: false });
  const [passwordError, setPasswordError] = useState<string>('');

  const handlePickImage = async (): Promise<void> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Allow access to photos to change your profile picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(password)) return 'Must contain at least 1 uppercase letter.';
    if (!/[a-z]/.test(password)) return 'Must contain at least 1 lowercase letter.';
    if (!/[0-9]/.test(password)) return 'Must contain at least 1 number.';
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return 'Must contain at least 1 special character.';
    return null;
  };

  const handlePasswordChange = (): void => {
    if (!passwords.old) {
      setPasswordError('Please enter your current password.');
      return;
    }
    const validationError = validatePassword(passwords.new);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }
    if (passwords.old === passwords.new) {
      setPasswordError('New password must be different from old password.');
      return;
    }
    setPasswordError('');
    setPasswords({ old: '', new: '', confirm: '' });
    setPasswordModalVisible(false);
    Alert.alert('Success', 'Password changed successfully!');
  };

  const handleCloseModal = (): void => {
    setPasswordModalVisible(false);
    setPasswords({ old: '', new: '', confirm: '' });
    setPasswordError('');
    setShowPassword({ old: false, new: false, confirm: false });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.header}>Edit Profile</Text>

        <View style={styles.photoContainer}>
          <Image source={{ uri: profilePhoto }} style={styles.avatar} />
          <TouchableOpacity style={styles.changePhotoBtn} onPress={handlePickImage}>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter new username"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.passwordTriggerBtn}
          onPress={() => setPasswordModalVisible(true)}
        >
          <Text style={styles.passwordTriggerText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => Alert.alert('Saved', 'Profile updated successfully!')}
        >
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>

        <Modal
          visible={passwordModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>

              <Text style={styles.modalTitle}>Change Password</Text>

              {(['old', 'new', 'confirm'] as (keyof PasswordFields)[]).map((field) => (
                <View key={field} style={styles.passwordRow}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder={
                      field === 'old' ? 'Current Password' :
                      field === 'new' ? 'New Password' :
                      'Confirm New Password'
                    }
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword[field]}
                    value={passwords[field]}
                    onChangeText={(text: string) => {
                      setPasswords(prev => ({ ...prev, [field]: text }));
                      setPasswordError('');
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setShowPassword(prev => ({ ...prev, [field]: !prev[field] }))
                    }
                  >
                    <Text style={styles.eyeIcon}>{showPassword[field] ? '🙈' : '👁️'}</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <Text style={styles.hintText}>
                Min 6 chars · 1 uppercase · 1 lowercase · 1 number · 1 special character
              </Text>

              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}

              <View style={styles.modalBtnRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={handleCloseModal}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmBtn} onPress={handlePasswordChange}>
                  <Text style={styles.confirmBtnText}>Confirm</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 32,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#4F63E7',
    marginBottom: 12,
  },
  changePhotoBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#4F63E7',
  },
  changePhotoText: {
    color: '#4F63E7',
    fontSize: 14,
    fontWeight: '600',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
  },
  passwordTriggerBtn: {
    marginTop: 8,
    marginBottom: 28,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FF6B6B',
    alignItems: 'center',
  },
  passwordTriggerText: {
    color: '#FF6B6B',
    fontSize: 15,
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#4F63E7',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#4F63E7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
  },
  eyeIcon: {
    fontSize: 18,
    paddingLeft: 8,
  },
  hintText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  errorText: {
    fontSize: 13,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 4,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#CCC',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: '#4F63E7',
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default EditProfileScreen;