import {Component, OnInit} from '@angular/core';
import {Pet, Status} from "../client.service";
import {ApiService} from "../api.service";
import {from, map, Observable} from "rxjs";
import {SelectableSettings, SelectionEvent} from "@progress/kendo-angular-grid";
import {Router} from "@angular/router";

@Component({
  selector: 'app-filter-pets',
  templateUrl: './filter-pets.component.html',
  styleUrls: ['./filter-pets.component.css']
})
export class FilterPetsComponent implements OnInit {

  public selectedPets$: Observable<Pet[]> = from([]);

  filter = [
    {status: Status.Available, checked: true},
    {status: Status.Pending, checked: true},
    {status: Status.Sold, checked: true}
  ]

  selectedFilters: { checked: boolean; status: Status }[] = [{status: Status.Available, checked: true}];
  showKendo = false;
  selectableSettings: SelectableSettings = {
    enabled: true,
    mode: "single"
  };

  constructor(
    public api: ApiService,
    public router: Router) {
  }

  ngOnInit(): void {
    this.toggleFilters();

  }

  toggleFilters() {
    this.selectedPets$ = this.api.pets$.pipe(
      map(pets => pets
        .filter(p => this.selectedFilters //filter all pets
          .filter(c => c.checked) //filter for checked states
          .map(x => x.status) //extract status from filter object
          .some(f => f.toString() == p.status!.toString()))), //check pet for matching status
    );
  }

  goToSelection($event: SelectionEvent) {
    let id = $event.selectedRows?.[0].dataItem.id;
    this.router.navigate(["pets", `${id}`])
  }
}
