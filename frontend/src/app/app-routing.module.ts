import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckLoginGuard } from './guards/check-login.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { HomeComponent } from './pages/home/home.component';
import { ListUserComponent } from './pages/user/list-user/list-user.component';
import { ListProductComponent } from './pages/product/list-product/list-product.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { DetailsProductComponent } from './pages/product/details-product/details-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { PasswordComponent } from './auth/password/password.component';

const routes: Routes = [
  {path: '', redirectTo:'/', pathMatch: 'full'},
  {path: 'notFound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  {path: 'new-password/:token', component: PasswordComponent},

  {path: '', component: HomeComponent},
  {path: 'admin', canActivate: [AuthGuard], component: AdminComponent},

  {path: 'admin/user/edit/:id', canActivate: [AuthGuard], component: EditUserComponent},
  {path: 'admin/user/add', canActivate: [AuthGuard], component: EditUserComponent},
  {path: 'admin/users', canActivate: [AuthGuard], component: ListUserComponent},

  {path: 'admin/product/edit/:id', canActivate: [AuthGuard], component: EditProductComponent},
  {path: 'admin/product/add', canActivate: [AuthGuard], component: EditProductComponent},
  {path: 'admin/products', canActivate: [AuthGuard], component: ListProductComponent},

  {path: 'product/details/:id', component: DetailsProductComponent},
  
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
