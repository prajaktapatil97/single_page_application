import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: 'fms', component: FmsComponent, loadChildren: './fms/fms.module#FmsModule' },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  // { path: 'auth', loadChildren: () => import('./login-management/login-management.module').then(m => m.LoginManagementModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
