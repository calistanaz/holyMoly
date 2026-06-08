import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColors";

import {
  ArrowBigUp,
  ArrowBigDown,
  Flame,
  Clock3,
  Plus,
} from "lucide-react-native";

type VoteType = "up" | "down" | null;

type Post = {
  id: string;
  username: string;
  text: string;
  votes: number;
  userVote: VoteType;
  createdAt: number;
};

const starterPosts: Post[] = [
  {
    id: "1",
    username: "Balaji",
    text: "Discipline will take you places motivation never could.",
    votes: 124,
    userVote: null,
    createdAt: Date.now() - 1000,
  },
  {
    id: "2",
    username: "bala",
    text: "You don't need more time. You need less distraction.",
    votes: 89,
    userVote: null,
    createdAt: Date.now() - 2000,
  },
  {
    id: "3",
    username: "iONE",
    text: "Consistency beats intensity every single time.",
    votes: 52,
    userVote: null,
    createdAt: Date.now() - 3000,
  },
];

const Community = () => {
  const [tab, setTab] = useState<"trending" | "recent">("trending");
  const [posts, setPosts] = useState<Post[]>(starterPosts);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  const { toggleTheme, theme } = useTheme();
  const colors = useThemeColors();

  const sortedPosts = useMemo(() => {
    if (tab === "trending") {
      return [...posts].sort((a, b) => b.votes - a.votes);
    }
    return [...posts].sort((a, b) => b.createdAt - a.createdAt);
  }, [posts, tab]);

  const vote = (id: string, type: VoteType) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        let votes = p.votes;
        let userVote: VoteType = p.userVote;

        if (p.userVote === type) {
          votes += type === "up" ? -1 : 1;
          userVote = null;
        } else if (p.userVote !== null) {
          votes += type === "up" ? 2 : -2;
          userVote = type;
        } else {
          votes += type === "up" ? 1 : -1;
          userVote = type;
        }

        return { ...p, votes, userVote };
      }),
    );
  };

  const createPost = () => {
    if (!input.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      username: "demo",
      text: input.trim(),
      votes: 0,
      userVote: null,
      createdAt: Date.now(),
    };

    setPosts((prev) => [newPost, ...prev]);
    setInput("");
    setShowInput(false);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <View className="px-6 pb-6 pt-4">
          <Text
            style={{ color: colors.textPrimary }}
            className="text-3xl font-bold"
          >
            Community
          </Text>
          <Text style={{ color: colors.textSecondary }} className="text-[12px]">
            Discover quotes from the community
          </Text>
        </View>

        <View className="flex-row px-6 mb-6 gap-4">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setTab("trending")}
            className="flex-1 rounded-md py-2 items-center flex-row justify-center gap-2 border"
            style={{
              backgroundColor: tab === "trending" ? colors.accent : colors.card,
              borderColor:
                tab === "trending"
                  ? colors.borderPrimary
                  : colors.borderSecondary,
            }}
          >
            <Flame
              size={18}
              color={
                tab === "trending" ? colors.cardSecondary : colors.textPrimary
              }
            />
            <Text
              style={{
                color:
                  tab === "trending"
                    ? colors.cardSecondary
                    : colors.textPrimary,
              }}
              className="text-base font-semibold"
            >
              Trending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setTab("recent")}
            className="flex-1 rounded-md py-2 items-center flex-row justify-center gap-2 border"
            style={{
              backgroundColor: tab === "recent" ? colors.accent : colors.card,
              borderColor:
                tab === "recent"
                  ? colors.borderPrimary
                  : colors.borderSecondary,
            }}
          >
            <Clock3
              size={18}
              color={
                tab === "recent" ? colors.cardSecondary : colors.textPrimary
              }
            />
            <Text
              style={{
                color:
                  tab === "recent" ? colors.cardSecondary : colors.textPrimary,
              }}
              className="text-base font-semibold"
            >
              Recent
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={sortedPosts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 80,
          }}
          renderItem={({ item }) => (
            <View
              className="rounded-2xl p-5 mb-5 overflow-hidden"
              style={{
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.borderSecondary,
              }}
            >
              <View className="absolute inset-0 bg-white/5 backdrop-blur-xl" />

              <Text
                style={{ color: colors.textPrimary }}
                className="text-[14px] leading-5"
              >
                {item.text}
              </Text>

              <Text
                style={{ color: colors.textTertiary }}
                className="text-[12px] text-right italic mt-2"
              >
                — {item.username}
              </Text>

              <View className="flex-row items-center justify-between mt-2">
                <View
                  className="flex-row items-center rounded-xl"
                  style={{
                    borderWidth: 1,
                    borderColor: colors.borderSecondary,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => vote(item.id, "up")}
                    className="w-11 h-11 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor:
                        item.userVote === "up" ? colors.accent : "transparent",
                    }}
                  >
                    <ArrowBigUp
                      size={18}
                      color={
                        item.userVote === "up"
                          ? colors.cardSecondary
                          : colors.textPrimary
                      }
                    />
                  </TouchableOpacity>

                  <Text
                    style={{ color: colors.textPrimary }}
                    className="text-sm font-bold mx-3"
                  >
                    {item.votes}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => vote(item.id, "down")}
                    className="w-11 h-11 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor:
                        item.userVote === "down"
                          ? colors.accent
                          : "transparent",
                    }}
                  >
                    <ArrowBigDown
                      size={18}
                      color={
                        item.userVote === "down"
                          ? colors.cardSecondary
                          : colors.textPrimary
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        {showInput && (
          <View className="absolute inset-0 bg-black/50 backdrop-blur-xl z-10" />
        )}

        {showInput ? (
          <View className="absolute inset-0 justify-center px-6 z-20">
            <View
              className="rounded-2xl p-5"
              style={{
                backgroundColor: colors.cardSecondary,
                borderWidth: 1,
                borderColor: colors.borderSecondary,
              }}
            >
              <Text
                style={{ color: colors.textPrimary }}
                className="text-xl font-bold mb-5"
              >
                Create Post
              </Text>

              <TextInput
                placeholder="Share something inspiring..."
                placeholderTextColor={colors.textSecondary}
                value={input}
                onChangeText={setInput}
                multiline
                autoFocus
                style={{
                  color: colors.textPrimary,
                  borderColor: colors.borderSecondary,
                  backgroundColor: colors.card,
                }}
                className="rounded-2xl px-5 py-4 text-base min-h-[120px] border"
              />

              <View className="flex-row justify-end mt-5 gap-3">
                <TouchableOpacity
                  onPress={() => {
                    setShowInput(false);
                    setInput("");
                  }}
                  className="px-6 py-4 rounded-xl"
                  style={{
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.borderSecondary,
                  }}
                >
                  <Text
                    style={{ color: colors.textPrimary }}
                    className="font-semibold"
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={createPost}
                  className="px-6 py-4 rounded-xl"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Text
                    style={{ color: colors.cardSecondary }}
                    className="font-bold"
                  >
                    Post
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowInput(true)}
            className="absolute bottom-8 right-6 w-16 h-16 rounded-full items-center justify-center shadow-2xl"
            style={{ backgroundColor: colors.accent }}
          >
            <Plus size={30} color={colors.cardSecondary} />
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Community;
