import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(
    private service: ContatoService
  ) { }

  ngOnInit(): void {
    //apenas teste de comunição com a api
    const c: Contato = new Contato();
    c.nome = "Saori"
    c.email = "saori@hotmail.com"
    c.favorito = false;

    this.service
          .save(c)
          .subscribe(response => {
            console.log(response);
          });
  }

}
