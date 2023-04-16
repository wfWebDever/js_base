import React, { useRef, useEffect } from 'react'

const CustomMarker = ({ map, googleMaps, data, onClick }) => {
  const divRef = useRef(null)

  const { position, text, id } = data

  useEffect(() => {
    class CustomMarkerOverlay extends google.maps.OverlayView {
      constructor() {
        super()
        this.setMap(map)
      }

      onAdd() {
        const div = divRef.current
        div.style.position = 'absolute'
        const panes = this.getPanes()
        panes.overlayMouseTarget.appendChild(div)
      }

      draw() {
        const { lat, lng } = position
        const projection = this.getProjection()
        const point = projection.fromLatLngToDivPixel(
          new googleMaps.LatLng(lat, lng)
        )
        // const sw = overlayProjection.fromLatLngToDivPixel(
        //   this.bounds.getSouthWest()
        // )
        // const ne = overlayProjection.fromLatLngToDivPixel(
        //   this.bounds.getNorthEast()
        // )

        const div = divRef.current
        div.style.left = `${point.x}px`
        div.style.top = `${point.y}px`
      }

      onRemove() {
        const div = divRef.current
        div.parentNode.removeChild(div)
      }
    }

    const customMarkerOverlay = new CustomMarkerOverlay()
    customMarkerOverlay.setMap(map)

    return () => customMarkerOverlay.setMap(null)
  }, [map, googleMaps, position])

  return (
    <div
      ref={divRef}
      id={'marker-' + id}
      className="w-10 px-5 py-5  bg-red text-white center"
      onClick={() => onClick(data)}
    >
      {text}
    </div>
  )
}

export default React.memo(CustomMarker)
