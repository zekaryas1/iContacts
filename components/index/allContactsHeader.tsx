import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export default function AllContactsHeader() {
  return (
    <View style={allContactsStyles.container}>
      <MaterialIcons name="contacts" size={20} color="#393E46" />
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#353535",
  },
});
