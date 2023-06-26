import AntDesign from "@expo/vector-icons/AntDesign";
import { CommonStyles } from "../../constants/CommonStyles";

interface HeaderButtonProps {
  onPress: () => void;
}

export const HeaderButton = ({ onPress }: HeaderButtonProps) => {
  return (
    <AntDesign.Button
      style={{
        paddingRight: CommonStyles.icon.paddingRight,
      }}
      name="addusergroup"
      size={CommonStyles.icon.size}
      backgroundColor={CommonStyles.icon.backgroundColor}
      onPress={onPress}
    />
  );
};
