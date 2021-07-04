import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '../../../environments/environment';
import { DataService } from '../../services/data.service';
import { Resource } from '../../models/resource';
import { TreeNode } from '../../models/treenode';
import { OperationsService } from '../../services/operations.service';
import { Message } from '../../models/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  // draw map
  x1 = environment.x1;
  y1 = environment.y1;
  x2 = environment.x2;
  y2 = environment.y2;

  map: any
  markers: any[] = []

  greenIcon = L.icon({
    iconUrl: 'assets/marker-icon-green.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  greyIcon = L.icon({
    iconUrl: 'assets/marker-icon-grey.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  // resources
  resources: Resource[] = []
  filteredResources: Resource[] = []

  // options 
  resourcesTypes: String[] = []
  options: TreeNode[] = []

  dataSubscription: Subscription
  refreshMapSubscription: Subscription

  constructor(
    private data: DataService,
    private op: OperationsService
  ) { }

  ngOnInit(): void {
    this.dataSubscription = this.data.getResources().subscribe(
      res => {
        this.resources = res
        this.filteredResources = res
        this.drawMarkers(this.map)
        this.fillResourcesTypes()
        this.fillResourcesTypesNode()
      },
      error => console.log(error),
      () => {
        console.log(`${this.resources.length} recursos cargados`)
      }
    )
    this.refreshMapSubscription = this.op.refresMap.subscribe(
      (message: Message) => {
        console.log("Criterio de filtro: ", message)
        this.refreshMap(message)
      },
      error => {
        console.log(error)
      }

    )
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe()
    this.refreshMapSubscription.unsubscribe()
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.getCenterCoords(this.x1, this.x2, this.y1, this.y2),
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  public getCenterCoords(x1: number, x2: number, y1: number, y2: number) {
    return [this.calculateMidPoint(x1, x2), this.calculateMidPoint(y1, y2)]
  }

  public calculateMidPoint(a: number, b: number) {
    a = a || 0, b = b || 0

    return (a + b) / 2
  }

  private drawMarkers(map: L.map) {
    for (const r of this.filteredResources) {
      const lon = r.x, lat = r.y
      let marker

      if (r.batteryLevel >= 25) {
        marker = L.marker([lat, lon], { icon: this.greenIcon })
      } else {

        marker = L.marker([lat, lon], { icon: this.greyIcon });
      }
      marker.addTo(map)
      const string = `Matrícula: <strong>${r.licencePlate}</strong><br>Batería: ${r.batteryLevel}%`
      marker.bindPopup(string);
      this.markers.push(marker)
    }
  }

  private removeMarckers() {
    for (let m of this.markers) {
      this.map.removeLayer(m)
    }
  }

  private filterResources(message: Message) {
    if (!message.value) {
      this.filteredResources = this.resources.filter(r => r[message.type] != message.name.toUpperCase())
    }
    if (message.value) {
      this.filteredResources = this.resources
    }
  }

  private refreshMap(message: Message) {
    this.filterResources(message)
    this.removeMarckers()
    this.drawMarkers(this.map)
  }

  private fillResourcesTypes() {
    for (const r of this.resources) {
      if (!this.resourcesTypes.includes(r.resourceType)) {
        this.resourcesTypes.push(r.resourceType)
      }
    }
  }

  private fillResourcesTypesNode() {
    let typesNodes: TreeNode[] = [];

    for (let rt of this.resourcesTypes) {
      let typeNode: TreeNode = {
        name: rt.charAt(0).toUpperCase() + rt.slice(1).toLowerCase(),
        showChildren: false,
        type: "resourceType",
        children: []
      }
      typesNodes.push(typeNode)
    }
    this.options.push(
      {
        name: "Tipo de Vehiculo",
        showChildren: true,
        type: "resourceType",
        children: typesNodes
      }
    )
  }
  // public refreshResources(event: string) {
  //   console.log("refreshResources ", event)
  // }
}
