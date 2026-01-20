import { TextInput, View } from "react-native";
import { styles } from "./styles";

interface InputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
}
