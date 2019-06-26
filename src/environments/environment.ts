// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndPointData: 'http://localhost:3002/',
  apiEndPointMap: 'http://arcgis1.inei.gob.pe:6080/arcgis/rest/services/DESARROLLO/DATACRIM/MapServer/',
  apiEndPointPdf: 'http://proyectos.inei.gob.pe/cpv2017/croquis-listado/urbano/CPV2017/',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
