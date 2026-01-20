import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 100,
    justifyContent: "flex-end",
    backgroundColor: "#070707",
  },
  gradient: {
    flex: 1,
    position: "absolute",
    inset: 0,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    gap: 16,
    paddingTop: 90,
  },
  textConditions: {
    color: "white",
    fontSize: 12,
    marginHorizontal: 60,
    textAlign: "center",
    paddingTop: 34,
  },
});
