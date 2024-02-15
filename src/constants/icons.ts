import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

type IconViewType = {
  title: string;
  icon:
    | React.ComponentProps<typeof FontAwesome5>["name"]
    | React.ComponentProps<typeof MaterialIcons>["name"];
}[];
export const iconView: IconViewType = [
  {
    title: "Electrician",
    icon: "electrical-services",
  },
  {
    title: "Plumber",
    icon: "plumbing",
  },
  {
    title: "Painter",
    icon: "format-paint",
  },
  {
    title: "Cleaning",
    icon: "cleaning-services",
  },
];
