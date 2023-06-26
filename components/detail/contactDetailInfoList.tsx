import { View, Text, StyleSheet } from "react-native";
import { CommonStyles } from "../../constants/CommonStyles";
import { Contact } from "../../models/Contact";

export function ContactDetailInfoList({ contact }: { contact: Contact }) {
  return (
    <View style={styles.container}>
      <Text style={CommonStyles.mutedText}>Name</Text>
      <Text style={styles.detailInfoText}>{contact.name}</Text>
      <Text style={CommonStyles.mutedText}>Phone</Text>
      <Text style={styles.detailInfoText} selectable>
        {contact.phone}
      </Text>
      <Text style={CommonStyles.mutedText}>Is favorite</Text>
      <Text style={styles.detailInfoText}>
        {contact.isFavorite ? "Yes" : "No"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  detailInfoText: {
    fontFamily: CommonStyles.font.primary,
    fontSize: 20,
    marginBottom: 15,
  },
});
