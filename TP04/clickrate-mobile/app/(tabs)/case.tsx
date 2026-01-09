import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {View,Text,Image, StyleSheet, Animated,Pressable,ActivityIndicator} from "react-native";
import {useSplash} from "../context/SplashContext";
import BackgroundRotator from "@/components/BackgroundRotator";
import Main from "@/components/Main";

export default function Case() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return (<Text>Case ID: {id}</Text>);
}