import { View, Text } from "react-native";

interface ConditionalProps {
  when: boolean;
  show: React.ReactNode;
  elseShow?: React.ReactNode;
}

export default function Conditional({
  when,
  show,
  elseShow,
}: ConditionalProps) {
  return <>{when ? show : elseShow}</>;
}
