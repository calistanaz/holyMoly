import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
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
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColors";

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

type Profile = {
  username: string;
  bio: string;
  totalQuotes: number;
  followers: number;
  following: number;
  currentStreak: number;
  personalBest: number;
  interests: string[];
  quotes: string[];
};

type EditProfileProps = {
  profile: Profile;
  onUpdateProfile: React.Dispatch<React.SetStateAction<Profile>>;
  onClose: () => void;
};

const EditProfile: React.FC<EditProfileProps> = ({
  profile,
  onUpdateProfile,
  onClose,
}) => {
  const [profilePhoto, setProfilePhoto] = useState<string>(
    "https://i.pravatar.cc/150?img=3",
  );
  const [interestInput, setInterestInput] = useState("");
  const [passwordModalVisible, setPasswordModalVisible] =
    useState<boolean>(false);
  const [passwords, setPasswords] = useState<PasswordFields>({
    old: "",
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState<PasswordVisibility>({
    old: false,
    new: false,
    confirm: false,
  });
  const [passwordError, setPasswordError] = useState<string>("");
  const { toggleTheme, theme } = useTheme();
  const colors = useThemeColors();

  const addInterest = () => {
    const trimmed = interestInput.trim();

    if (!trimmed) return;

    if (profile.interests.includes(trimmed)) return;

    onUpdateProfile((prev) => ({
      ...prev,
      interests: [...prev.interests, trimmed],
    }));

    setInterestInput("");
  };

  const removeInterest = (interest: string) => {
    onUpdateProfile((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handlePickImage = async (): Promise<void> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Allow access to photos to change your profile picture.",
      );
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
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(password))
      return "Must contain at least 1 uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Must contain at least 1 lowercase letter.";
    if (!/[0-9]/.test(password)) return "Must contain at least 1 number.";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
      return "Must contain at least 1 special character.";
    return null;
  };

  const handlePasswordChange = (): void => {
    if (!passwords.old) {
      setPasswordError("Please enter your current password.");
      return;
    }
    const validationError = validatePassword(passwords.new);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
    if (passwords.old === passwords.new) {
      setPasswordError("New password must be different from old password.");
      return;
    }
    setPasswordError("");
    setPasswords({ old: "", new: "", confirm: "" });
    setPasswordModalVisible(false);
    Alert.alert("Success", "Password changed successfully!");
  };

  const handleCloseModal = (): void => {
    setPasswordModalVisible(false);
    setPasswords({ old: "", new: "", confirm: "" });
    setPasswordError("");
    setShowPassword({ old: false, new: false, confirm: false });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 60,
          paddingBottom: 40,
        }}
      >
        <View className="flex-row items-center mb-8">
          <TouchableOpacity
            onPress={onClose}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.borderSecondary,
            }}
          >
            <ArrowLeft size={20} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text
            className="text-[24px] font-bold ml-4"
            style={{ color: colors.textPrimary }}
          >
            Edit Profile
          </Text>
        </View>

        <View className="items-center mb-8">
          <Image
            source={{ uri: profilePhoto }}
            className="w-[110px] h-[110px] rounded-full border-[3px] mb-3"
            style={{ borderColor: colors.borderPrimary }}
          />

          <TouchableOpacity
            className="py-1.5 px-4 rounded-full"
            style={{
              borderWidth: 1.5,
              borderColor: colors.borderPrimary,
            }}
            onPress={handlePickImage}
          >
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.accent }}
            >
              Change Profile Photo
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mb-5">
          <Text
            className="text-[13px] font-semibold mb-1.5 uppercase tracking-[0.8px]"
            style={{ color: colors.textSecondary }}
          >
            Username
          </Text>

          <TextInput
            className="rounded-xl px-4 py-3 text-[15px]"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1.5,
              borderColor: colors.borderSecondary,
              color: colors.textPrimary,
            }}
            value={profile.username}
            onChangeText={(text) =>
              onUpdateProfile((prev) => ({
                ...prev,
                username: text,
              }))
            }
            placeholder="Enter new username"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
          />
        </View>

        <View className="mb-5">
          <Text
            className="text-[13px] font-semibold mb-1.5 uppercase tracking-[0.8px]"
            style={{ color: colors.textSecondary }}
          >
            Bio
          </Text>

          <TextInput
            multiline
            value={profile.bio}
            onChangeText={(text) =>
              onUpdateProfile((prev) => ({
                ...prev,
                bio: text,
              }))
            }
            placeholder="Tell people about yourself..."
            placeholderTextColor={colors.textSecondary}
            className="rounded-xl px-4 py-4 min-h-[100px]"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1.5,
              borderColor: colors.borderSecondary,
              color: colors.textPrimary,
              textAlignVertical: "top",
            }}
          />
        </View>

        <View className="mb-7">
          <Text
            className="text-[13px] font-semibold mb-3 uppercase tracking-[0.8px]"
            style={{ color: colors.textSecondary }}
          >
            Interests
          </Text>

          <View className="flex-row gap-2">
            <TextInput
              value={interestInput}
              onChangeText={setInterestInput}
              placeholder="Add interest"
              placeholderTextColor={colors.textSecondary}
              className="flex-1 rounded-xl px-4 py-3"
              style={{
                backgroundColor: colors.card,
                borderWidth: 1.5,
                borderColor: colors.borderSecondary,
                color: colors.textPrimary,
              }}
            />

            <TouchableOpacity
              onPress={addInterest}
              className="px-5 rounded-xl justify-center"
              style={{ backgroundColor: colors.accent }}
            >
              <Text
                className="font-semibold"
                style={{ color: colors.cardSecondary }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap gap-2 mt-4">
            {profile.interests.map((interest) => (
              <TouchableOpacity
                key={interest}
                onPress={() => removeInterest(interest)}
                className="px-4 py-2 rounded-full"
                style={{
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.borderSecondary,
                }}
              >
                <Text style={{ color: colors.textPrimary }}>{interest} ✕</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          className="mt-2 mb-7 py-3 rounded-xl items-center"
          style={{
            borderWidth: 1.5,
            borderColor: colors.textTertiary,
          }}
          onPress={() => setPasswordModalVisible(true)}
        >
          <Text
            className="text-[15px] font-semibold"
            style={{ color: colors.textTertiary }}
          >
            Change Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-4 rounded-[14px] items-center"
          style={{ backgroundColor: colors.accent }}
          onPress={() => {
            Alert.alert("Success", "Profile updated successfully!");
            onClose();
          }}
        >
          <Text
            className="text-base font-bold tracking-[0.5px]"
            style={{ color: colors.cardSecondary }}
          >
            Save Changes
          </Text>
        </TouchableOpacity>

        <Modal
          visible={passwordModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View className="flex-1 bg-black/50 justify-center items-center px-6">
            <View
              className="w-full rounded-[20px] p-6"
              style={{ backgroundColor: colors.cardSecondary }}
            >
              <Text
                className="text-xl font-bold mb-5 text-center"
                style={{ color: colors.textPrimary }}
              >
                Change Password
              </Text>

              {(["old", "new", "confirm"] as (keyof PasswordFields)[]).map(
                (field) => (
                  <View
                    key={field}
                    className="flex-row items-center rounded-xl px-3.5 mb-3.5"
                    style={{
                      backgroundColor: colors.card,
                      borderWidth: 1.5,
                      borderColor: colors.borderSecondary,
                    }}
                  >
                    <TextInput
                      className="flex-1 py-3 text-[15px]"
                      style={{ color: colors.textPrimary }}
                      placeholder={
                        field === "old"
                          ? "Current Password"
                          : field === "new"
                            ? "New Password"
                            : "Confirm New Password"
                      }
                      placeholderTextColor={colors.textSecondary}
                      secureTextEntry={!showPassword[field]}
                      value={passwords[field]}
                      onChangeText={(text: string) => {
                        setPasswords((prev) => ({ ...prev, [field]: text }));
                        setPasswordError("");
                      }}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          [field]: !prev[field],
                        }))
                      }
                    >
                      <Text className="text-lg pl-2">
                        {showPassword[field] ? "🙈" : "👁️"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ),
              )}

              <Text
                className="text-[11px] text-center mb-2 leading-4"
                style={{ color: colors.textSecondary }}
              >
                Min 6 chars · 1 uppercase · 1 lowercase · 1 number · 1 special
                character
              </Text>

              {passwordError ? (
                <Text
                  className="text-[13px] text-center mb-3 font-medium"
                  style={{ color: colors.textTertiary }}
                >
                  {passwordError}
                </Text>
              ) : null}

              <View className="flex-row justify-between gap-3 mt-1">
                <TouchableOpacity
                  className="flex-1 py-3 rounded-xl items-center"
                  style={{
                    borderWidth: 1.5,
                    borderColor: colors.borderSecondary,
                  }}
                  onPress={handleCloseModal}
                >
                  <Text
                    className="text-[15px] font-semibold"
                    style={{ color: colors.textSecondary }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 py-3 rounded-xl items-center"
                  style={{ backgroundColor: colors.accent }}
                  onPress={handlePasswordChange}
                >
                  <Text
                    className="text-[15px] font-bold"
                    style={{ color: colors.cardSecondary }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
