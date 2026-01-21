import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 22,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    overflow: "hidden",

    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: "rgba(17, 16, 16, 0.07)",
    borderWidth: 1,
  },
  secondary: {
    backgroundColor: "#14CE7C",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    zIndex: 1,
  },
});
