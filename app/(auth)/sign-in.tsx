import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({ email: "", password: "" });

  const handleSubmit = async () => {
    const { email, password } = form;
    if (!email || !password)
      return Alert.alert("Error", "Please fill all the fields");

    setIsSubmitting(true);
    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 p-5 mt-5 bg-white rounded-lg">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
        secureTextEntry={false}
        label="Email"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry
        label="Password"
      />
      <CustomButton
        title="Sign In"
        isLoading={isSubmitting}
        onPress={handleSubmit}
      />

      <View className="flex flex-row justify-center gap-2 mt-5">
        <Text className="text-gray-100 base-regular">
          Don't have an account?
        </Text>
        <Link href={"/sign-up"}>Sign Up</Link>
      </View>
    </View>
  );
};

export default SignIn;
