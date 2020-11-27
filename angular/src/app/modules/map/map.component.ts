import { Component, OnInit } from '@angular/core';

import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
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

import { Wonder } from 'src/app/shared/models/wonder.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private map: Map;
  private lat: number = 23.6978;
  private lng: number = 120.9605;
  private zoom: number = 7;

  private initMarkerStyle = new Style({
    image: new Icon({
      src: 'assets/icons/placeholder.png',
      scale: 0.08,
    }),
  });

  private highlightMarkerStyle = new Style({
    image: new Icon({
      src: 'assets/icons/placeholder.png',
      scale: 0.1,
    }),
  });

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    let mapLayers = this.initMapLayers();
    let mapControls = this.initMapControls();
    let mapView = this.initMapView();

    this.map = new Map({
      controls: mapControls,
      layers: mapLayers,
      target: 'map',
      view: mapView,
    });

    this.mapService.getDataSet().subscribe(
      (data: Wonder) => {
        this.map.addLayer(this.generateMarkerLayer(data));
      },
      (err) => {
        console.log(err);
      }
    );

    var selected = null;
    var status = document.getElementById('status');

    this.map.on('pointermove', (event) => {
      if (selected !== null) {
        selected.setStyle(this.initMarkerStyle);
        selected = null;
      }

      this.map.forEachFeatureAtPixel(event.pixel, (feature: Feature) => {
        selected = feature;
        feature.setStyle(this.highlightMarkerStyle);
        return true;
      });

      if (selected) {
        status.innerHTML = '&nbsp;Hovering: ' + selected.get('name');
      } else {
        status.innerHTML = '&nbsp;';
      }
    });

    this.map.on('click', (event) => {
      let feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        return feature;
      });

      if (feature) {
        let geometry = feature.getGeometry() as Point;
        let coordinate = geometry.getCoordinates();
        let lnglat = TransCoords(coordinate, 'EPSG:3857', 'EPSG:4326');
        let url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lnglat[1]},${lnglat[0]}`;
        window.open(url, '_blank');
      } else {
      }
    });
  }

  initMapLayers() {
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

    return [nlscLayer, osmLayer];
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

  generateMarkerLayer(dataSet: any) {
    let markerFeatures = [];

    dataSet.forEach((data: any) => {
      let feature = new Feature({
        geometry: new Point(LngLat([data.lng, data.lat])),
      });
      feature.setStyle(this.initMarkerStyle);

      markerFeatures.push(feature);
    });

    let markerLayer = new VectorLayer({
      source: new VectorSource({
        features: markerFeatures,
      }),
    });

    return markerLayer;
  }

  initMapView() {
    return new View({
      center: LngLat([this.lng, this.lat]),
      zoom: this.zoom,
    });
  }
}
