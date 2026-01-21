import { ImageBackground, Text, View } from "react-native";
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

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { login, isSigningIn } = useAuth();

  function validateForm() {
    const newErrors: typeof errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Email inválido";
    }

    if (!password || password.trim().length < 3) {
      newErrors.password = "Senha deve ter no mínimo 3 caracteres";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }
  async function handleSignIn() {
    setErrors({});

    const isValid = validateForm();
    if (!isValid) return;

    await login(email, password);
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
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <Input
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <Button
            title={isSigningIn ? "Entrando..." : "Entrar"}
            onPress={handleSignIn}
            disabled={isSigningIn}
          />

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
