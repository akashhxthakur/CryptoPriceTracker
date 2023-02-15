import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "DroidSans",
              color: "white",
              fontSize: 25,
              letterSpacing: 1,
              paddingHorizontal: 20,
              paddingBottom: 5,
              fontWeight: "bold",
            }}
          >
            Crypto Assets
          </Text>
        </View>

        <FlatList
          data={coins}
          renderItem={({ item }) => <CoinItem marketCoin={item} />}
          onEndReached={() => fetchCoins(coins.length / 50 + 1)}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              tintColor="white"
              onRefresh={refetchCoins}
            />
          }
        />

        {/* <Text style={{ color: "lightgrey", fontSize: 12, paddingHorizontal: 10 }}>
        Powered by Akash
      </Text> */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
