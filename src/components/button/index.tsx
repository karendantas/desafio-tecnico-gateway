import { BlurView } from "expo-blur";
import { Pressable, StyleSheet, Text } from "react-native";
import { styles } from "./styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={75}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
