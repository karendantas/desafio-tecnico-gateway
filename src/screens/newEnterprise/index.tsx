import { DimensionValue, Text, View } from "react-native";
import { styles } from "./styles";

import Back from "@/assets/icons/back.svg";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { RadioButton } from "@/components/radioButton";
import { useEffect, useState } from "react";

import AddCircle from "@/assets/icons/add-circle.svg";
import { calculateProgress } from "@/utils/progressUtils";
import { useNavigation } from "expo-router";

export function AddNewEnterprise() {
  const [listingType, setListingType] = useState<"RENT" | "SALE">("SALE");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("0.0");
  const [images, setImages] = useState<String[]>([]);

  const [formProgress, setFormProgress] = useState<DimensionValue>("25%");

  const navigation = useNavigation();
  const TOTAL_STEPS = 4;

  const progressPercentage = () => {
    const completed = calculateProgress(title, listingType, value, images);
    return `${(completed / TOTAL_STEPS) * 100}%` as DimensionValue;
  };

  useEffect(() => {
    setFormProgress(progressPercentage());
  }, [title, listingType, value, images]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Back color="#000000" onPress={navigation.goBack} />
        <Text style={styles.headerText}> Adicionar imóvel</Text>
      </View>

      <View style={{ width: "100%" }}>
        <View style={[styles.progressLevel, { width: formProgress }]}></View>
        <View style={styles.progress}></View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formItem}>
          <Text style={styles.formText}>Título do anúncio</Text>
          <Input
            placeholder="Título"
            value={title}
            onChangeText={(v) => {
              setTitle(v);
            }}
          />
        </View>
        <View style={styles.radioContent}>
          <RadioButton
            value="SALE"
            label="Venda"
            selected={listingType === "SALE"}
            onPress={() => setListingType("SALE")}
          />

          <RadioButton
            value="RENT"
            label="Aluguel"
            selected={listingType === "RENT"}
            onPress={() => setListingType("RENT")}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.formText}>Valor de venda</Text>
          <Input placeholder="R$ 0,00" value={value} onChangeText={setValue} />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formText}>Galeria (0/10)</Text>
          <View style={styles.imageAdd}>
            <AddCircle />
          </View>
        </View>

        <Button
          variant="secondary"
          title="Publicar imóvel"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}
