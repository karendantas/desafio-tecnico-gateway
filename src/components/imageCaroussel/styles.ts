import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dotsContainer: {
    position: "absolute",
    bottom: 190,
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },

  dotActive: {
    backgroundColor: "#14CE7C",
  },
});
