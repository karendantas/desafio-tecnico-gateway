import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
  },

  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    gap: 90,
    alignItems: "center",
    marginTop: 64,
    marginBottom: 32,
  },

  headerText: {
    fontSize: 16,
    fontWeight: 700,
    alignSelf: "center",
  },

  formContainer: {
    width: "100%",
    paddingTop: 42,
    gap: 32,
  },

  formItem: {
    gap: 16,
  },
  formText: {
    fontSize: 16,
    fontWeight: 700,
  },

  radioContent: {
    flexDirection: "row",
    gap: 60,
    alignItems: "center",
  },

  progressLevel: {
    height: 4,
    borderRadius: 4,
    backgroundColor: "#14CE7C",
    position: "absolute",
    zIndex: 2,
    inset: 0,
  },
  progress: {
    height: 4,
    width: "100%",
    borderRadius: 4,
    backgroundColor: "#DDDDDD",
    position: "relative",
    zIndex: 1,
  },

  imageAdd: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
  },
});
