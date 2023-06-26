import { Text } from "react-native";
import { CommonStyles } from "../../constants/CommonStyles";

export function AllContactsSectionHeader({ title }: { title: string }) {
  return (
    <Text
      style={{
        fontSize: 18,
        fontFamily: CommonStyles.font.primary,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 3,
        paddingLeft: 10,
        backgroundColor: CommonStyles.color.white,
      }}
    >
      {title}
    </Text>
  );
}
