import { Text, View } from "react-native";
import { styles } from "./styles";

import Add from "@/assets/icons/add.svg";
export function AddEnterpriseCard() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Add />
        <Text>Adicionar imóvel</Text>
      </View>
    </View>
  );
}
