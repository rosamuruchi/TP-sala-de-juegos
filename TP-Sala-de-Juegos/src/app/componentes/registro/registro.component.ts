import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from '../../clases/usuario';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';

//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user:Usuario = new Usuario();

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  constructor(private authSvc: AuthFirebaseService, private router: Router ) { }

  ngOnInit() {
  }

  onRegister()
  {
    const user = this.authSvc.onRegister(this.user);
    if(user)
    {
      console.log("Usuario creado con exito!");
      this.router.navigateByUrl('/Login');
    }
    else
    {
      console.log("error!")
    }
  }

}
