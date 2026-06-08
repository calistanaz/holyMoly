import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Settings } from "lucide-react-native";
import { Link } from "expo-router";
import { useState } from "react";
import EditProfile from "@/components/EditProfile";
import { useTheme } from "@/context/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColors";

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

const initialProfile: Profile = {
  username: "Gojo",
  bio: "Half philosopher, half disaster",
  totalQuotes: 120,
  followers: 340,
  following: 180,
  currentStreak: 12,
  personalBest: 18,
  interests: ["Sleeping", "Eating", "Reading", "Gaming"],
  quotes: [
    "Yes, they're sharing a drink called loneliness. But it's better than drinking alone.",
    "Everyone believes in the world's greatest lie, even the person who lied.",
  ],
};

const Profile = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { toggleTheme, theme } = useTheme();
  const colors = useThemeColors();

  return (
    <>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-6 pb-10">
          <View className="flex-1 items-end">
            <Link href={"/settings"}>
              <Settings
                color={colors.iconPrimary}
                size={26}
                strokeWidth={1.5}
              />
            </Link>
          </View>

          <View className="items-center">
            <Image
              source={require("../assets/images/profile-pic/pfp-1.webp")}
              className="w-36 h-36 rounded-full border-4"
              style={{ borderColor: colors.borderPrimary }}
            />

            <Text
              className="text-4xl font-bold mt-6"
              style={{ color: colors.textPrimary }}
            >
              {profile.username}
            </Text>

            <Text
              className="text-lg italic mt-2"
              style={{ color: colors.textSecondary }}
            >
              {profile.bio}
            </Text>
          </View>

          <View
            className="flex-row justify-between gap-5 rounded-xl px-6 py-5 mt-10"
            style={{ backgroundColor: colors.cardSecondary }}
          >
            <View className="items-center flex-1">
              <Text style={{ color: colors.textPrimary }}>
                {profile.totalQuotes}
              </Text>
              <Text
                className="text-md mt-1"
                style={{ color: colors.textSecondary }}
              >
                Posts
              </Text>
            </View>

            <View
              className="w-[1px]"
              style={{ backgroundColor: colors.borderSecondary }}
            />

            <View className="items-center flex-1">
              <Text className="text-md" style={{ color: colors.textPrimary }}>
                {profile.followers}
              </Text>
              <Text
                className="text-md mt-1"
                style={{ color: colors.textSecondary }}
              >
                Followers
              </Text>
            </View>

            <View
              className="w-[1px]"
              style={{ backgroundColor: colors.borderSecondary }}
            />

            <View className="items-center flex-1">
              {/* ✅ Fix: was hardcoded text-[#F4F1FF] */}
              <Text className="text-md" style={{ color: colors.textPrimary }}>
                {profile.following}
              </Text>
              <Text
                className="text-md mt-1"
                style={{ color: colors.textSecondary }}
              >
                Following
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setShowEditProfile(true)}
            className="rounded-full py-4 mt-8"
            style={{ backgroundColor: colors.accent }}
          >
            <Text
              className="text-center text-md font-semibold"
              style={{ color: colors.textPrimary }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          <View
            className="rounded-xl p-6 mt-10 overflow-hidden"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.borderSecondary,
            }}
          >
            <View
              className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl"
              style={{ backgroundColor: colors.borderPrimary + "33" }}
            />
            <View
              className="absolute -bottom-5 -right-5 w-32 h-32 rounded-full blur-3xl"
              style={{ backgroundColor: colors.accent + "1A" }}
            />
            <View className="absolute inset-0 bg-white/5 backdrop-blur-xl" />

            <Text
              className="text-xl font-semibold mb-6"
              style={{ color: colors.textPrimary }}
            >
              Stats
              <Text className="text-sm" style={{ color: colors.textSecondary }}>
                {" "}
                (in days)
              </Text>
            </Text>

            <View className="flex-row justify-around items-center">
              <View className="items-center">
                <View
                  className="w-24 h-24 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.borderSecondary,
                  }}
                >
                  <View
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: colors.borderPrimary + "33" }}
                  />
                  <Text
                    className="text-3xl font-bold"
                    style={{ color: colors.textPrimary }}
                  >
                    {profile.currentStreak}
                  </Text>
                </View>
                <Text
                  className="text-base font-semibold mt-3"
                  style={{ color: colors.textPrimary }}
                >
                  Current
                </Text>
              </View>

              <View
                className="w-[1px] h-24"
                style={{ backgroundColor: colors.borderSecondary }}
              />

              <View className="items-center">
                <View
                  className="w-24 h-24 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.borderSecondary,
                  }}
                >
                  <View
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: colors.accent + "1A" }}
                  />
                  <Text
                    className="text-3xl font-bold"
                    style={{ color: colors.textPrimary }}
                  >
                    {profile.personalBest}
                  </Text>
                </View>
                <Text
                  className="text-base font-semibold mt-3"
                  style={{ color: colors.textPrimary }}
                >
                  Best
                </Text>
              </View>
            </View>
          </View>

          <View
            className="rounded-xl p-6 mt-10"
            style={{ backgroundColor: colors.cardSecondary }}
          >
            <Text
              className="text-xl font-semibold mb-6"
              style={{ color: colors.textPrimary }}
            >
              My Interests
            </Text>
            <View className="flex-row flex-wrap gap-4">
              {profile.interests.map((interest, index) => (
                <View
                  key={index}
                  className="px-6 py-2 rounded-full"
                  style={{
                    backgroundColor: colors.cardSecondary,
                    borderWidth: 1,
                    borderColor: colors.borderSecondary,
                  }}
                >
                  <Text
                    className="text-md"
                    style={{ color: colors.textPrimary }}
                  >
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View
            className="rounded-xl p-6 mt-10 overflow-hidden"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.borderSecondary,
            }}
          >
            <View className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
            <View className="flex-row justify-between items-center mb-6">
              <Text
                className="text-xl font-bold"
                style={{ color: colors.textPrimary }}
              >
                Community Posts
              </Text>

              <View
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.borderSecondary,
                }}
              >
                <Text className="text-sm" style={{ color: colors.accent }}>
                  {profile.quotes.length} Quotes
                </Text>
              </View>
            </View>

            {profile.quotes.map((quote, index) => (
              <View
                key={index}
                className="rounded-3xl p-5 mb-5 overflow-hidden"
                style={{
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.borderSecondary,
                }}
              >
                <View className="absolute inset-0 bg-white/5 backdrop-blur-lg" />

                <Text
                  className="text-3xl leading-none"
                  style={{ color: colors.accent }}
                >
                  "
                </Text>
                <Text
                  className="text-[15px] leading-7 italic"
                  style={{ color: colors.textPrimary }}
                >
                  {quote}
                </Text>

                <View className="flex-row items-center mt-5">
                  <View
                    className="flex-1 h-[1px]"
                    style={{ backgroundColor: colors.borderSecondary }}
                  />
                  <Text
                    className="text-xs mx-3"
                    style={{ color: colors.textSecondary }}
                  >
                    Quote #{index + 1}
                  </Text>
                  <View
                    className="flex-1 h-[1px]"
                    style={{ backgroundColor: colors.borderSecondary }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal visible={showEditProfile} animationType="slide">
        <View className="flex-1">
          <EditProfile
            profile={profile}
            onUpdateProfile={setProfile}
            onClose={() => setShowEditProfile(false)}
          />
        </View>
      </Modal>
    </>
  );
};

export default Profile;
