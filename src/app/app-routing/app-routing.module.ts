import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DetailPetComponent} from "../fetchPets/detail-pet.component";
import {AddPetComponent} from "../add-pet/add-pet.component";
import {FilterPetsComponent} from "../filter-pets/filter-pets.component";


const routes: Routes = [
  {path: 'pets/:id', component: DetailPetComponent},
  {path: 'filter', component: FilterPetsComponent},
  {path: 'addPet', component: AddPetComponent},
  {path: '**', component: FilterPetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
