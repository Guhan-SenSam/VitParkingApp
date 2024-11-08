/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { Screen, Text, TextField } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { colors } from "@/theme"
import { View } from "react-native"
import { PressableScale } from "react-native-pressable-scale"

interface CodeEntryScreenProps extends AppStackScreenProps<"CodeEntry"> {}

export const CodeEntryScreen: FC<CodeEntryScreenProps> = observer(function CodeEntryScreen({
  navigation,
}) {
  const [code, setCode] = useState("")

  const handleSubmit = () => {
    // Here you can add logic to validate the code
    if (code === "1234") {
      // Replace with actual code validation logic
      navigation.navigate("HomeScreen")
    } else {
      alert("Please enter a valid code.")
    }
  }

  return (
    <Screen preset="fixed" backgroundColor={colors.background}>
      <View style={{ padding: 20 }}>
        <Text
          preset="bold"
          style={{
            textAlign: "left",
            color: colors.text,
            marginTop: 40,
            fontSize: 32,
            lineHeight: 38,
          }}
        >
          Enter Your Code
        </Text>
        <Text
          preset="default"
          style={{
            textAlign: "left",
            color: colors.textDim,
            fontSize: 14,
            lineHeight: 16,
            marginTop: 10,
          }}
        >
          Please enter the code you received in your email
        </Text>

        <TextField
          containerStyle={{
            marginTop: 20,
            backgroundColor: colors.background,
          }}
          style={{ backgroundColor: colors.background, color: colors.text }}
          inputWrapperStyle={{ backgroundColor: colors.background }}
          placeholder="Code"
          value={code}
          onChangeText={setCode}
        />

        <PressableScale onPress={handleSubmit}>
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
              Submit
            </Text>
          </View>
        </PressableScale>
      </View>
    </Screen>
  )
})
