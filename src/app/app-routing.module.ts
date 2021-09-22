import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrashComponent } from './car-crash/car-crash.component';
import { CrashDetailComponent } from './car-crash/details/details.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: CrashComponent,
    data: { title: 'Crash Component' }
  },
  {
    path: 'details',
    component: CrashDetailComponent,
    data: { title: 'Crash Detail Component' }
  },
  {
    path: '**',
    component: CrashComponent,
    data: { title: 'Crash Component' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
