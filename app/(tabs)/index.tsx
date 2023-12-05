import { View } from 'react-native'
import React, { useState, useMemo } from 'react'
import { Stack } from 'expo-router'

import listingsData from '@/assets/data/airbnb-listings.json'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'

import ExploreHeader from '@/components/ExploreHeader'
import ListingsMap from '@/components/ListingsMap'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'

const Page = () => {
  const [category, setCategory] = useState('Tiny homes')
  const items = useMemo(() => listingsData as any, [])
  const geoItems = useMemo(() => listingsDataGeo as any, [])

  const onDataChanged = (category: string) => {
    console.log('Changed to category:', category)
    setCategory(category)
  }

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
        }}
      />
      <ListingsMap listings={geoItems} />
      <ListingsBottomSheet
        listings={items}
        category={category}
      />
    </View>
  )
}

export default Page
