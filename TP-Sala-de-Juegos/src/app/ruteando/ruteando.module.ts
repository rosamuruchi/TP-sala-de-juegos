import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { AdivinaElNumeroComponent } from '../componentes/adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from '../componentes/listado-de-resultados/listado-de-resultados.component';

import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { MenuComponent } from '../componentes/menu/menu.component';
import { AdivinaMasListadoComponent } from '../componentes/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from '../componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from'../componentes/listado/listado.component'
import { ListadosComponent } from '../componentes/listados/listados.component';
import { JuegosComponent } from '../componentes/juegos/juegos.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { MenuCardComponent } from '../componentes/menu-card/menu-card.component';
import { CabeceraComponent } from '../componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component'
import { JugadoresListadoComponent } from '../componentes/jugadores-listado/jugadores-listado.component';
import { AnagramaComponent } from '../componentes/anagrama/anagrama.component';
import { TatetiComponent } from '../componentes/tateti/tateti.component';
import { MemoryComponent } from '../componentes/memory/memory.component';
import { PptComponent } from '../componentes/ppt/ppt.component';
import { AuthGuard } from '../guards/auth.guard';

// declaro donde quiero que se dirija
const MiRuteo: Routes = [
{
  path: '',
    redirectTo : 'Login',
    // component: HomeComponent,
    pathMatch: 'full'
},
{path: 'Principal' , component: PrincipalComponent,canActivate:[AuthGuard]},
{path: 'Jugadores' , component: JugadoresListadoComponent,canActivate:[AuthGuard]},
{path: '' , component: PrincipalComponent,canActivate:[AuthGuard]},
{path: 'Login' , component: LoginComponent},
{path: 'QuienSoy' , component: QuienSoyComponent,canActivate:[AuthGuard]},
{path: 'Registro' , component: RegistroComponent},
{path: 'Listado' , component: ListadoComponent,canActivate:[AuthGuard]},

{path: 'Resultados', component: ListadoDeResultadosComponent, canActivate:[AuthGuard]},

{ path: 'Juegos' ,
component: JuegosComponent ,canActivate:[AuthGuard],
children:
     [
       {path: '' , component: MenuCardComponent},
      {path: 'Adivina' , component: AdivinaElNumeroComponent},
      {path: 'AdivinaMasListado' , component: AdivinaMasListadoComponent},
      {path: 'AgilidadaMasListado' , component: AgilidadMasListadoComponent},
      {path: 'Agilidad' , component: AgilidadAritmeticaComponent},
      {path: 'Anagrama' , component: AnagramaComponent},
      {path: 'Tateti' , component: TatetiComponent},
      {path: 'Pelotita' , component: MemoryComponent },
      {path: 'PPT' , component: PptComponent},
      {path: 'Resultados', component: ListadoDeResultadosComponent},
    ]
},
{path: '**' , component: ErrorComponent},
{path: 'error' , component: ErrorComponent}];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
