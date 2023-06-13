import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const LocationForm = ({ closeModal }) => {
  const [location, setLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica para guardar la ubicación seleccionada
    // Puedes enviarla al backend, almacenarla en el estado de tu aplicación, etc.
    // Por simplicidad, este ejemplo simplemente muestra la ubicación seleccionada en la consola.
    console.log("Ubicación seleccionada:", location);

    // Cierra el modal después de manejar la ubicación
    closeModal();
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso de ubicación denegado");
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      console.log("Error al obtener la ubicación:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona la ubicación de envío:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleLocationChange}
        value={location}
        placeholder="Ingresa la ubicación"
      />
      <MapView style={styles.map} initialRegion={currentLocation}>
        {currentLocation && <Marker coordinate={currentLocation} />}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  map: {
    height: 200,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4287f5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LocationForm;
