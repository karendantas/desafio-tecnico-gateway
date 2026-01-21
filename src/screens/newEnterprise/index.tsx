import {
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
import { CREATE_ENTERPRISE } from "@/graphql/mutations";
import { pickImages } from "@/utils/imagePicker";
import { calculateProgress } from "@/utils/progressUtils";
import { useMutation } from "@apollo/client/react";
import { useNavigation } from "expo-router";

export function AddNewEnterprise() {
  const [listingType, setListingType] = useState<"RENT" | "SALE">("SALE");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("0.0");
  const [images, setImages] = useState<string[]>([]);

  const navigation = useNavigation();
  const TOTAL_STEPS = 4;

  const [errors, setErrors] = useState<{
    title?: string;
    value?: string;
    images?: string;
    api?: string;
  }>({});

  const [formProgress, setFormProgress] = useState<DimensionValue>("25%");

  const [createEnterprise, { loading }] = useMutation(CREATE_ENTERPRISE, {
    onError(error) {
      setErrors((prev) => ({
        ...prev,
        api: error.message,
      }));
    },
    onCompleted() {
      navigation.goBack();
    },
    refetchQueries: ["GetEnterprises"],
  });

  const progressPercentage = () => {
    const completed = calculateProgress(title, listingType, value, images);
    return `${(completed / TOTAL_STEPS) * 100}%` as DimensionValue;
  };

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

    if (images.length > 10) {
      newErrors.images = "Você pode adicionar no máximo 10 imagens";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function createNewEnterprise() {
    setErrors({});

    const isValid = validateForm();
    if (!isValid) return;
    await createEnterprise({
      variables: {
        input: {
          name: title,
          listingType: listingType,
          price: value,
          gallery: images,
        },
      },
    });
  }
  function addImage(uri: string) {
    if (images.length >= 10) {
      setErrors((prev) => ({
        ...prev,
        images: "Limite máximo de 10 imagens",
      }));
      return;
    }

    setImages((prev) => [...prev, uri]);
  }
  async function handlePickImages() {
    try {
      const newImages = await pickImages({
        currentImages: images,
        maxImages: 10,
      });

      setImages(newImages);
      setErrors((prev) => ({ ...prev, images: undefined }));
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        images: error.message,
      }));
    }
  }

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
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
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
          {errors.value && <Text style={styles.errorText}>{errors.value}</Text>}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formText}>Galeria (0/10)</Text>
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

        {errors.api && <Text style={styles.errorText}>{errors.api}</Text>}

        <Button
          variant="secondary"
          title={loading ? "Publicando..." : "Publicar imóvel"}
          onPress={createNewEnterprise}
        />
      </View>
    </View>
  );
}
