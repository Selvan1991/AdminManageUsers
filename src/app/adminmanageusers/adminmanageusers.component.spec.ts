import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanageusersComponent } from './adminmanageusers.component';

describe('AdminmanageusersComponent', () => {
  let component: AdminmanageusersComponent;
  let fixture: ComponentFixture<AdminmanageusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmanageusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmanageusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
