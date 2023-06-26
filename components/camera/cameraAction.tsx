import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
import { CommonStyles } from "../../constants/CommonStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface CameraActionsProps {
  toggleCameraType: () => void;
  toggleFlashMode: () => void;
  takePicture: () => void;
}

export default function CameraActions({
  toggleCameraType,
  toggleFlashMode,
  takePicture,
}: CameraActionsProps) {
  return (
    <>
      <MaterialIcons.Button
        name="flip-camera-ios"
        style={styles.iconButtons}
        size={30}
        onPress={toggleCameraType}
      />
      <MaterialIcons.Button
        name="linked-camera"
        style={styles.iconButtons}
        size={50}
        onPress={takePicture}
      />
      <MaterialCommunityIcons.Button
        name="flash-off"
        style={styles.iconButtons}
        size={30}
        onPress={toggleFlashMode}
      />
    </>
  );
}

const styles = StyleSheet.create({
  iconButtons: {
    paddingRight: CommonStyles.icon.paddingRight,
    color: "#fff",
    backgroundColor: "#00ADB5",
  },
});
