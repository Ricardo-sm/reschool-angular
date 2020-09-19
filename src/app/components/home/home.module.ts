import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/themes/material.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, MaterialModule],
})
export class HomeModule {}
