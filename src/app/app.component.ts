import {Component, Input} from '@angular/core';
import {Status} from "./client.service";
import {ApiService} from "./api.service";
import {LoaderType, LoaderThemeColor, LoaderSize} from "@progress/kendo-angular-indicators"
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PetStore';

  menuItems: MenuItem[];

  constructor(public api: ApiService) {
    this.menuItems = [
      {label: "Add Pet", icon: "pi pi-plus", routerLink: "/addPet"},
      {label: "Filter Pets", icon: "pi pi-filter", routerLink: "/filter"},
      {label: "Refresh Store", icon: "pi pi-refresh", command: () => this.loadPets()},
      {label: "Search Pets", icon: "pi pi-search", routerLink: `/pets/${this.petId}`}
    ]
  }

  @Input()
  public petId: Number = 0;

  loader = {
    type: <LoaderType>"infinite-spinner",
    themeColor: <LoaderThemeColor>"primary",
    size: <LoaderSize>"large"
  }

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets() {
    this.api.loadPets([Status.Available, Status.Pending, Status.Sold]);
  }
}
