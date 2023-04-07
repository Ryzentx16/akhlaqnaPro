import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome, MaterialIcons, Entypo } from "react-native-vector-icons";
import axios from "axios";
import AmantiButton from "./AmantiButton";

const customMapStyle = [];
// const QAlat = 25.300946829658887;
// const QAlon = 51.465748474001884;
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function GetMap(props) {
  console.log(props.initRegion.latitude + "asdasd" + props.initRegion.longitude)
  const QAlat = props.initRegion.latitude;
  const QAlon = props.initRegion.longitude;
  const [markerPoint, setMarkerPoint] = useState({
    latitude: QAlat,
    longitude: QAlon,
  });
  const [currLocation, setCurrLocation] = useState(null);

  const refMap = useRef(MapView);

  const getAddressAsync = async (latitude, longitude) => {
    let address = await Location.reverseGeocodeAsync({ latitude, longitude });
    setAddress(address[0]);
    return address;
  };

  const [address, setAddress] = useState({
    city: "Ar-Rayyan",
    country: "Qatar",
    district: "Al Rayyan Al Jadeed",
    isoCountryCode: "QA",
    name: "8C2C+939",
    postalCode: null,
    region: "Al Rayyan Municipality",
    street: null,
    streetNumber: null,
    subregion: null,
    timezone: null,
  });

  useEffect(() => {
    const init = async () => {
      await Location.requestForegroundPermissionsAsync();
      await getAddressAsync(QAlat, QAlon).catch(console.error);
    };

    init();
  }, []);

  const onLocation = async () => {
    const location = {
      latitude: currLocation.latitude,
      longitude: currLocation.longitude,
    };

    refMap.current.animateCamera({
      center: location,

      // Only when using Google Maps.
      zoom: 17,
    });

    await getAddressAsync(location.latitude, location.longitude);
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBb2lef_VaN4m9OlvngArW3h84ul1DHZIo`
      );
      // console.log(response);
      if (response.data.status === "OK") {
        const { address_components } = response.data.results[0];
        // find the street name component in the address_components array
        const streetName = address_components.find((component) =>
          component.types.includes("route")
        ).long_name;
        return streetName;
      } else {
        console.log(
          "Geocode was not successful for the following reason: ",
          response.data.status
        );
        return null;
      }
    } catch (error) {
      console.log(`from getAddressFromCoords: ${error}`);
      return null;
    }
  };

  return (
    <View
      style={{
        maxHeight: windowHeight,
        minHeight: windowHeight,
        maxWidth: windowWidth,
        minWidth: windowWidth,
      }}
    >
      <MapView
        showsMyLocationButton={true}
        showsUserLocation={true}
        customMapStyle={customMapStyle}
        onUserLocationChange={(e) => setCurrLocation(e.nativeEvent.coordinate)} //here
        ref={refMap}
        style={styles.container}
        onRegionChangeComplete={async (Region) => {
          await getAddressAsync(Region.latitude, Region.longitude).catch(
            console.error
          );
          console.log(`${Region.latitude}, ${Region.longitude}`);

          console.log(address);
          setMarkerPoint(Region);
          await getAddressFromCoords(Region.latitude, Region.longitude);
        }}
        initialRegion={{
          latitude: QAlat,
          latitudeDelta: 0.6631861591450701,
          longitude: QAlon,
          longitudeDelta: 0.3281260281801224,
        }}
        onPress={(e) => {
          setMarkerPoint(e.nativeEvent.coordinate);
        }}
      />
      {/* <View style={{ position: "absolute", top: 40, left: 0 }}>
        <Button title={"to curr location"} onPress={onLocation} />
      </View> */}
      <Entypo
        name={"location-pin"}
        size={30}
        color={"#660032"}
        style={styles.pin}
      />
      <View style={styles.centerRefrence} />
      <View
        style={{
          position: "absolute",
          backgroundColor: "white",
          opacity: 0.7,
          bottom: 0,
          width: "100%",
          height: "10%",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,

          width: "100%",
          // height: "25%",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ marginBottom: 10 }}
        >{`City: ${address.city} | district: ${address.district}`}</Text>
        <AmantiButton
          title={"Set Location"}
          style={{ marginBottom: 15 }}
          onPress={() => props.onSetLocation(markerPoint)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#660032",
    justifyContent: "center",
    alignItems: "center",
  },

  pin: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginTop: 3 + 3 - 30, //3 is the half of below view height another 3 is the offset and the -30 is the current icon hight
    marginLeft: -15 + 3, //-15 is the current icon width and the 3 is the half of bellow view width
    zIndex: 1,
  },

  centerRefrence: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 0,
    left: "50%",
    top: "50%",
  },
});
