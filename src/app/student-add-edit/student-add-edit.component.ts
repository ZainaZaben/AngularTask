import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss'],
})
export class StudentAddEditComponent implements OnInit {
  studentForm: FormGroup;
  static nextId: number;

  constructor(
    private _fb: FormBuilder,
    private _studentService: StudentService,
    private _dialogRef: MatDialogRef<StudentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.studentForm = this._fb.group({
      id: 0, 
      firstName: '',
      secondName: '',
      lastName: '',
      age: '',
    });
  }

  ngOnInit(): void {
    this._studentService.getStudentList().subscribe((students) => {
      StudentAddEditComponent.nextId = students.length + 1;
      this.studentForm.patchValue({
        id: StudentAddEditComponent.nextId,
      });
    });
    this.studentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.studentForm.valid) {
      let formData = this.studentForm.value;
      formData.id = formData.id.toString();
      
      if (this.data) {
        this._studentService
          .updateStudent(this.data.id, formData)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Student detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._studentService.addStudent(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Student added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  
 
}
