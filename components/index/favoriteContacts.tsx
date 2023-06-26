import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { Contact } from "../../models/Contact";
import { Fontisto } from "@expo/vector-icons";
import { CommonStyles } from "../../constants/CommonStyles";

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
        <Fontisto
          name="favorite"
          size={18}
          color={CommonStyles.color.secondaryDark}
        />
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
    fontFamily: CommonStyles.font.primary,
    fontSize: 20,
    color: CommonStyles.color.secondaryDark,
  },
});

const favoriteContactStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: 100,
    backgroundColor: CommonStyles.color.white,
    marginRight: 15,
    borderRadius: 5,
    borderBottomColor: CommonStyles.color.primary,
    borderBottomWidth: 2,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderWidth: 0.15,
    borderRadius: 100,
    marginBottom: 5,
  },
  contactName: {
    fontFamily: CommonStyles.font.primary,
    textAlign: "center",
    fontSize: 12,
  },
});
