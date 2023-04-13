import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  Platform,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { Entypo } from "react-native-vector-icons";
import { OriginalColors, SwappedColors } from "./AmantiButtons";

const MAPS_API_KEY = "AIzaSyBb2lef_VaN4m9OlvngArW3h84ul1DHZIo";

const customMapStyle = [];
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function MapViewer(props) {
  const isFixedView = props.fixedView;
  const INlat = props.initRegion.latitude;
  const INlon = props.initRegion.longitude;
  const [markerPoint, setMarkerPoint] = useState({
    latitude: INlat,
    longitude: INlon,
  });
  const [areaName, setAreaName] = useState(null);
  const refMap = useRef(null);

  const goToLocation = () => {
    const location = {
      latitude: INlat,
      longitude: INlon,
    };

    getAreaName(location, "en");

    refMap.current.setCamera({
      center: location,
      zoom: 16,
    });
  };

  const getAreaName = async ({ latitude, longitude }, language = "en") => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=${language}&key=${MAPS_API_KEY}`
      );
      const data = await response.json();
      const area = data.results[0].address_components.find(
        (component) =>
          component.types.includes("sublocality") ||
          component.types.includes("locality")
      );
      setAreaName(area ? area.long_name : "Area not found");
      return area ? area.long_name : "Area not found";
    } catch (error) {
      console.error(error);
      return "Error fetching area name";
    }
  };

  const openMap = ({ latitude, longitude }) => {
    props.onCancel();

    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${latitude},${longitude}`;
    const label = "Losted Item";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url).catch((error) =>
      console.error("An error occurred", error)
    );
  };

  return (
    <Modal
      visible={props.status}
      animationType="fade"
      onRequestClose={() => props.onCancel()}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
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
          ref={refMap}
          style={styles.container}
          onRegionChangeComplete={async (Region) => {
            await getAreaName(markerPoint, "en");
            if (!isFixedView) {
              setMarkerPoint(Region);
            }
          }}
          initialRegion={{
            latitude: INlat,
            latitudeDelta: 0.6631861591450701,
            longitude: INlon,
            longitudeDelta: 0.3281260281801224,
          }}
          onMapReady={() => goToLocation()}
        >
          {isFixedView && (
            <Marker
              coordinate={markerPoint}
              onPress={() => {
                refMap.current.animateCamera({
                  center: markerPoint,
                  zoom: 16,
                });
              }}
            >
              <Entypo name={"location-pin"} size={30} color={"#660032"} />
            </Marker>
          )}
        </MapView>
        {!isFixedView && (
          <>
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
                height: "14%",
              }}
            />
          </>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isFixedView && (
            <Text style={{ marginBottom: 10 }}>{`Area Name: ${areaName}`}</Text>
          )}
          <View
            style={{
              flex: 1,
            }}
          >
            {!isFixedView ? (
              <>
                <OriginalColors
                  title={"Set Location"}
                  style={{ marginBottom: 0 }}
                  onPress={() => props.onSetLocation(markerPoint, areaName)}
                />
                <SwappedColors
                  title={"Cancel"}
                  style={{ marginBottom: 10 }}
                  onPress={() => props.onCancel()}
                />
              </>
            ) : (
              <View
                style={{
                  maxWidth: "100%",
                  minWidth: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 15,
                }}
              >
                <OriginalColors
                  title={"Navigate"}
                  style={{
                    borderBottomLeftRadius: 0,
                  }}
                  textStyle={{ fontSize: 20 }}
                  onPress={() => openMap(markerPoint)}
                />
                <OriginalColors
                  title={"Back"}
                  style={{
                    borderBottomRightRadius: 0,
                  }}
                  textStyle={{ fontSize: 20, fontWeight: "bold" }}
                  onPress={() => props.onCancel()}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
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
    marginTop: 3 + 3 - 30,
    marginLeft: -15 + 3,
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
