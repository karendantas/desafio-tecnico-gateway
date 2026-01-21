import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    alignItems: "center",
    marginTop: 42,
    zIndex: 2,
  },
  gradient: {
    flex: 1,
    position: "absolute",
    inset: 0,
    zIndex: 1,
  },

  userHighlight: {
    paddingTop: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    width: "100%",
  },

  userText: {
    fontSize: 32,
    fontWeight: 700,
    color: "#FFFFFF",
  },

  contentContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 26,
    gap: 21,
  },

  propertiesHighlight: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 21,
  },

  textProperties: {
    fontSize: 18,
    fontWeight: 700,
    color: "#FFFFFF",
  },

  row: {
    gap: 8,
    marginBottom: 16,
  },
});
