import { Image } from 'expo-image';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { layout } from "@/constants/Layout";
const homeImage = require('@/assets/images/car7.png');
const WhiteLogo = require('@/assets/images/logo-white.png');
const { width, height } = Dimensions.get('window');

export default function Index() {
  const handleOnClick = ()=>{
    router.push('/(auth)/Login')
  }
  return (
    <View className="flex-1">
      {/* Background Image */}
      <Image 
        source={homeImage} 
        contentFit="cover" 
        style={styles.backgroundImage} 
      />

      {/* Content Container */}
      <View className="absolute inset-0 flex-1">
        {/* Logo Container */}
        <View className="items-center pt-16">
          <Image 
            source={WhiteLogo} 
            style={styles.logo} 
            contentFit="contain" 
          />
        </View>

        {/* Bottom Content */}
        <View className="absolute bottom-16 w-full px-6">
          <View className="items-center space-y-1 mb-8">
            <Text className="text-white font-poppins-medium text-2xl text-center">
              Join the community and
            </Text>
            <Text className="text-white font-poppins-medium text-2xl text-center">
              showcase your car
            </Text>
          </View>
          
          <TouchableOpacity onPress={()=>handleOnClick()} className="bg-primary items-center p-4 rounded-full">
            <Text className="font-poppins-bold text-2xl text-white">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: layout.fullWidth,
    height: layout.fullHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  logo: {
    width: layout.logoWidth,
    height: layout.logoHeight,
  }
});