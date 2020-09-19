import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routes';

const childrenRoutes: Routes = [
  { path: '', component: HomeComponent, children: homeRoutes },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childrenRoutes)],
  exports: [],
})
export class HomeRoutesModule {}
