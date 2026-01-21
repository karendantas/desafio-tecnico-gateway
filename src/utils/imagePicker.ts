import * as ImagePicker from "expo-image-picker";

interface PickImagesParams {
  currentImages: string[];
  maxImages?: number;
}

export async function pickImages({
  currentImages,
  maxImages = 10,
}: PickImagesParams): Promise<string[]> {
  if (currentImages.length >= maxImages) {
    throw new Error(`Você pode adicionar no máximo ${maxImages} imagens`);
  }

  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new Error("Permissão para acessar a galeria negada");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    selectionLimit: maxImages - currentImages.length,
    quality: 0.8,
  });

  if (result.canceled) {
    return currentImages;
  }

  const uris = result.assets.map((asset) => asset.uri);

  return [...currentImages, ...uris];
}
