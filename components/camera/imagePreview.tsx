import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CommonStyles } from "../../constants/CommonStyles";

interface ImagePreviewProps {
  pictureInfoUri: string;
  onRefresh: () => void;
  onConfirm: () => void;
}

export default function ImagePreview({
  pictureInfoUri,
  onRefresh,
  onConfirm,
}: ImagePreviewProps) {
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: pictureInfoUri }} style={styles.image} />
      <View style={styles.cameraActionsContainer}>
        <MaterialIcons.Button
          {...styles.cameraActionsButton}
          name="refresh"
          onPress={onRefresh}
        />
        <MaterialIcons.Button
          {...styles.cameraActionsButton}
          name="check"
          onPress={onConfirm}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    margin: 10,
  },
  cameraActionsContainer: {
    position: "absolute",
    flexDirection: "row",
    gap: 10,
    bottom: 20,
    left: "33%",
    padding: 15,
  },
  cameraActionsButton: {
    color: "#ccc",
    backgroundColor: "rgba(12,12,12, 0.4)",
    size: 24,
    style: {
      paddingRight: CommonStyles.icon.paddingRight,
    },
  },
});
