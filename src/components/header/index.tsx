import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";

import Back from "@/assets/icons/back.svg";
import Bell from "@/assets/icons/bell.svg";
import Edit from "@/assets/icons/edit.svg";

import { ReactNode } from "react";
interface HeaderProps {
  onPressBack: () => void;
  notificationsShown?: boolean;
  editShown?: boolean;
  onPressNotifications?: () => void;
  onPressEdit?: () => void;
}

interface HeaderButtonBaseProps extends TouchableOpacityProps {
  children: ReactNode;
}
function HeaderButtonBase({ children, ...rest }: HeaderButtonBaseProps) {
  return (
    <TouchableOpacity {...rest} style={styles.headerButtonBase}>
      {children}
    </TouchableOpacity>
  );
}
export function Header({
  onPressBack,
  notificationsShown,
  onPressNotifications,
  editShown,
  onPressEdit,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <HeaderButtonBase onPress={onPressBack}>
        <Back />
      </HeaderButtonBase>

      {notificationsShown ? (
        <HeaderButtonBase>
          <Bell />
        </HeaderButtonBase>
      ) : (
        <HeaderButtonBase>
          <Edit />
        </HeaderButtonBase>
      )}
    </View>
  );
}
