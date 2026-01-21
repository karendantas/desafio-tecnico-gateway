import { BlurView } from "expo-blur";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export function Button({
  title,
  onPress,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, styles[variant]]}
      {...rest}
    >
      {variant === "primary" && (
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={75}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
