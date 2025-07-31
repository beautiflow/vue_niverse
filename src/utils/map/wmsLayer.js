import ImageLayer from 'ol/layer/Image.js';
import ImageWMS from 'ol/source/ImageWMS.js';

let wmsLayer = null;

export function toggleWMS(map, showWMS, setViewPosition) {
  showWMS.value = !showWMS.value; 
  if(showWMS.value){
    wmsLayer = new ImageLayer({
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ImageWMS({
      url: 'https://ahocevar.com/geoserver/wms',
      params: { 'LAYERS': 'topp:states' },
      ratio: 1,
      serverType: 'geoserver',
    }),
  });
   
  setViewPosition({
    center: [-10997148, 4569099],
    zoom: 4,
  });    
    
    map.addLayer(wmsLayer);
  }else{
    map.removeLayer(wmsLayer);
    setViewPosition();
    wmsLayer = null;
  }
};