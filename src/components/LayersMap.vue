<script setup>
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import ImageLayer from 'ol/layer/Image.js';
import ImageWMS from 'ol/source/ImageWMS.js';

let map;
let wmsLayer = null;
const showWMS = ref(false); 

onMounted (() => {
 map =  new Map({
    target: 'map-container',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
    }),
  });
});

// WMS 지도
const onWMS = () => {
  showWMS.value = !showWMS.value; 
  if(showWMS.value){
    console.log("showWMS.value = ", showWMS.value);  
    wmsLayer = new ImageLayer({
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ImageWMS({
      url: 'https://ahocevar.com/geoserver/wms',
      params: { 'LAYERS': 'topp:states' },
      ratio: 1,
      serverType: 'geoserver',
    }),
  });
  map.addLayer(wmsLayer);
  console.log(map.getLayers().getArray().includes(wmsLayer));
  }else{
    map.removeLayer(wmsLayer);
    console.log(map.getLayers().getArray().includes(wmsLayer));
    wmsLayer = null;
  }
};

</script>

<template>
  <button @click="onWMS" class="btn btn-success mb-2">    
    {{ showWMS ? 'Off WMS' : 'On WMS' }}
  </button>

  <div id='map-container'></div>
  <div>

  </div>
</template>


<style>
 #map-container {
  margin: 0;
  height: 80vh;
  width: 100%;
  font-family: sans-serif;
}
</style>