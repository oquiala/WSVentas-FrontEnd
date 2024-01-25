import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

import { LoginComponent } from './Components/login/login.component';
import { MarcaComponent } from './Components/marca/marca.component';
import { CategoriaComponent } from './Components/categoria/categoria.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { VentaComponent } from './Components/venta/venta.component';

const routes: Routes = [
  { path: '', redirectTo: '/venta', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'marca', component: MarcaComponent, canActivate: [authGuard] },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'venta', component: VentaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
