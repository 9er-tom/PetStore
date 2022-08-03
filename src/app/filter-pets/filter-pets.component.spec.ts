import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPetsComponent } from './filter-pets.component';

describe('FilterPetsComponent', () => {
  let component: FilterPetsComponent;
  let fixture: ComponentFixture<FilterPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
