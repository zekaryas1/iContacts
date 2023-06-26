import { TextInput, View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Conditional from "../Conditional";
import { CommonStyles } from "../../constants/CommonStyles";

interface SearchContactsProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export default function SearchContacts({
  value,
  onChangeText,
  onClear,
}: SearchContactsProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search contacts"
        value={value}
        onChangeText={onChangeText}
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 3,
          padding: 5,
          paddingLeft: 15,
          marginVertical: 20,
        }}
      />
      <Conditional
        when={value.length > 0}
        show={
          <MaterialIcons.Button
            name="cancel-presentation"
            onPress={onClear}
            size={CommonStyles.icon.size}
            color="white"
            style={styles.icon}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    paddingRight: CommonStyles.icon.paddingRight,
    paddingLeft: 10,
    backgroundColor: CommonStyles.icon.backgroundColor,
  },
});
