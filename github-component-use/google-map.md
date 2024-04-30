# Google Map

## Google Cloud Config

- [x] Enable the Map Api(https://console.cloud.google.com/apis/library/maps-backend.googleapis.com?project=disco-dispatch-421213)

- [x] Create Map API Key: https://console.cloud.google.com/apis/credentials?project=disco-dispatch-421213

## Component

- [x] @vis.gl/react-google-maps

- [x] google JS API

- [ ] google-map-react：After the latest version is introduced, an error is reported under react18. Some questioners directly recommend other components

- [ ] react-google-maps (<https://tomchentw.github.io/react-google-maps/#installation>) It supports React versions prior to 16.8 the best, but is not compatible with React 18

- [ ] @react-google-maps/api Supports the latest version and supports JS loading status. However, after the introduction of the latest react 18, the dragging map marker will flicker. The official website has not yet fixed it.

## google map options

```
{ 
  center:center,
　zoom: 15,
  gestureHandling: 'greedy' // mouse scroll zoom
}
```
