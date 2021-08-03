import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './pages/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ListUserComponent } from './pages/user/list-user/list-user.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { FooterComponent } from './pages/footer/footer.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { UtilsService } from './services/utils.service';
import { AdminInterceptor } from './interceptors/admin-interceptor';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { ListProductComponent } from './pages/product/list-product/list-product.component';
import { ProductsComponent } from './pages/product/products/products.component';
import { DetailsProductComponent } from './pages/product/details-product/details-product.component';
import { InfoComponent } from './pages/info/info.component';
import { CartComponent } from './pages/cart/cart.component';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    AdminComponent,
    EditUserComponent,
    ListUserComponent,
    FooterComponent,
    SidebarComponent,
    EditProductComponent,
    ListProductComponent,
    ProductsComponent,
    DetailsProductComponent,
    InfoComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    UserService,
    AuthService,
    UtilsService,
    {
      provide:HTTP_INTERCEPTORS, 
      useClass: AdminInterceptor, 
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
