import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

import Add from "@/assets/icons/add.svg";
import { useRouter } from "expo-router";
export function AddEnterpriseCard() {
  const navigation = useRouter();
  function handleAddEnterprise() {
    navigation.navigate("/(app)/addEnterprise");
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleAddEnterprise}>
      <View style={styles.content}>
        <Add />
        <Text>Adicionar imóvel</Text>
      </View>
    </TouchableOpacity>
  );
}
