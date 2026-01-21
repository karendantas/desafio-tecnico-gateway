import { EnterpriseInput } from "@/@types/graphql";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

import Details from "@/assets/icons/details.svg";
import Edit from "@/assets/icons/edit.svg";
import Trash from "@/assets/icons/trash.svg";

import { DELETE_ENTERPRISE } from "@/graphql/mutations";
import { formatMoneyBR } from "@/utils/formatMoney";
import { listingTypeTranslate } from "@/utils/listingTypeTranslate";
import { useMutation } from "@apollo/client/react";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";

interface EnterpriseCardProps {
  data: EnterpriseInput;
  number: number;
}
export function EnterpriseCard({ data, number }: EnterpriseCardProps) {
  const [isModalShown, setIsModalShown] = useState(false);

  const navigation = useRouter();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.push(`/(app)/enterprise/${data.id}`);
      }}
    >
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => {
          setIsModalShown((prev) => !prev);
        }}
      >
        <Details />
      </TouchableOpacity>
      <Image
        source={{ uri: data.gallery[0].toString() }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>
          {data.name} número {number}
        </Text>
        <Text style={{ fontSize: 12 }}>
          {listingTypeTranslate(data.listingType)} {formatMoneyBR(data.price)}
        </Text>
      </View>

      {isModalShown && (
        <View style={styles.modalContaier}>
          <DetailModal id={data.id} setIsModalShown={setIsModalShown} />
        </View>
      )}
    </TouchableOpacity>
  );
}

interface DetailModalProps {
  id: String;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}
function DetailModal({ id, setIsModalShown }: DetailModalProps) {
  const navigation = useRouter();
  const [deleteEnterprise] = useMutation(DELETE_ENTERPRISE, {
    refetchQueries: ["GetEnterprises"],
  });

  function handleEdit() {
    setIsModalShown(false);
    navigation.push(`/(app)/editEnterprise/${id}`);
  }
  async function handleDelete() {
    Alert.alert("Excluir", "Deseja excluir esse imóvel?", [
      {
        text: "Cancelar",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await deleteEnterprise({
              variables: {
                id: id,
              },
            });
          } catch (error) {
            Alert.alert("Erro", "Não foi possível deletar");
          }
        },
      },
    ]);
  }
  return (
    <View style={styles.wrapper}>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={60}
        tint="light"
        style={StyleSheet.absoluteFill}
      >
        <TouchableOpacity style={styles.textModal} onPress={handleEdit}>
          <Edit width={15} height={15} />
          <Text style={styles.text}> Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textModal} onPress={handleDelete}>
          <Trash width={15} height={15} />
          <Text style={[styles.text, { color: "red" }]}> Deletar</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}
