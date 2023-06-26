import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Switch,
  Text,
} from "react-native";
import { CommonStyles } from "../../constants/CommonStyles";
import { Contact, EmptyContact } from "../../models/Contact";
import AntDesign from "@expo/vector-icons/AntDesign";
import Conditional from "../../components/Conditional";
import { ContactProfileImage } from "../../components/detail/contactProfileImage";
import { useEffect, useState } from "react";
import { DeviceEventEmitter } from "react-native";
import {
  addContact,
  deleteContact,
  getContactById,
  updateContact,
} from "../../db/dbOperations";
import * as FileSystem from "expo-file-system";

export default function AddContact() {
  const { id } = useLocalSearchParams();
  const [contact, setContact] = useState<Contact>(EmptyContact);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (id !== "new") {
      getContactById(parseInt(id as string)).then((data) => {
        setContact(data);
      });
    }

    return () => {
      DeviceEventEmitter.removeAllListeners("event.reloadContacts");
    };
  }, []);

  const deleteButton = () => {
    return (
      <AntDesign.Button
        name="delete"
        style={styles.deleteButton}
        size={CommonStyles.icon.size}
        color={"red"}
        backgroundColor={"transparent"}
        onPress={deleteUser}
      />
    );
  };

  const contactValidation = () => {
    if (!contact.name) {
      alert("Please enter a name");
      return false;
    }
    if (!contact.phone) {
      alert("Please enter a phone number");
      return false;
    }
    return true;
  };

  const manageUser = () => {
    if (contactValidation()) {
      if (contact.id) {
        updateContact(contact).then((res) => {
          alert("Contact updated successfully");
          console.log(res);
        });
      } else {
        addContact(contact).then((res) => {
          alert("Contact added successfully");
        });
      }
      DeviceEventEmitter.emit("event.reloadContacts", {});
      navigation.dispatch({ type: "POP_TO_TOP" });
    }
  };

  const deleteUser = async () => {
    try {
      const updatedContact = await deleteContact(contact);
      if (contact.image !== "") {
        await FileSystem.deleteAsync(contact.image);
      }
      DeviceEventEmitter.emit("event.reloadContacts", {});
      alert("Contact deleted successfully");
      navigation.dispatch({ type: "POP_TO_TOP" });
    } catch (e) {
      console.log(e);
    }
  };

  const listenToCameraEvent = () => {
    DeviceEventEmitter.addListener(
      "event.newProfilePic",
      async (eventData: { profilePic: string }) => {
        setContact({
          ...contact,
          image: eventData.profilePic,
        });
      }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: id === "new" ? "Add Contact" : "Edit Contact",
        }}
      />

      <ContactProfileImage
        profileImageUri={contact.image}
        onPress={() => {
          listenToCameraEvent();
          router.push("/camera");
        }}
      />

      <TextInput
        placeholder="Name"
        value={contact.name}
        keyboardType="name-phone-pad"
        onChangeText={(value) => {
          setContact({
            ...contact,
            name: value,
          });
        }}
        style={{
          ...CommonStyles.textInput,
          marginBottom: 20,
        }}
      />

      <TextInput
        placeholder="Phone"
        value={contact.phone}
        keyboardType="phone-pad"
        onChangeText={(value) => {
          setContact({
            ...contact,
            phone: value,
          });
        }}
        style={{
          ...CommonStyles.textInput,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text>is user on favorite list?</Text>
        <Switch
          value={contact.isFavorite == 1}
          onValueChange={(value) => {
            setContact({
              ...contact,
              isFavorite: value ? 1 : 0,
            });
          }}
        />
      </View>

      <View style={styles.actionButtonsContainer}>
        <Conditional when={id !== "new"} show={deleteButton()} />
        <AntDesign.Button
          name={id === "new" ? "adduser" : "reload1"}
          style={styles.mainButton}
          size={CommonStyles.icon.size}
          color={"white"}
          backgroundColor={CommonStyles.button.primaryColor}
          onPress={manageUser}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  mainButton: {
    paddingRight: CommonStyles.icon.paddingRight,
    width: 100,
    flex: 1,
    justifyContent: "center",
  },
  deleteButton: {
    paddingRight: CommonStyles.icon.paddingRight,
    borderColor: "red",
    borderWidth: 1,
  },
});
