import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddEditComponent } from './student-add-edit.component';

describe('StudentAddEditComponent', () => {
  let component: StudentAddEditComponent;
  let fixture: ComponentFixture<StudentAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
