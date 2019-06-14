import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {loadModules} from 'esri-loader';
import {environment} from 'src/environments/environment';
import {ReporteService} from '../services/reporte.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {
  @ViewChild('mapViewNode', {static: false})
  private mapViewEl: ElementRef;

  private zoom = 6;
  private center: Array<number> = [-75, -9.305];

  private basemap = 'streets';
  private loaded = false;
  private map: any;
  private showLabels = true;
  private optionsApi = {
    url: 'https://js.arcgis.com/3.25/'

  };
  private apiEndPointMap = environment.apiEndPointMap;
  private anio = 2011;
  private ambitoInicial = 0;
  private tipoValor = 1;
  private ambitos = [2, 1, 0];
  private colorGris = '#9c9c9c';
  private capasTematicos = [];
  private colores = [
    {id: 0, color: '#FFF9D1'},
    {id: 1, color: '#FFF16E'},
    {id: 2, color: '#FAB700'},
    {id: 3, color: '#ED7203'},
    {id: 4, color: '#E20613'},
  ];

  constructor(private reporteService: ReporteService) {
  }


  async inicializarMapa() {
    try {
      const [Map] = await loadModules(['esri/map'], this.optionsApi);
      let mapOptions = {
        basemap: this.basemap,  // For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
        center: this.center, // longitude, latitude
        zoom: this.zoom,
        showLabels: this.showLabels,

      };
      this.map = new Map(this.mapViewEl.nativeElement, mapOptions);

    } catch (error) {
      console.log('EsriLoader: ', error);

    }
  }


  async addCapa(url, index) {
    try {
      var capa = {};
      const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer'], this.optionsApi);
      var urlFeature = `${url}/${index}`;
      var visible = false;
      (this.ambitoInicial == index) ? visible = true : false;

      var layer = new FeatureLayer(urlFeature, {
        maxScale: 0,
        minScale: 0,
        showLabels: false,
        visible: true

      });

      capa = {layer: layer, id: index};

      this.map.addLayer(layer);
      this.capasTematicos.push(capa);


    } catch (error) {
      console.log('EsriLoader: ', error);
    }

  }

  ngOnInit() {
    this.inicializarMapa().then(_ => {
      this.ambitos.forEach(a => {

        this.addCapa(this.apiEndPointMap, a).then(_ => {
          /*if (a === 0) {
            this.esriMapService.obtenerDatosMapaTematico().subscribe(res => {
            });
          }*/
        });

      });

      this.reporteService.getDataAvanceSegmentacion(0).subscribe(res => {
          console.log('getDataAvanceSegmentacion res', res);
        }
      );
    });

  }

}
