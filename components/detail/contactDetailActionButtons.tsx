import { View, StyleSheet } from "react-native";
import { CommonStyles } from "../../constants/CommonStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ContactDetailActionButtonsProps {
  onCallPress: () => void;
  onEditPress: () => void;
  onPlayPress: () => void;
  isFavorite?: Boolean;
}

export function ContactDetailActionButtons({
  onCallPress,
  onEditPress,
  onPlayPress,
}: ContactDetailActionButtonsProps) {
  return (
    <View style={styles.actionButtonsContainer}>
      <View style={styles.actionButtonsLeftContainer}>
        <MaterialIcons.Button
          name="record-voice-over"
          style={{
            paddingRight: CommonStyles.icon.paddingRight,
            borderWidth: 1,
            borderColor: CommonStyles.color.primary,
          }}
          size={CommonStyles.icon.size}
          color={CommonStyles.color.primary}
          backgroundColor={"transparent"}
          onPress={onPlayPress}
        />
        <AntDesign.Button
          name="edit"
          style={{
            paddingRight: CommonStyles.icon.paddingRight,
            borderWidth: 1,
            borderColor: CommonStyles.color.primary,
          }}
          size={CommonStyles.icon.size}
          color={CommonStyles.color.primary}
          backgroundColor={"transparent"}
          onPress={onEditPress}
        />
      </View>
      <Ionicons.Button
        name="call"
        backgroundColor={CommonStyles.color.primary}
        style={{
          width: 100,
          flex: 1,
          justifyContent: "center",
          padding: 10,
          paddingRight: CommonStyles.icon.paddingRight,
        }}
        onPress={onCallPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  actionButtonsLeftContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
