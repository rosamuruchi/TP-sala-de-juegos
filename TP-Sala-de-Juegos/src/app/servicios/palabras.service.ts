import { Injectable } from '@angular/core';
import { Palabra } from '../clases/palabra';

@Injectable({
  providedIn: 'root'
})
export class PalabrasService {

  public listado:Palabra[] =  [
    
    {nombre: 'marta', anagrama: 'matar'},
    {nombre: 'teresa', anagrama: 'aretes'},
    {nombre: 'mora ', anagrama: 'roma'},
    {nombre: 'eduardo', anagrama: 'deudora'},
    {nombre: 'sergio', anagrama: 'riesgo'},
    {nombre: 'monica', anagrama: 'camino'},
    {nombre: 'ricardo', anagrama: 'criador'},
    {nombre: 'alan', anagrama: 'lana'},
  ];

  constructor() { }
}
