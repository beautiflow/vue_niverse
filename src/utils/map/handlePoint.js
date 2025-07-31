import axios from 'axios';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import { fromLonLat } from 'ol/proj';

export async function toggleMyGeoPoint(map, showMyGeoPoint, setViewPosition, myGeoVectorRef) {
  showMyGeoPoint.value = !showMyGeoPoint.value;

  if (showMyGeoPoint.value) {
    const response = await axios.get('/geoserver/geoS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geoS%3Apoint&outputFormat=application%2Fjson');

    const vectorSource2 = new VectorSource({
      features: new GeoJSON().readFeatures(response.data, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      }),
    });

    const layer = new VectorLayer({
      source: vectorSource2,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: 'rgba(255, 255, 0, 1)' }),
          stroke: new Stroke({ color: '#ff0000', width: 2 })
        })
      }),
    });

    myGeoVectorRef.value = layer;
    map.addLayer(layer);

    setViewPosition({
      center: fromLonLat([127.3905, 36.3705]),
      zoom: 16,
    });
  } else {
    map.removeLayer(myGeoVectorRef.value);
    setViewPosition();
  }
}
