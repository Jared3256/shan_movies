import { View, Text } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View className="mt-20 self-center w-16 h-16 bg-tint animate-ping delay-100 rounded-full"></View>
  );
}
