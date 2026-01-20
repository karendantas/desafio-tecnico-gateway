import { ImageBackground, Text, View } from "react-native";
import { styles } from "./styles";

import IconGateway from "@/assets/icons/icon.svg";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
export function LoginScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/logo.png")}
      resizeMode="cover"
      imageStyle={{ bottom: -200 }}
      style={styles.imageContainer}
    >
      <LinearGradient
        colors={["rgba(7, 7, 7, 0)", "#070707"]}
        locations={[0.1654, 1]}
        style={styles.gradient}
      />
      <View style={styles.container}>
        <IconGateway />

        <View style={styles.formContainer}>
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite sua senha" />

          <Button title="Confirmar" onPress={() => {}} />

          <Text style={styles.textConditions}>
            Ao prosseguir, você concorda com nossos{" "}
            <Link href={"/"} style={{ fontWeight: 900 }}>
              Termos e Condições de Uso
            </Link>{" "}
            do app.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
