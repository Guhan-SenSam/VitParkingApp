/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { Screen, Text, TextField } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { colors } from "@/theme"
import { View } from "react-native"
import { PressableScale } from "react-native-pressable-scale"

interface LoginScreenProps extends AppStackScreenProps<"LoginScreen"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function EmailEntryScreen({
  navigation,
}) {
  const [email, setEmail] = useState("")

  const handleSubmit = async () => {
    // check if the email ends with @vitstudent.ac.in
    if (email.endsWith("@vitstudent.ac.in")) {
      // send token request to server
      const result = await fetch(
        "https://spirits-picked-larger-acids.trycloudflare.com/auth/request-token?email=" + email,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      console.log(result)
      navigation.navigate("CodeEntry")
    } else {
      alert("Please enter a valid VIT email ID")
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
          Enter Your Email
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
          Please enter your email ID to proceed
        </Text>

        <TextField
          containerStyle={{
            marginTop: 20,
            backgroundColor: colors.background,
          }}
          style={{ backgroundColor: colors.background, color: colors.text }}
          inputWrapperStyle={{ backgroundColor: colors.background }}
          placeholder="Email ID"
          value={email}
          onChangeText={setEmail}
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
            <Text
              preset="bold"
              style={{ textAlign: "center", color: "white", fontSize: 16 }}
              onPress={handleSubmit}
            >
              Submit
            </Text>
          </View>
        </PressableScale>
      </View>
    </Screen>
  )
})
