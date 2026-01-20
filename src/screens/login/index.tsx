import { Alert, ImageBackground, Text, View } from "react-native";
import { styles } from "./styles";

import IconGateway from "@/assets/icons/icon.svg";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useAuth } from "@/hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }

    try {
      await login(email, password);
    } catch (error) {}
  }
  return (
    <ImageBackground
      source={require("../../assets/images/logo.png")}
      resizeMode="cover"
      defaultSource={require("../../assets/images/logo.png")}
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
          <Input
            placeholder="Digite seu email"
            onChangeText={setEmail}
            value={email}
          />
          <Input
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />

          <Button title="Confirmar" onPress={handleSignIn} />

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
