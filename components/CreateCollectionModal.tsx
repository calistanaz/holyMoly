import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

type CreateCollectionModalProps = {
  visible: boolean;
  collections: string[];
  onClose: () => void;
  onCreate: (name: string) => void;
};

const CreateCollectionModal = ({
  visible,
  collections,
  onClose,
  onCreate,
}: CreateCollectionModalProps) => {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!visible) {
      setNewName("");
      setError(false);
    }
  }, [visible]);

  const createCollection = () => {
    const trimmedName = newName.trim();

    if (!trimmedName) return;

    const alreadyExists = collections.some(
      (item) => item.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (alreadyExists) {
      setError(true);
      return;
    }

    onCreate(trimmedName);

    setNewName("");
    setError(false);
    onClose();

    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Created collection",
      visibilityTime: 3000,
      bottomOffset: 20,

      props: {
        onPress: () => router.push("/collection"),
      },
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center px-6">
        <View className="bg-[#111428] border border-white/10 rounded-2xl p-6">
          <Text className="text-[#EAE6FF] text-lg font-semibold mb-4">
            New Collection
          </Text>

          <TextInput
            placeholder="Enter collection name"
            value={newName}
            onChangeText={(text) => {
              setNewName(text);
              setError(false);
            }}
            autoFocus
            className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white mb-4"
            placeholderTextColor="#666"
          />

          {error && (
            <Text className="text-red-500 text-sm mb-4">
              Collection with this name already exists
            </Text>
          )}

          <View className="flex-row justify-end gap-5 mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="px-6 py-4 rounded-xl bg-white/5 border border-white/10"
            >
              <Text className="text-white font-semibold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={createCollection}
              className="px-6 py-4 rounded-xl bg-[#C8B6FF]"
            >
              <Text className="text-[#1B1833] font-semibold">Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateCollectionModal;
