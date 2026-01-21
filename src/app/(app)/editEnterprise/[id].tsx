import { GetEnterpriseResponse } from "@/@types/graphql";
import { GET_ENTERPRISE } from "@/graphql/queries";
import { EditEnterprise } from "@/screens/editEnterprise";
import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams } from "expo-router";

export default function EnterpriseDetailScreen() {
  const { id } = useLocalSearchParams();

  const { data } = useQuery<GetEnterpriseResponse>(GET_ENTERPRISE, {
    variables: {
      id: id,
    },
  });

  if (!data) return;
  return <EditEnterprise data={data} />;
}
