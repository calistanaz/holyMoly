import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";
import { Plus } from "lucide-react-native";

const Collection = () => {
  const [collections, setCollections] = useState<string[]>([]);

  const createCollection = () => {
    const newCollection = `Collection ${collections.length + 1}`;
    setCollections((prev) => [...prev, newCollection]);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <Text className="text-black text-3xl font-semibold mb-6">
        Collections
      </Text>

      {collections.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-black text-base text-center">
            Your jar seems to be empty. Create collections:)
          </Text>
        </View>
      ) : (
        <FlatList
          data={collections}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View className="border border-black rounded-2xl p-4 mb-4">
              <Text className="text-black text-lg">{item}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        onPress={createCollection}
        className="absolute bottom-10 left-6 right-6 bg-white border-2 py-4 rounded-2xl items-center"
      >
        <View className="text-black text-lg font-medium text-center flex-row justify-center items-center">
          <Plus color="black" size={20} />{" "}
          <Text className="pl-2">Create Collection</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Collection;
