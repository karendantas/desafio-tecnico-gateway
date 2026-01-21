import { Pressable, Text, View } from "react-native";

interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: () => void;
}

export function RadioButton({ label, selected, onPress }: RadioButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#14CE7C",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#14CE7C",
            }}
          />
        )}
      </View>

      <Text style={{ fontWeight: 700, fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}
