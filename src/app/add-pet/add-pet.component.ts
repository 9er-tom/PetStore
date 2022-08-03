import {Component, OnInit} from '@angular/core';
import {Pet, PetStatus} from "../client.service";
import {ApiService} from "../api.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  addPetForm = this.fb.group({
    id: [0],
    name: [""],
    status: [PetStatus.Available]
  })

  petStates = PetStatus; //reference for HTML

  constructor(public api: ApiService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const p = new Pet();
    p.id = this.addPetForm.value.id!;
    p.name = this.addPetForm.value.name!;
    p.status = this.addPetForm.value.status!;
    this.api.addPet(p)
  }
}
