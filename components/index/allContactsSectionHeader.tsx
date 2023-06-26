import {
  Text
} from "react-native";


export function AllContactsSectionHeader({ title }: { title: string }) {
  return (
    <Text
      style={{
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 3,
        paddingLeft: 10,
        color: "#222831",
        backgroundColor: "#fff",
      }}
    >
      {title}
    </Text>
  );
}
