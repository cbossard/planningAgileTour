import { Component } from '@angular/core';


import { MapService } from '../../providers/map-service/map-service';


@Component({
  templateUrl: 'build/pages/map/map.html',
  providers: [MapService]
})
export class MapPage {
  constructor(private mapService: MapService) {}

}
