import {Injectable} from '@angular/core';
import {ClientService, Pet, PetStatus, Status} from "./client.service";
import {catchError, map, Observable, of, switchMap, take, tap} from "rxjs";
import {createStore, select, setProps, withProps} from "@ngneat/elf";
import {
  deleteEntities,
  selectAllEntities,
  selectEntitiesCount,
  updateEntities,
  upsertEntities,
  withEntities
} from "@ngneat/elf-entities";
import {EffectFn} from "@ngneat/effects-ng";
import {Router} from "@angular/router";
import {tapResult} from "@ngneat/effects";
import * as _ from "lodash/fp";
import {WDClientService} from './wdclient.service';

interface ICustomProp {
  isLoading: boolean;
}

export const PetStore = createStore({
    name: 'PetsStore',
  },
  withEntities<Pet>({}),
);

export const VarStore = createStore({
    name: "VarStore",
  },
  withProps<ICustomProp>({isLoading: false})
);

@Injectable({
  providedIn: 'root'
})
export class ApiService extends EffectFn {

  constructor(private client: ClientService, private wdClient: WDClientService, private router: Router) {
    super();
  }

  public isLoading$ = VarStore.pipe(select(x => x.isLoading));

  public pets$ = PetStore.pipe(selectAllEntities());
  public petCount$ = PetStore.pipe(selectEntitiesCount());
  public petDetail$ = (id: number) => this.pets$.pipe(map(pets => pets.filter(x => x?.id === id)[0]));

  setLoading = this.createEffectFn((enabled$: Observable<boolean>) =>
    enabled$.pipe(
      tap(isEnabled => VarStore.update(setProps(() => ({isLoading: isEnabled})))
      )
    )
  );

  deletePet = this.createEffectFn((petId$: Observable<number>) =>
    petId$.pipe(
      switchMap(x => this.client.deletePet(null, x).pipe(
        tap(() => PetStore.update(deleteEntities(x))),
        catchError(this.handleError<any>(`deleting pet id=${x}`))
      ))
    )
  );

  addPet = this.createEffectFn((pet$: Observable<Pet>) =>
    pet$.pipe(
      switchMap(x => this.client.addPet(x).pipe(
        tap(() => PetStore.update(upsertEntities(x))),
        tap(() => this.router.navigate(["pets", `${x.id}`]))
      ))
    )
  );

  editPet = this.createEffectFn((pet$: Observable<{ petID: number, newName: string, newState: PetStatus }>) =>
    pet$.pipe(
      switchMap(x => this.petDetail$(x.petID).pipe(
        map((oldPet: Pet) => {
          return new Pet({...oldPet, name: x.newName, status: x.newState})
        }),
        take(1),
      )),
      switchMap(newPet => this.client.updatePet(newPet).pipe(
        tapResult(() => PetStore.update(updateEntities(newPet.id, newPet)))
      ))
    )
  );

  loadPets = this.createEffectFn((status$: Observable<Status[]>) =>
    status$.pipe(
      switchMap(filters => this.client.findPetsByStatus(filters)),
      map(allPets => _.uniqBy('id', allPets)),
      tap(uniqPets => PetStore.update(upsertEntities(uniqPets)))
    ));

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
