import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { Contact, ContactData } from "../../models/Contact";
import { Fontisto } from "@expo/vector-icons";

interface FavoriteContactsProps {
  favoriteContacts: Contact[];
  onPress: (contact: Contact) => void;
}

export default function FavoriteContacts({
  onPress,
  favoriteContacts,
}: FavoriteContactsProps) {
  return (
    <View>
      <View style={favoriteContactsStyles.headerTextContainer}>
        <Fontisto name="favorite" size={18} color="#393E46" />
        <Text style={favoriteContactsStyles.headerText}>
          Favorites contacts
        </Text>
      </View>

      <View
        style={{
          marginBottom: 20,
        }}
      >
        <FlatList
          horizontal={true}
          data={favoriteContacts}
          renderItem={(info: { item: Contact }) => {
            return (
              <FavoriteContact
                contact={info.item}
                onPress={() => {
                  onPress(info.item);
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

function FavoriteContact({
  contact,
  onPress,
}: {
  contact: Contact;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={favoriteContactStyles.container}>
        <Image
          style={favoriteContactStyles.image}
          source={
            contact.image == ""
              ? require("../../assets/images/adaptive-icon.png")
              : contact.image
          }
          transition={1000}
        />
        <Text numberOfLines={2} style={favoriteContactStyles.contactName}>
          {contact.name}
        </Text>
      </View>
    </Pressable>
  );
}

const favoriteContactsStyles = StyleSheet.create({
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  headerText: {
    fontFamily: "SpaceMono",
    fontSize: 20,
    fontWeight: "bold",
    color: "#353535",
  },
});

const favoriteContactStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: 100,
    backgroundColor: "#fff",
    marginRight: 15,
    borderRadius: 5,
    borderBottomColor: "#00ADB5",
    borderBottomWidth: 2,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderWidth: 1.5,
    borderColor: "#00ADB5",
    borderRadius: 100,
    marginBottom: 5,
    backgroundColor: "#393E46",
  },
  contactName: {
    textAlign: "center",
    fontWeight: "400",
    color: "#393E46",
  },
});
