import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_SIZE } = Dimensions.get("window");
const API_KEY = "7d7cc6512e9a3f109a97243f9f771a2b";

const Icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

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
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );

    const json = await response.json();
    const dailyForecasts = json.list.filter((weather) =>
      weather.dt_txt.includes("00:00:00")
    );
    console.log(dailyForecasts);
    console.log(dailyForecasts[0]);
    setDays(dailyForecasts);
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
        {days.length ? (
          days.map((day, index) => {
            return (
              <View key={index} style={styles.day}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.temp}>
                    {parseFloat(day.main.temp).toFixed(1)}
                  </Text>
                  <Fontisto
                    name={Icons[day.weather[0].main]}
                    size={68}
                    color="white"
                  ></Fontisto>
                </View>

                <Text style={styles.description}>{day.weather[0].main} </Text>
                <Text style={styles.tinyText}>
                  {day.weather[0].description}
                </Text>
              </View>
            );
          })
        ) : (
          <View style={styles.day}>
            <ActivityIndicator color="white" size="large" />
          </View>
        )}
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
    fontSize: 48,
    fontWeight: "500",
  },

  weather: {},

  day: {
    width: SCREEN_SIZE,
    marginTop: 50,
    padding: 20,
  },

  temp: {
    color: "white",
    fontSize: 68,
  },

  description: {
    color: "white",
    fontSize: 20,
  },

  tinyText: {
    color: "white",
    fontSize: 15,
  },
});
