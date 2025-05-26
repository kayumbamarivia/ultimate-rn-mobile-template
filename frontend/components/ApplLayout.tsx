import React from 'react';
import { StyleSheet, View } from 'react-native'
import { layout } from "@/constants/Layout";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <View>
      <View>
      </View>
      <View>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: layout.logoWidth,
    height: layout.logoHeight,
    marginVertical: 20,
  },
});
