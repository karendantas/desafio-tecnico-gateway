import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 42,
    backgroundColor: "#fff",
    width: "100%",
  },
  gradient: {
    height: 500,
    width: "100%",
    position: "absolute",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
  },
  headerContainer: {
    zIndex: 3,
    marginHorizontal: 24,
    position: "absolute",

    top: 10,
  },
  imageContainer: {
    width: "100%",
  },
  valueBadge: {
    borderRadius: 16,
    width: 130,
    height: 120,
    backgroundColor: "#ffff",
    position: "absolute",
    bottom: 0,
    left: 24,
    justifyContent: "center",
    padding: 8,
    zIndex: 4,
  },
  rentBadge: {
    width: 60,
    height: 24,
    borderRadius: 30,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",

    top: -200,
    left: 24,
    zIndex: 4,
  },
  rentText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
  enterpriseTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#fff",
    top: -190,
    left: 24,
    zIndex: 4,
  },
  gallery: {
    paddingHorizontal: 24,
    width: "100%",
  },
  divider: {
    height: 4,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    marginHorizontal: "auto",
    marginVertical: 24,
    width: "90%",
  },
  galleryText: {
    fontSize: 16,
    fontWeight: 700,
  },
  moneyText: {
    fontSize: 12,
    fontWeight: 400,
    color: "#07070779",
  },
  grid: {
    width: "100%",
    marginTop: 16,
    gap: 8,
  },

  mainImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
  },

  secondaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  gridImage: {
    width: "48%",
    height: 140,
    borderRadius: 16,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  slide: {
    width: "100%",
    height: "100%",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },
});
