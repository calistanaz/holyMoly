import { Text, View } from "react-native";
import {
  Heart,
  Plus,
  UserRound,
  Funnel,
  Boxes,
  Share,
  Earth,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

type Quote = {
  id: string;
  text: string;
  source?: {
    type?: string;
    name?: string;
    chapter?: number | string | null;
    verse?: number | string | null;
  };
  tags?: string[];
  language?: string;
  metrics?: {
    likes: number;
    dislikes: number;
  };
};
type QuoteCardProps = {
  quote: Quote;
};

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <LinearGradient
      colors={["#F2EAE0", "#B4D3D9", "#BDA6CE"] }
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <View className="relative flex-1">
        <View className="absolute top-6 left-0 right-0 flex-row justify-between px-6">
          <View className="p-2 rounded-xl bg-[#003e6a]">
            <UserRound color="white" size={26} />
          </View>
          <View className="p-2 rounded-xl bg-[#003e6a]">
            <Funnel color="white" size={26} />
          </View>
        </View>
        <View className="flex-1 justify-center items-center px-12">
          <Text
            style={{ fontFamily: "Inter_400Light" }}
            className="text-[#001a2c] font-semibold text-center text-2xl leading-relaxed tracking-wide"
          >
            {quote.text}
          </Text>

          {(quote.source?.type === "gita" ||
            quote.source?.type === "bible") && (
            <View className="mt-8 items-center">
              <Text
                style={{ fontFamily: "Inter_300Light" }}
                className="text-[#001a2c] font-bold text-md"
              >
                {quote.source?.type?.toUpperCase() || "UNKNOWN"}{" "}
                {quote.source?.chapter != null && quote.source?.verse != null
                  ? `${quote.source.chapter}.${quote.source.verse}`
                  : ""}
              </Text>
            </View>
          )}
          {quote.source?.name !== "Bhagavad Gita" &&
            quote.source?.name !== "Bible" && (
              <View className="mt-8 items-center">
                <Text
                  style={{ fontFamily: "Inter_300Light" }}
                  className="text-white text-md"
                >
                  - {quote.source?.name}
                </Text>
              </View>
            )}
          <View className="flex-row gap-6 mt-12">
            <Heart color="#001a2c" size={32} />
            <Plus color="#001a2c" size={32} />
          </View>
        </View>
        <View className="absolute bottom-20 left-0 right-0 flex-row justify-between items-end px-6">
          <View className="p-2 rounded-xl bg-[#003e6a]">
            <Boxes color="white" size={26} />
          </View>
          <View className="gap-6">
            <View className="p-2 rounded-xl bg-[#003e6a]">
              <Earth color="white" size={26} />
            </View>
            <View className="p-2 rounded-xl bg-[#003e6a]">
              <Share color="white" size={26} />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
