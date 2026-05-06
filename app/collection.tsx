import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from "react-native";
import { useState } from "react";
import { Plus } from "lucide-react-native";

const Collection = () => {
  const [collections, setCollections] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(false);

  const createCollection = () => {
    const trimmedName = newName.trim();

    if (!trimmedName) return;

    const alreadyExists = collections.some(
      (item) => item.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      setError(true);
      return;
    }

    setError(false);

    setCollections((prev) => [...prev, trimmedName]);

    setNewName("");
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setNewName("");
    setError(false);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <Text className="text-black text-3xl font-semibold mb-6">
        Collections
      </Text>

      {collections.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-black text-base text-center opacity-60">
            Your jar seems empty.
          </Text>

          <Text className="text-black text-sm text-center opacity-40 mt-1">
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
            <View className="w-[48%] h-40 border border-black rounded-2xl p-4 mb-4">
              <Text className="text-red-400 text-base font-medium">
                {item}
              </Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-10 left-6 right-6 bg-black py-4 rounded-2xl items-center flex-row justify-center"
      >
        <Plus color="white" size={20} />

        <Text className="text-white text-base font-medium ml-2">
          Create Collection
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center px-6">
          <View className="bg-white rounded-2xl p-6">
            <Text className="text-black text-lg font-semibold mb-4">
              New Collection
            </Text>

            <TextInput
              placeholder="Enter collection name"
              value={newName}
              onChangeText={(text) => {
                setNewName(text);
                setError(false);
              }}
              className="border border-black rounded-xl px-4 py-3 text-black mb-4"
              placeholderTextColor="#666"
            />

            {error && (
              <Text className="text-red-500 text-sm mb-4">
                Collection with this name already exists
              </Text>
            )}

            <View className="flex-row justify-end gap-5 mt-4">
              <TouchableOpacity onPress={closeModal}>
                <Text className="text-black opacity-60">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={createCollection}>
                <Text className="text-black font-semibold">Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Collection;