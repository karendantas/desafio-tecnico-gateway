import { Header } from "@/components/header";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";

export default function EnterpriseDetail() {
  const navigation = useNavigation();

  const images = [
    require("@/assets/images/imgtest.png"),
    require("@/assets/images/imgtest.png"),
    require("@/assets/images/imgtest.png"),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header editShown onPressBack={() => navigation.goBack()} />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={["rgba(7, 7, 7, 0)", "#010101"]}
            style={styles.gradient}
          />
          <Image
            source={require("@/assets/images/imgtest.png")}
            style={{ height: 500, width: "100%" }}
            resizeMode="cover"
          />

          <View style={styles.rentBadge}>
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              tint="light"
              style={StyleSheet.absoluteFill}
              intensity={40}
            >
              <Text style={styles.rentText}> A venda </Text>
            </BlurView>
          </View>
          <Text style={styles.enterpriseTitle}>Loteamento</Text>

          <View style={styles.valueBadge}>
            <Text>R$ 00</Text>
            <Text> Valor de venda</Text>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.gallery}>
          <Text style={styles.galleryText}>Galeria</Text>

          <View style={styles.grid}>
            {/* Primeira imagem (destaque) */}
            <Image
              source={require("@/assets/images/imgtest.png")}
              style={styles.mainImage}
              resizeMode="cover"
            />

            {/* Grid secundário */}
            <View style={styles.secondaryGrid}>
              <Image
                source={require("@/assets/images/imgtest.png")}
                style={styles.gridImage}
                resizeMode="cover"
              />
              <Image
                source={require("@/assets/images/imgtest.png")}
                style={styles.gridImage}
                resizeMode="cover"
              />
              <Image
                source={require("@/assets/images/imgtest.png")}
                style={styles.gridImage}
                resizeMode="cover"
              />
              <Image
                source={require("@/assets/images/imgtest.png")}
                style={styles.gridImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
