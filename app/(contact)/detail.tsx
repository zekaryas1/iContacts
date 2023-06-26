import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  ScrollView,
  Linking,
  RefreshControl,
  Button,
  Text,
} from "react-native";
import { Contact, EmptyContact } from "../../models/Contact";
import { CommonStyles } from "../../constants/CommonStyles";
import * as Speech from "expo-speech";
import { ContactProfileImage } from "../../components/detail/contactProfileImage";
import { ContactDetailInfoList } from "../../components/detail/contactDetailInfoList";
import { ContactDetailActionButtons } from "../../components/detail/contactDetailActionButtons";
import { useEffect, useState } from "react";
import { getContactById } from "../../db/dbOperations";
import { Image } from "expo-image";

export default function DetailContact() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [contact, setContact] = useState<Contact>(EmptyContact);
  const [loading, setLoading] = useState(false);

  const findContactById = async (id: number) => {
    setLoading(true);
    const contact = await getContactById(id);
    setContact(contact);
    setLoading(false);
  };

  useEffect(() => {
    findContactById(parseInt(id as string));
  }, []);

  if (contact == undefined) {
    return <NoDetail />;
  }

  return (
    <ScrollView
      style={CommonStyles.container}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            findContactById(parseInt(id as string));
          }}
        />
      }
    >
      <Stack.Screen
        options={{
          title: "Contact Detail",
        }}
      />

      <View
        style={{
          marginTop: 20,
        }}
      >
        <ContactProfileImage profileImageUri={contact.image} />
      </View>

      <ContactDetailInfoList contact={contact} />
      <ContactDetailActionButtons
        isFavorite={contact.isFavorite == 1}
        onPlayPress={() => {
          Speech.speak(contact.name);
        }}
        onCallPress={() => {
          Linking.openURL(`tel:${contact.phone}`);
        }}
        onEditPress={() => {
          router.push(`/manage?id=${contact.id}`);
        }}
      />
    </ScrollView>
  );
}

function NoDetail() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image
        style={{
          width: 300,
          height: 300,
        }}
        source={require("../../assets/images/nodetail.png")}
      />
      <Text>This content doesn't exist, it might be deleted</Text>
      <Button
        title="Go back"
        color={"#00ADB5"}
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}
