import { StyleSheet, View, Text } from 'react-native'
import React, { memo } from 'react'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapView from 'react-native-map-clustering'

import { defaultStyles } from '@/constants/Styles'
import { ListingGeo } from '@/interfaces/listingGeo'
import { useRouter } from 'expo-router'

const INITIAL_REGION = {
  latitude: 52,
  longitude: 13,
  latitudeDelta: 9,
  longitudeDelta: 9
}

interface Props {
  listings: any
}

const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter()

  const onMarkerSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`)
  }

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster
    const points = properties.point_count

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0]
        }}
      >
        <View style={styles.marker}>
          <Text style={{ color: '#000', alignItems: 'center', fontFamily: 'mon-sb' }}>{points}</Text>
        </View>
      </Marker>
    )
  }

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {listings?.features?.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>$ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  )
})

export default ListingsMap

const styles = StyleSheet.create({
  marker: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 6,

    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10
    }
  },
  markerText: {
    fontFamily: 'mon-sb',
    fontSize: 14
  }
})
