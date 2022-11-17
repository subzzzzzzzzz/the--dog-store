import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

const routes: Routes = [
  {
    path:'',
    component:ToolbarComponent,
    children : [
      {
        path:'',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
