import React, { useState, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import Marker from './marker'
import Info from './info'

const center = { lat: 34.0211769, lng: -118.3012355 }

function GoogleMap({ data }) {
  const [loadError, setLoadError] = useState(false)
  const [map, setMap] = useState(null)
  const [googleMaps, setGoogleMaps] = useState(null)
  const [markers, setMarkers] = useState([])
  const [selectId, setSelectId] = useState('')

  const onClickMarker = (markerData) => {
    console.info(111, markerData)
    setSelectId(markerData.id)
  }

  useEffect(() => {
    const loader = new Loader({
      googleMapsApiKey: '',
      libraries: []
      // version: 'weekly'
    })

    loader
      .load()
      .then(() => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: center,
          zoom: 14,
          language: 'en-us',
          gestureHandling: 'greedy'
        })
        setMap(map)
        setGoogleMaps(window.google.maps)
      })
      .catch(() => {
        setLoadError(true)
      })
  }, [])

  const autoTransFrom = (values) => {
    const bounds = new googleMaps.LatLngBounds()
    // 将所有标记的位置添加到边界框中
    console.info(values)
    values.forEach(({ position }) => {
      const { lat, lng } = position
      bounds.extend(new googleMaps.LatLng(lat, lng))
    })
    // 调整地图缩放级别和中心点
    map.fitBounds(bounds)
  }

  useEffect(() => {
    if (map) {
      const markers = (data || [])
        .filter((val) => val.lat && val.lng)
        .map(({ lat, lng, id }) => {
          return {
            position: { lat, lng },
            text: 111,
            id
          }
        })
      setMarkers([...markers])
      autoTransFrom(markers)
    }
  }, [map, googleMaps, data])

  if (loadError) {
    return (
      <div className="w-full h-full ">
        Map cannot be loaded right now, sorry.
      </div>
    )
  }

  return (
    <div id="map" className="w-full h-full">
      {markers.map((marker) => (
        <Marker
          key={'marker-' + marker?.id}
          map={map}
          googleMaps={googleMaps}
          data={marker}
          onClick={onClickMarker}
        ></Marker>
      ))}
      {markers.map((marker) => (
        <Info
          key={'info-' + marker?.id}
          map={map}
          googleMaps={googleMaps}
          data={marker}
          selectId={selectId}
          onClick={onClickMarker}
        ></Info>
      ))}
    </div>
  )
}

export default React.memo(GoogleMap)
