import EnterpriseDetail from "@/screens/enterpriseDetail";
import { useLocalSearchParams } from "expo-router";

export default function EnterpriseDetailScreen() {
  const { id } = useLocalSearchParams();
  console.log(id);
  return <EnterpriseDetail />;
}
