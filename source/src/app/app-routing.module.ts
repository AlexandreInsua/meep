import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'mapa', component: MapComponent },
  { path: 'lista', component: ListComponent },
  { path: 'lista', component: MapComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
