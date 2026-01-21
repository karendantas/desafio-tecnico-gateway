import { GetEnterpriseResponse } from "@/@types/graphql";
import { Header } from "@/components/header";
import { listingTypeTranslate } from "@/utils/listingTypeTranslate";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";

import Money from "@/assets/icons/money.svg";
import { ImageCarousel } from "@/components/imageCaroussel";
import { formatMoneyBR } from "@/utils/formatMoney";
import { LinearGradient } from "expo-linear-gradient";

export default function EnterpriseDetail({
  data,
}: {
  data: GetEnterpriseResponse;
}) {
  const navigation = useRouter();

  const gallery = data.enterprise.gallery ?? [];
  const mainImage = gallery[0];
  const secondaryImages = gallery.slice(1);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          editShown
          onPressBack={() => navigation.back()}
          onPressEdit={() =>
            navigation.navigate(`/(app)/editEnterprise/${data.enterprise.id}`)
          }
        />
      </View>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <ImageCarousel images={gallery} />
          <LinearGradient
            colors={["rgba(7, 7, 7, 0)", "#010101"]}
            style={styles.gradient}
          />
          {/* <Image
            source={{ uri: mainImage.toString() }}
            style={{ height: 500, width: "100%" }}
            resizeMode="cover"
          /> */}

          <View style={styles.rentBadge}>
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              tint="light"
              style={StyleSheet.absoluteFill}
              intensity={40}
            >
              <Text style={styles.rentText}>
                {" "}
                {listingTypeTranslate(data.enterprise.listingType)}
              </Text>
            </BlurView>
          </View>
          <Text style={styles.enterpriseTitle}>
            Loteamento {data.enterprise.name}
          </Text>

          <View style={styles.valueBadge}>
            <Money />
            <Text style={styles.galleryText}>
              {" "}
              {formatMoneyBR(data.enterprise.price)}
            </Text>
            <Text style={styles.moneyText}> Valor de venda</Text>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.gallery}>
          <Text style={styles.galleryText}>Galeria</Text>

          <View style={styles.grid}>
            {mainImage && (
              <Image
                source={{ uri: mainImage.toString() }}
                style={styles.mainImage}
                resizeMode="cover"
              />
            )}

            <View style={styles.secondaryGrid}>
              {secondaryImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.toString() }}
                  style={styles.gridImage}
                  resizeMode="cover"
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
