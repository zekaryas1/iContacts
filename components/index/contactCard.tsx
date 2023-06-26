import { useRouter } from "expo-router";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Contact } from "../../models/Contact";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CommonStyles } from "../../constants/CommonStyles";

interface ContactCardProps {
  contact: Contact;
  onDetailPress: () => void;
  onCallPress: () => void;
}

export function ContactCard({
  contact,
  onDetailPress,
  onCallPress,
}: ContactCardProps) {
  return (
    <View style={contactCardStyles.container}>
      <Pressable onPress={onDetailPress}>
        <DetailSection contact={contact} />
      </Pressable>

      <View style={contactCardStyles.callSectionContainer}>
        <CallSection contact={contact} onPress={onCallPress} />
      </View>
    </View>
  );
}

function DetailSection({ contact }: { contact: Contact }) {
  return (
    <View style={detailSectionStyles.container}>
      <View style={detailSectionStyles.profileImageContainer}>
        <Image
          style={detailSectionStyles.profileImage}
          source={contact.image}
          contentFit="fill"
          transition={1000}
        />
      </View>

      <View>
        <Text style={detailSectionStyles.contactNameText} numberOfLines={1}>
          {contact.name}
        </Text>
        <Text style={CommonStyles.mutedText}>{contact.phone}</Text>
      </View>
    </View>
  );
}

function CallSection({
  contact,
  onPress,
}: {
  contact: Contact;
  onPress: () => void;
}) {
  return (
    <>
      <View style={callSectionStyles.divider} />
      <Ionicons.Button
        backgroundColor="#EEEEEE"
        style={{
          paddingRight: CommonStyles.icon.paddingRight,
        }}
        onPress={onPress}
        name="call"
        size={CommonStyles.icon.size}
        color={CommonStyles.button.primaryColor}
      />
    </>
  );
}

const callSectionStyles = StyleSheet.create({
  divider: {
    width: 0.5,
    backgroundColor: "gray",
    height: 40,
  },
});

const detailSectionStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImageContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "blue",
  },
  profileImage: {
    flex: 1,
    width: "100%",
    borderRadius: 50,
  },
  contactNameText: {
    fontSize: 17,
    fontWeight: "700",
  },
});

const contactCardStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
    height: 70,
    borderRadius: 5,
    borderLeftColor: "#00ADB5",
    borderLeftWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    elevation: 1,
  },
  callSectionContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
});
