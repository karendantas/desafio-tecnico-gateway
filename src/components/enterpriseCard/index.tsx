import { EnterpriseInput } from "@/@types/graphql";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

import Details from "@/assets/icons/details.svg";
import Edit from "@/assets/icons/edit.svg";
import Trash from "@/assets/icons/trash.svg";

import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";

interface EnterpriseCardProps {
  data: EnterpriseInput;
}
export function EnterpriseCard({ data }: EnterpriseCardProps) {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => {
          setIsModalShown(true);
        }}
      >
        <Details />
      </TouchableOpacity>
      <Image
        source={require("@/assets/images/imgtest.png")}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>
          {data.name} número {data.id}
        </Text>
        <Text>{data.listingType}</Text>
      </View>

      {isModalShown && (
        <View style={styles.modalContaier}>
          <DetailModal id={data.id} />
        </View>
      )}
    </View>
  );
}

function DetailModal({ id }: { id: String }) {
  const navigation = useRouter();
  function handleEdit() {
    navigation.push(`/(app)/enterprise/${id}`);
  }
  function handleDelete() {}
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

        <TouchableOpacity style={styles.textModal} onPress={() => handleDelete}>
          <Trash width={15} height={15} />
          <Text style={[styles.text, { color: "red" }]}> Deletar</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}
