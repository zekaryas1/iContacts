const primaryFont = "Belanosima";
const secondaryFont = "SpaceMono";
const secondaryDarkColor = "#393E46";

export const CommonStyles = {
  container: { flex: 1, paddingHorizontal: 19 },
  font: {
    primary: primaryFont,
    secondary: secondaryFont,
  },
  color: {
    primaryDark: "#222831",
    secondaryDark: secondaryDarkColor,
    primary: "#00ADB5",
    white: "#FFF",
    whitish: "#EEEEEE",
    danger: "red",
  },
  mutedText: {
    color: "gray",
    fontSize: 12,
    fontFamily: secondaryFont,
  },
  icon: {
    size: 24,
    backgroundColor: secondaryDarkColor,
    paddingRight: 0,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 15,
    fontFamily: primaryFont,
  },
  button: {
    borderRadius: 3,
  },
  contactPhoto: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: secondaryDarkColor,
  },
};
