import { Component, OnInit } from '@angular/core';

import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';

import { Icon, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { get as getProjection } from 'ol/proj';
import { getTopLeft, getWidth } from 'ol/extent';

import { fromLonLat as LngLat, transform as TransCoords } from 'ol/proj';
import { Zoom, ScaleLine } from 'ol/control';

import { MapService } from './map.service';

import { LayerSwitch } from './ol-controls/layer-switch';
import { SearchBar } from './ol-controls/search-bar';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: Map;
  lat: number = 23.6978;
  lng: number = 120.9605;
  zoom: number = 7;
  lastFeature: any = null;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.getDataSet().subscribe(
      (data: any) => {
        let mapLayers = this.initMapLayers(data);
        let mapControls = this.initMapControls();
        let mapView = this.initMapView();

        this.map = new Map({
          controls: mapControls,
          layers: mapLayers,
          target: 'map',
          view: mapView,
        });

        this.map.on('pointermove', (event) => {
          let feature = this.map.forEachFeatureAtPixel(
            event.pixel,
            (feature) => {
              return feature as Feature;
            }
          );

          if (feature) {
            this.map.getTargetElement().style.cursor = 'pointer';
            this.lastFeature = feature;

            let style = feature.getStyle() as Style;
            let icon = style.getImage();

            icon.setScale(0.1);
            feature.setStyle(style);

            let element = document.createElement('div');
            element.id = 'popup';

            document.getElementById('map').appendChild(element);

            let popup = new Overlay({
              element: element,
              stopEvent: false,
              offset: [0, -50],
            });

            this.map.addOverlay(popup);

            let geometry = feature.getGeometry() as Point;
            let coordinate = geometry.getCoordinates();
            popup.setPosition(coordinate);

            element.style.padding = '5px 5px';
            element.style.fontSize = '16px';
            element.style.backgroundColor = 'white';
            element.style.borderRadius = '2px';
            element.style.left = '0%';
            element.innerHTML = 'Click to go to google street view';
          } else {
            if (this.lastFeature) {
              let lastStyle = this.lastFeature.getStyle() as Style;
              let lastIcon = lastStyle.getImage();

              lastIcon.setScale(0.08);
              this.lastFeature.setStyle(lastStyle);
              this.lastFeature = null;
            }

            let element = document.getElementById('popup');
            if (element) {
              element.parentElement.removeChild(element);
            }

            this.map.getTargetElement().style.cursor = '';
          }
        });

        this.map.on('click', (event) => {
          let feature = this.map.forEachFeatureAtPixel(
            event.pixel,
            (feature) => {
              return feature;
            }
          );

          if (feature) {
            let geometry = feature.getGeometry() as Point;
            let coordinate = geometry.getCoordinates();
            let lnglat = TransCoords(coordinate, 'EPSG:3857', 'EPSG:4326');
            let url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lnglat[1]},${lnglat[0]}`;
            window.open(url, '_blank');
          } else {
          }
        });
      },
      (err) => {}
    );
  }

  initMapLayers(dataSet: any) {
    let projection = getProjection('EPSG:3857');
    let projectionExtent = projection.getExtent();
    let size = getWidth(projectionExtent) / 256;
    let resolutions = new Array(14);
    let matrixIds = new Array(14);

    for (let z = 0; z < 14; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }

    let nlscLayer = new TileLayer({
      source: new WMTS({
        url: 'https://wmts.nlsc.gov.tw/wmts',
        layer: 'EMAP6',
        matrixSet: 'EPSG:3857',
        format: 'image/png',
        projection: projection,
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds,
        }),
        style: 'default',
        wrapX: true,
      }),
    });

    let osmLayer = new TileLayer({
      source: new OSM(),
    });

    let markerFeatures = [];

    dataSet.forEach((data) => {
      let feature = new Feature({
        geometry: new Point(LngLat([data.lng, data.lat])),
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            src: 'assets/icons/placeholder.png',
            scale: 0.08,
          }),
        })
      );

      markerFeatures.push(feature);
    });

    let markerLayer = new VectorLayer({
      source: new VectorSource({
        features: markerFeatures,
      }),
    });

    return [nlscLayer, osmLayer, markerLayer];
  }

  initMapControls() {
    return [
      new Zoom(),
      new ScaleLine(),
      new LayerSwitch(),
      new SearchBar({
        mapService: this.mapService,
      }),
    ];
  }

  initMapView() {
    return new View({
      center: LngLat([this.lng, this.lat]),
      zoom: this.zoom,
    });
  }
}
