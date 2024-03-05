import { Platform, StyleSheet, Text } from "react-native";

export function AppText({
  inputText,
  stylesLing,
  onPress,
  placeholder,
  numberOfLines,
}) {
  return (
    <Text
      style={[styles.fonts, stylesLing]}
      onPress={onPress}
      numberOfLines={numberOfLines}
    >
      {inputText}
    </Text>
  );
}

const styles = StyleSheet.create({
  fonts: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Lato" : "Roboto",
  },
});
