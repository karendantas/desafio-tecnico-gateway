import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 212,
    flex: 1,

    borderRadius: 16,
    alignItems: "center",
  },
  detailsButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 99,
  },
  image: {
    height: 164,
    width: "100%",
    borderRadius: 16,
    marginBottom: 10,
  },
  info: {
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: 700,
  },
  detailModal: { overflow: "hidden" },
  modalContaier: {
    position: "absolute",
    top: 45,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: 140,
    height: 70,
    borderRadius: 9,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",

    backgroundColor: "rgba(255,255,255,0.08)",
  },

  textModal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,

    paddingVertical: 6,
    paddingHorizontal: 16,
  },

  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
});
