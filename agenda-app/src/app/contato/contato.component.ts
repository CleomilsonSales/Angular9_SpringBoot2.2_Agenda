import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
//formularios reativos do angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    /*
    //apenas teste de comunição com a api
    const c: Contato = new Contato();
    c.nome = "Saori"
    c.email = "saori@hotmail.com"
    c.favorito = false;

    this.service
          .save(c)
          .subscribe(response => {
            console.log(response);
          });*/

    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.email]
    })
  }

  submit(){
    //testando o formulario
    console.log(this.formulario.value)
  }
  
}
