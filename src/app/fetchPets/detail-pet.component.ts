import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Pet} from "../client.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, of, switchMap, tap} from "rxjs";
import {ApiService} from "../api.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fetchPets',
  templateUrl: './detail-pet.component.html',
  styleUrls: ['./detail-pet.component.css']
})
export class DetailPetComponent implements OnInit, AfterViewInit {

  selectedPet$: Observable<Pet | undefined> = of(undefined)
  petId$: Observable<number> = of(0);

  petStates = ["available", "pending", "sold"]

  editPetFormGroupKendo: FormGroup;
  editPetFormGroupPrime: FormGroup;
  showKendo = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public api: ApiService) {


    this.editPetFormGroupKendo = this.fb.group({
      petName: ["", Validators.required],
      petStatus: ["", Validators.required]
    });

    this.editPetFormGroupPrime = this.fb.group({
      petName: ["", Validators.required],
      petStatus: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.petId$ = this.route.paramMap.pipe(
      map(x => x.get("id")),
      map(x => Number(x))
    );

    this.selectedPet$ = this.petId$.pipe(
      tap(x => console.log(x)),
      switchMap(this.api.petDetail$),
      tap(x => console.log(x)),
      tap(x => this.editPetFormGroupKendo.patchValue({petName: x?.name, petStatus: x?.status})),
      tap(x => this.editPetFormGroupPrime.patchValue({petName: x?.name, petStatus: x?.status}))
    );
  }

  onSubmitKendo(id: number) {
    this.api.editPet({
      petID: id,
      newState: this.editPetFormGroupKendo.value.petStatus,
      newName: this.editPetFormGroupKendo.value.petName
    });
  }

  onSubmitPrime(id: number) {
    this.api.editPet({
      petID: id,
      newState: this.editPetFormGroupPrime.value.petStatus,
      newName: this.editPetFormGroupPrime.value.petName
    });
  }

  ngAfterViewInit(): void {

  }
}
