import { Image } from "expo-image";
import { Pressable } from "react-native";
import { CommonStyles } from "../../constants/CommonStyles";

interface ContactProfileImageProps {
  profileImageUri: string;
  onPress?: () => void;
}

export function ContactProfileImage({
  profileImageUri,
  onPress,
}: ContactProfileImageProps) {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={
          profileImageUri == ""
            ? require("../../assets/images/adaptive-icon.png")
            : profileImageUri
        }
        style={{
          ...CommonStyles.contactPhoto,
          alignSelf: "center",
          marginBottom: 20,
          backgroundColor: "#393E46",
        }}
      />
    </Pressable>
  );
}
