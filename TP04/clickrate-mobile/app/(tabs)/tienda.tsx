import { useEffect, useRef, useState } from "react";
import {View,Text, StyleSheet, Animated,Pressable} from "react-native";
import {useSplash} from "../context/SplashContext";
import BackgroundRotator from "@/components/BackgroundRotator";
import Main from "@/components/Main";

export default function Tienda() {
     return(
        <view>
           <Main></Main>
       </view>
     );
}