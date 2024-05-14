<script setup>
const props = defineProps({
  track: { type: Array, default: () => [] }
})

const { lat, lng, scale, mapPolyline, mapMarkers } = useMapGridTrack(props.track)
</script>

<template>
  <map
    id="test"
    v-if="{{showMap}}"
    style="width: 100%; height: 100%"
    latitude="{{lat}}"
    longitude="{{lng}}"
    scale="{{scale}}"
    polyline="{{mapPolyline}}"
    markers="{{mapMarkers}}"
  ></map>
</template>

<style lang="scss"></style>
