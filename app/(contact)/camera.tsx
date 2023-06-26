import { Camera as ExpoCamera, CameraType, FlashMode } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  DeviceEventEmitter,
} from "react-native";
import Conditional from "../../components/Conditional";
import ImagePreview from "../../components/camera/imagePreview";
import CameraActions from "../../components/camera/cameraAction";
import { CommonStyles } from "../../constants/CommonStyles";

export default function Camera() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
  const [cameraRef, setCameraRef] = useState<ExpoCamera | null>(null);
  const [pictureInfo, setPictureInfo] = useState({
    pictureTaken: false,
    pictureUrl: "",
  });
  const router = useRouter();

  useEffect(() => {
    return () => {
      DeviceEventEmitter.removeAllListeners("event.newProfilePic");
    };
  }, []);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const toggleFlashMode = () => {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  };

  const takePicture = async () => {
    if (!cameraRef) {
      return;
    }
    const photo = await cameraRef.takePictureAsync();
    setPictureInfo({ pictureTaken: true, pictureUrl: photo.uri });
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Stack.Screen
          options={{
            title: "Permission to use camera",
          }}
        />
        <Text
          style={{ textAlign: "center", fontFamily: CommonStyles.font.primary }}
        >
          We need your permission to show the camera
        </Text>
        <Button
          onPress={requestPermission}
          color={CommonStyles.color.primary}
          title="grant permission"
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: CommonStyles.color.primaryDark }}>
      <Stack.Screen
        options={{
          title: "Take picture",
        }}
      />

      <Conditional
        when={pictureInfo.pictureTaken}
        show={
          <ImagePreview
            pictureInfoUri={pictureInfo.pictureUrl}
            onRefresh={() => {
              setPictureInfo({ pictureTaken: false, pictureUrl: "" });
            }}
            onConfirm={() => {
              DeviceEventEmitter.emit("event.newProfilePic", {
                profilePic: pictureInfo.pictureUrl,
              });
              router.back();
            }}
          />
        }
        elseShow={
          <View style={styles.camera}>
            <ExpoCamera
              type={type}
              flashMode={flash}
              ref={setCameraRef}
              style={styles.camera}
            />
            <View style={styles.cameraOverlay} />
          </View>
        }
      />

      <View style={styles.buttonsContainer}>
        <CameraActions
          toggleCameraType={toggleCameraType}
          toggleFlashMode={toggleFlashMode}
          takePicture={takePicture}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    margin: 10,
  },
  buttonsContainer: {
    height: 200,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "flex-start",
  },
  cameraOverlay: {
    position: "absolute",
    height: 250,
    width: 250,
    top: "50%",
    left: "50%",
    transform: [{ translateX: -125 }, { translateY: -125 }],
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "rgba(12,12,12, 0.4)",
  },
});
