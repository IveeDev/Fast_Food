import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    const { email, name, password } = form;
    if (!name || !email || !password)
      return Alert.alert("Error", "Please fill all the fields");

    setIsSubmitting(true);
    try {
      // await signIn(form);
      await createUser({
        email,
        password,
        name,
      });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 p-5 mt-5 bg-white rounded-lg">
      <CustomInput
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        secureTextEntry={false}
        label="Full Name"
      />
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
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={handleSubmit}
      />

      <View className="flex flex-row justify-center gap-2 mt-5">
        <Text className="text-gray-100 base-regular">
          Already have an account?
        </Text>
        <Link href={"/sign-in"}>Sign In</Link>
      </View>
    </View>
  );
};

export default SignUp;
