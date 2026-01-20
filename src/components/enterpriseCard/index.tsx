import { EnterpriseInput } from "@/@types/graphql";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

interface EnterpriseCardProps {
  data: EnterpriseInput;
}
export function EnterpriseCard({ data }: EnterpriseCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/imgtest.png")}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{data.name}</Text>
        <Text>{data.listingType}</Text>
      </View>
    </View>
  );
}
