import {
  Linking,
  RefreshControl,
  SectionList,
  View,
  Text,
  Button,
  DeviceEventEmitter,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import SearchContacts from "../../components/index/searchContacts";
import FavoriteContacts from "../../components/index/favoriteContacts";
import {
  Contact,
  SectionedContact,
  getFavoriteContacts,
  groupContacts,
} from "../../models/Contact";
import { CommonStyles } from "../../constants/CommonStyles";
import { HeaderButton } from "../../components/index/headerButton";
import { ContactCard } from "../../components/index/contactCard";
import AllContactsHeader from "../../components/index/allContactsHeader";
import { AllContactsSectionHeader } from "../../components/index/allContactsSectionHeader";
import { useEffect, useState } from "react";
import Conditional from "../../components/Conditional";
import { readAllContacts, searchContacts } from "../../db/dbOperations";
import { Image } from "expo-image";

export default function Contacts() {
  const router = useRouter();
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [sectionedContacts, setSectionedContacts] = useState<
    SectionedContact[]
  >([]);
  const [favoriteContacts, setFavoriteContacts] = useState<Contact[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSectionedContacts(groupContacts(allContacts));
    setFavoriteContacts(getFavoriteContacts(allContacts));
  }, [allContacts]);

  useEffect(() => {
    getOrSearchAllContact();
  }, [searchText]);

  const getOrSearchAllContact = async () => {
    setLoading(true);
    const contacts =
      searchText.length === 0
        ? await readAllContacts()
        : await searchContacts(searchText);
    setAllContacts([...contacts]);
    setLoading(false);
  };

  const listenToReloadEvent = () => {
    DeviceEventEmitter.addListener(
      "event.reloadContacts",
      async (eventData) => {
        getOrSearchAllContact();
      }
    );
  };

  if (allContacts.length == 0) {
    return (
      <NoContact
        onReloadPress={() => {
          setSearchText("");
          getOrSearchAllContact();
        }}
        onHeaderButtonPress={() => {
          listenToReloadEvent();
          router.push("/manage?id=new");
        }}
      />
    );
  }

  return (
    <View style={CommonStyles.container}>
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              getOrSearchAllContact();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <ContactHeader
              onButtonPress={() => {
                listenToReloadEvent();
                router.push("/manage?id=new");
              }}
            />
            <SearchContacts
              value={searchText}
              onChangeText={(newValue: string) => {
                setSearchText(newValue);
              }}
              onClear={() => {
                setSearchText("");
              }}
            />
            <Conditional
              when={searchText.length === 0}
              show={
                <FavoriteContacts
                  favoriteContacts={favoriteContacts}
                  onPress={(contact: Contact) => {
                    Linking.openURL(`tel:${contact.phone}`);
                  }}
                />
              }
            />
            <AllContactsHeader />
          </>
        }
        sections={sectionedContacts}
        renderItem={({ item }) => {
          return (
            <ContactCard
              contact={item}
              onDetailPress={() => {
                listenToReloadEvent();
                router.push(`/detail?id=${item.id}`);
              }}
              onCallPress={() => {
                Linking.openURL(`tel:${item.phone}`);
              }}
            />
          );
        }}
        renderSectionHeader={({ section: { title } }) => {
          return <AllContactsSectionHeader title={title} />;
        }}
      />
    </View>
  );
}

function ContactHeader({ onButtonPress }: { onButtonPress: () => void }) {
  return (
    <Stack.Screen
      options={{
        title: "Contacts",
        headerRight: () => {
          return <HeaderButton onPress={onButtonPress} />;
        },
      }}
    />
  );
}

function NoContact({
  onReloadPress,
  onHeaderButtonPress,
}: {
  onReloadPress: () => void;
  onHeaderButtonPress: () => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <ContactHeader onButtonPress={onHeaderButtonPress} />
      <Image
        style={{
          width: 300,
          height: 300,
        }}
        source={require("../../assets/images/nocontact.png")}
      />
      <Text
        style={{
          fontFamily: CommonStyles.font.primary,
        }}
      >
        Click The plus icon on the header to add or
      </Text>
      <Button title="Reload" color={CommonStyles.color.primary} onPress={onReloadPress} />
    </View>
  );
}
