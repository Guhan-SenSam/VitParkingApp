/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { AutoImage, Screen, Text } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { colors } from "@/theme"
import { Image, View } from "react-native"
import DropShadow from "react-native-drop-shadow"
import { PressableScale } from "react-native-pressable-scale"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen({
  navigation,
}) {
  return (
    <Screen preset="fixed" backgroundColor={colors.background} style={{ marginTop: 20 }}>
      <Image
        source={require("assets/images/vit_logo.png")}
        style={{
          alignSelf: "center",
          transform: [{ scale: 0.6 }],
        }}
      />
      <View>
        <DropShadow
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 5,
          }}
        >
          <AutoImage
            source={require("assets/images/logo.webp")}
            style={{ width: 300, height: 300, alignSelf: "center", borderRadius: 20 }}
          />
        </DropShadow>
        <Text
          preset="bold"
          style={{
            textAlign: "center",
            color: colors.text,
            marginTop: 40,
            fontSize: 32,
            lineHeight: 38,
          }}
        >
          VIT Parking Finder
        </Text>
        <Text
          preset="default"
          style={{ textAlign: "center", color: colors.textDim, fontSize: 14, lineHeight: 16 }}
        >
          Find your parking spot with ease
        </Text>
        <PressableScale onPress={() => navigation.navigate("LoginScreen")}>
          <View
            style={{
              marginTop: 80,
              backgroundColor: colors.primary,
              width: 300,
              alignSelf: "center",
              borderRadius: 10,
              padding: 10,
              height: 50,
              alignItems: "center",
            }}
          >
            <Text preset="bold" style={{ textAlign: "center", color: "white", fontSize: 16 }}>
              Get Started
            </Text>
          </View>
        </PressableScale>
      </View>
    </Screen>
  )
})
