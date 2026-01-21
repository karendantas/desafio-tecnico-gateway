import { Header } from "@/components/header";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";
import { styles } from "./styles";

import HomeLine from "@/assets/icons/home-line.svg";

import { EnterpriseInput, GetEnterprisesResponse } from "@/@types/graphql";
import { AddEnterpriseCard } from "@/components/addEnterpriseCard";
import { EnterpriseCard } from "@/components/enterpriseCard";
import { Loading } from "@/components/loading";
import { GET_ENTERPRISES } from "@/graphql/queries";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";

type EnterpriseListItem = {
  type: string;
  data?: EnterpriseInput;
};
export function Home() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const { data, loading } = useQuery<GetEnterprisesResponse>(GET_ENTERPRISES);
  const enterprises = data?.enterprises ?? [];

  const myEnterprises = useMemo(() => {
    if (!enterprises || !user) return [];

    return enterprises.filter((enterprise) => enterprise.user.id === user.id);
  }, [enterprises, user]);

  const dataList: EnterpriseListItem[] = [
    { type: "add" },
    ...myEnterprises.map((item) => ({
      type: "card",
      data: item,
    })),
  ];

  if (loading) return <Loading />;
  return (
    <>
      <LinearGradient
        colors={["rgba(11, 68, 42, 1)", "rgba(189, 189, 189, 1)"]}
        style={styles.gradient}
      />
      <View style={styles.container}>
        <Header notificationsShown={true} onPressBack={logout} />

        <View style={styles.userHighlight}>
          <Image source={require("@/assets/images/profile.png")} />
          <Text style={styles.userText}>{user?.name}</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.propertiesHighlight}>
            <HomeLine />
            <Text style={styles.textProperties}> Meus imóveis </Text>
          </View>

          <FlatList
            data={dataList}
            numColumns={2}
            keyExtractor={(item, index) => item.data?.name + index.toString()}
            renderItem={({ item, index }) => {
              if (item.type === "add") {
                return <AddEnterpriseCard />;
              }

              return <EnterpriseCard data={item.data!} number={index} />;
            }}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            style={{ width: "100%" }}
          />
        </View>
      </View>
    </>
  );
}
