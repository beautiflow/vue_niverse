import { Image as ImageLayer } from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import { fromLonLat } from 'ol/proj';

let polygonLayer = null;

export function toggleMyGeoPolygon(map, showPolygonRef, setViewPosition) {
  showPolygonRef.value = !showPolygonRef.value;

  if (showPolygonRef.value) {
    polygonLayer = new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8081/geoserver/geoS/wms?service=WMS',
        params: {
          'VERSION': '1.1.0',
          'LAYERS': 'polygon',
          'SRS': 'EPSG:4326',
          'FORMAT': 'image/png'
        },
        ratio: 1,
        serverType: 'geoserver',
      }),
    });

    setViewPosition({
      center: fromLonLat([127.3905, 36.3705]),
      zoom: 16,
    });
    console.log(polygonLayer);

    map.addLayer(polygonLayer);
  } else {
    map.removeLayer(polygonLayer);
    setViewPosition();
    polygonLayer = null;
  }
}
