import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";
import { Plus } from "lucide-react-native";
import CreateCollectionModal from "@/components/CreateCollectionModal";
import { useTheme } from "@/context/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColors";

const Collection = () => {
  const [collections, setCollections] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { toggleTheme, theme } = useTheme();
  const colors = useThemeColors();

  return (
    <View
      className="flex-1 px-6 pt-6"
      style={{ backgroundColor: colors.background }}
    >
      <Text
        className="text-3xl font-semibold mb-6"
        style={{ color: colors.textPrimary }}
      >
        Collections
      </Text>

      {collections.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text
            className="text-base text-center opacity-60"
            style={{ color: colors.textSecondary }}
          >
            Your jar seems empty.
          </Text>

          <Text
            className="text-sm text-center opacity-40 mt-1"
            style={{ color: colors.textSecondary }}
          >
            Start by creating your first collection
          </Text>
        </View>
      ) : (
        <FlatList
          data={collections}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <View
              className="w-[48%] h-40 rounded-2xl p-4 mb-4"
              style={{
                borderWidth: 1,
                borderColor: colors.borderSecondary,
                backgroundColor: colors.card,
              }}
            >
              <Text
                className="text-base font-medium"
                style={{ color: colors.textPrimary }}
              >
                {item}
              </Text>
            </View>
          )}
        />
      )}

      {!modalVisible && (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="absolute bottom-10 left-6 right-6 py-4 rounded-2xl items-center flex-row justify-center"
          style={{ backgroundColor: colors.accent }}
        >
          <Plus color={colors.iconPrimary} size={20} />

          <Text
            className="text-base font-medium ml-2"
            style={{ color: colors.background }}
          >
            Create Collection
          </Text>
        </TouchableOpacity>
      )}

      <CreateCollectionModal
        visible={modalVisible}
        collections={collections}
        onClose={() => setModalVisible(false)}
        onCreate={(name) => setCollections((prev) => [...prev, name])}
      />
    </View>
  );
};

export default Collection;
