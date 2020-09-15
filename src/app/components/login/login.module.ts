import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/themes/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class LoginModule {}
