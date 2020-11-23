import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [faces, setFaces] = useState([]);

  const faceDetected = ({ faces }) => {
    setFaces(faces); // instead of setFaces({faces})
    console.log({ faces });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        onFacesDetected={faceDetected}
        FaceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 5000,
          tracking: false,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
        </View>
        {faces[0] && (
          <View
            style={[
              styles.rectangle,
              {
                top: faces[0].bounds.origin.y,
                width: faces[0].bounds.size.width,
                left: faces[0].bounds.origin.x,
                height: faces[0].bounds.size.height,
              },
            ]}
          >
            <View style={styles.topBar}>
              <Text style={styles.textcolor}>
                x: {faces.length ? faces[0].bounds.origin.x.toFixed(0) : 0}
                {"    "}y:{" "}
                {faces.length ? faces[0].bounds.origin.y.toFixed(0) : 0}
              </Text>
              <Text style={styles.textcolor}></Text>
              <Text style={styles.textcolor}>สายตาคนโกรธรัฐบาล 😤</Text>
            </View>
          </View>
        )}
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  imageContainer: {
    width: 300,
    height: 250,
    alignSelf: "center",
  },

  image: {
    width: 300,
    height: 250,
  },
  rectangle: {
    borderWidth: 4,
    borderColor: "blue",
    position: "absolute",
  },
  textcolor: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    backgroundColor:"black"
  },
});
