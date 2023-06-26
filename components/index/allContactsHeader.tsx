import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { CommonStyles } from "../../constants/CommonStyles";

export default function AllContactsHeader() {
  return (
    <View style={allContactsStyles.container}>
      <MaterialIcons
        name="contacts"
        size={20}
        color={CommonStyles.color.secondaryDark}
      />
      <Text style={allContactsStyles.textStyle}>All contacts</Text>
    </View>
  );
}

const allContactsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textStyle: {
    fontFamily: CommonStyles.font.primary,
    fontSize: 20,
    color: CommonStyles.color.secondaryDark,
  },
});
