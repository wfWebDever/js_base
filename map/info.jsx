import React, { useRef, useEffect } from 'react'

const CustomMarker = ({ map, googleMaps, selectId, data }) => {
  const divRef = useRef(null)

  const { position, id } = data

  useEffect(() => {
    if (!googleMaps || !map || !data) {
      return
    }
    class CustomMarkerOverlay extends googleMaps.OverlayView {
      constructor() {
        super()
        // this.setMap(map)
      }

      onAdd() {
        const div = divRef.current
        div.style.position = 'absolute'
        const panes = this.getPanes()
        panes.floatPane.appendChild(div)
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
        div.style.left = `${point.x - 75}px`
        div.style.top = `${point.y - 100}px`
      }

      onRemove() {
        const div = divRef.current
        div.parentNode.removeChild(div)
      }
    }

    const customMarkerOverlay = new CustomMarkerOverlay()
    customMarkerOverlay.setMap(map)

    return () => customMarkerOverlay.setMap(null)
  }, [map, googleMaps, position, data])

  return (
    <div ref={divRef} id={'info-' + id}>
      {selectId === id ? (
        <div className="bg-black w-[150px] h-[100px]">
          <div className="py-5 h-10">11111</div>
          <div className="py-5 h-20">content</div>
          <div className="py-5 h-10">footer</div>
        </div>
      ) : null}
    </div>
  )
}

export default React.memo(CustomMarker)
