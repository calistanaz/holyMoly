import { Link } from "expo-router";
import {
  Boxes,
  Earth,
  Funnel,
  Heart,
  Plus,
  Share,
  UserRound,
  X,
} from "lucide-react-native";

import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
} from "react-native";

import { useState, useRef } from "react";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

import CreateCollectionModal from "@/components/CreateCollectionModal";
import { useTheme } from "@/context/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColors";

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

type Collection = {
  id: string;
  name: string;
};

type QuoteCardProps = {
  quote: Quote;
  onOpenFilter: () => void;
};

export default function QuoteCard({ quote, onOpenFilter }: QuoteCardProps) {
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [createCollectionModal, setCreateCollectionModal] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([
    { id: "1", name: "Motivation" },
    { id: "2", name: "Life Lessons" },
    { id: "3", name: "❤️ Favorites" },
  ]);
  
  const { toggleTheme, theme } = useTheme();
  const colors = useThemeColors();

  const viewShotRef = useRef<ViewShot>(null);

  const handleAddToCollection = (
    collectionId: string,
    collectionName?: string,
  ) => {
    console.log("Added quote:", quote.id);
    console.log("Collection:", collectionId, collectionName);

    //! save logic here

    setShowCollectionModal(false);
  };

  const shareImg = async () => {
    try {
      const ref = viewShotRef.current;

      if (!ref || !ref.capture) return;

      const uri = await ref.capture();

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/images/backgrounds/bg-1.webp")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View className="flex-1 bg-black/40">
          <View className="absolute top-6 left-0 right-0 flex-row justify-between px-6">
            <Link href="/profile">
              <UserRound color="white" size={26} strokeWidth={1.5} />
            </Link>

            <TouchableOpacity onPress={onOpenFilter}>
              <Funnel color="white" size={26} />
            </TouchableOpacity>
          </View>

          <View className="flex-1 justify-center items-center px-12">
            <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-white text-center text-2xl leading-relaxed tracking-wide"
              >
                {quote.text}
              </Text>

              {(quote.source?.type === "gita" ||
                quote.source?.type === "bible") && (
                <View className="mt-8 items-center">
                  <Text
                    style={{ fontFamily: "Inter_300Light" }}
                    className="text-white font-bold text-md"
                  >
                    {quote.source?.type?.toUpperCase()}{" "}
                    {quote.source?.chapter != null &&
                    quote.source?.verse != null
                      ? `${quote.source.chapter}.${quote.source.verse}`
                      : ""}
                  </Text>
                </View>
              )}

              {quote.source?.name &&
                quote.source?.name !== "Bhagavad Gita" &&
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
            </ViewShot>

            <View className="flex-row gap-6 mt-12">
              <Heart color="white" size={32} />

              <TouchableOpacity onPress={() => setShowCollectionModal(true)}>
                <Plus color="white" size={32} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="absolute bottom-20 left-0 right-0 flex-row justify-between items-end px-6">
            <Link href="/collection">
              <Boxes color="white" size={26} strokeWidth={1.5} />
            </Link>

            <View className="gap-6">
              <Link href="/community">
                <Earth color="white" size={26} strokeWidth={1.5} />
              </Link>

              <TouchableOpacity onPress={shareImg}>
                <Share color="white" size={26} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      <Modal visible={showCollectionModal} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setShowCollectionModal(false)}
        >
          <Pressable
            className="rounded-t-3xl border-t-4 px-6 pt-6 pb-10"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.borderPrimary,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <View className="flex-row justify-between items-center mb-6">
              <Text
                className="text-xl font-semibold"
                style={{ color: colors.textPrimary }}
              >
                Save Quote
              </Text>

              <TouchableOpacity onPress={() => setShowCollectionModal(false)}>
                <X color={colors.iconPrimary} size={24} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="rounded-2xl py-4 px-4 mb-5"
              style={{
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.borderSecondary,
              }}
              onPress={() => {
                setShowCollectionModal(false);
                setCreateCollectionModal(true);
              }}
            >
              <Text
                className="text-center font-semibold"
                style={{ color: colors.textPrimary }}
              >
                + Create New Collection
              </Text>
            </TouchableOpacity>

            <Text
              className="mb-3 text-sm"
              style={{ color: colors.textSecondary }}
            >
              Existing Collections
            </Text>

            <FlatList
              data={collections}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleAddToCollection(item.id, item.name)}
                  className="rounded-2xl px-4 py-4 mb-3"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Text
                    className="text-base font-semibold"
                    style={{ color: colors.cardSecondary }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>

      <CreateCollectionModal
        visible={createCollectionModal}
        collections={collections.map((item) => item.name)}
        onClose={() => setCreateCollectionModal(false)}
        onCreate={(name) => {
          const newCollection = {
            id: Date.now().toString(),
            name,
          };

          setCollections((prev) => [...prev, newCollection]);

          handleAddToCollection(newCollection.id, newCollection.name);
        }}
      />
    </>
  );
}
