import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer/drawer.component';
import { MaterialModule } from '../themes/material.module';

@NgModule({
  declarations: [DrawerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DrawerComponent],
})
export class SharedModule {}
