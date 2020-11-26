import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(auth: AuthFirebaseService, router: Router) { }

  ngOnInit() {
  }

 

}
