import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";

const { width: SCREEN_SIZE } = Dimensions.get("window");
export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
    }

    const {
      // 위도 경도
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );

    setCity(location[0].city);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(68,0,136)",
  },

  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cityName: {
    color: "white",
    fontSize: 68,
    fontWeight: "500",
  },

  weather: {},

  day: {
    width: SCREEN_SIZE,
    marginTop: 50,
    alignItems: "center",
  },

  temp: {
    color: "white",
    fontSize: "178",
  },
  description: {
    marginTop: -30,
    color: "white",
    fontSize: 60,
  },
});
