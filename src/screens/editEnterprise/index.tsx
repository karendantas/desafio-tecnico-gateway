import {
  Alert,
  DimensionValue,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

import Back from "@/assets/icons/back.svg";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { RadioButton } from "@/components/radioButton";
import { useEffect, useState } from "react";

import AddCircle from "@/assets/icons/add-circle.svg";
import { UPDATE_ENTERPRISE } from "@/graphql/mutations";
import { pickImages } from "@/utils/imagePicker";
import { calculateProgress } from "@/utils/progressUtils";

import { GetEnterpriseResponse } from "@/@types/graphql";
import { useMutation } from "@apollo/client/react";
import { useNavigation } from "expo-router";

export function EditEnterprise({ data }: { data: GetEnterpriseResponse }) {
  const navigation = useNavigation();

  const [listingType, setListingType] = useState<"RENT" | "SALE">(
    data.enterprise.listingType,
  );
  const [title, setTitle] = useState(data.enterprise.name);
  const [value, setValue] = useState(data.enterprise.price.toString());
  const [images, setImages] = useState<string[]>(data.enterprise.gallery);

  const TOTAL_STEPS = 4;

  const [errors, setErrors] = useState<{
    title?: string;
    value?: string;
    images?: string;
  }>({});

  const [formProgress, setFormProgress] = useState<DimensionValue>("25%");

  const [updateEnterprise, { loading }] = useMutation(UPDATE_ENTERPRISE, {
    onError(error) {
      Alert.alert("Não foi possível alterar imóvel", error.message);
    },
    onCompleted() {
      navigation.goBack();
    },
    refetchQueries: ["GetEnterprises"],
  });

  function validateForm() {
    const newErrors: typeof errors = {};

    if (!title || title.trim().length < 3) {
      newErrors.title = "O título deve ter pelo menos 3 caracteres";
    }

    if (!value || Number(value) <= 0) {
      newErrors.value = "Informe um valor válido";
    }

    if (images.length === 0) {
      newErrors.images = "Adicione pelo menos uma imagem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleUpdateEnterprise() {
    setErrors({});
    if (!validateForm()) return;

    await updateEnterprise({
      variables: {
        id: data.enterprise.id,
        input: {
          name: title,
          listingType,
          price: Number(value),
          gallery: images,
        },
      },
    });
  }

  async function handlePickImages() {
    const newImages = await pickImages({
      currentImages: images,
      maxImages: 10,
    });
    setImages(newImages);
  }

  useEffect(() => {
    const completed = calculateProgress(title, listingType, value, images);
    setFormProgress(`${(completed / TOTAL_STEPS) * 100}%`);
  }, [title, listingType, value, images]);

  if (loading) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Back onPress={navigation.goBack} />
        <Text style={styles.headerText}>Editar imóvel</Text>
      </View>

      <View style={{ width: "100%" }}>
        <View style={[styles.progressLevel, { width: formProgress }]} />
        <View style={styles.progress} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formItem}>
          <Text style={styles.formText}>Título</Text>
          <Input value={title} onChangeText={setTitle} />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        <View style={styles.radioContent}>
          <RadioButton
            label="Venda"
            value="SALE"
            selected={listingType === "SALE"}
            onPress={() => setListingType("SALE")}
          />
          <RadioButton
            label="Aluguel"
            value="RENT"
            selected={listingType === "RENT"}
            onPress={() => setListingType("RENT")}
          />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formText}>Valor</Text>
          <Input value={value} onChangeText={setValue} />
          {errors.value && <Text style={styles.errorText}>{errors.value}</Text>}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formText}>Galeria ({images.length}/10)</Text>

          <View style={styles.imagesWrapper}>
            {images.length < 10 && (
              <TouchableOpacity
                style={styles.imageAdd}
                onPress={handlePickImages}
              >
                <AddCircle />
              </TouchableOpacity>
            )}

            {images.map((uri, index) => (
              <View key={index} style={styles.imagePreview}>
                <Image source={{ uri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeImage}
                  onPress={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <Text style={styles.removeText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {errors.images && (
            <Text style={styles.errorText}>{errors.images}</Text>
          )}
        </View>

        <Button
          variant="secondary"
          title={loading ? "Salvando..." : "Salvar alterações"}
          onPress={handleUpdateEnterprise}
        />
      </View>
    </View>
  );
}
