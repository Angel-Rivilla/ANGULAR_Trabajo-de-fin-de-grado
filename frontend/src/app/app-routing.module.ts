import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'/', pathMatch: 'full'},
  {path: 'notFound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/edit/:id', component: EditUserComponent},
  {path: 'admin/add', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }