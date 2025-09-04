import { images } from "@/constants";
import { Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const _layout = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        className="h-full bg-white"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="relative w-full"
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className="rounded-b-lg size-full"
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="absolute z-10 self-center -bottom-16 size-48"
          />
        </View>

        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default _layout;
