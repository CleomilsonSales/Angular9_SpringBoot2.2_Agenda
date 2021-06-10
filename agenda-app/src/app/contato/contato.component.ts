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
  contatos: Contato[] = [];
  colunas = ['id','nome','email','favorito']

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
          
    this.monstarFormulario();
    this.listarContatos();
  }

  monstarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  favoritar(contato: Contato){
    this.service
          .favoritar(contato)
          .subscribe(response => {
            contato.favorito = !contato.favorito;
          })
  }

  listarContatos(){
    this.service
            .list()
            .subscribe(response => {
              this.contatos = response;
            })
  }

  submit(){
    /*
    //testando o formulario
    console.log(this.formulario.value)
    //vendo se o formulario esta tudo ok
    const isValid = this.formulario.valid
    console.log('isValid: ', isValid)
    
    //pegando campos com erros
    const erroNome = this.formulario.controls.nome.errors?.required
    const erroEmail = this.formulario.controls.email.errors?.email
    console.log('erroNome:',erroNome)
    console.log('erroNome:',erroEmail)
    */

    //persistindo
    const formValues = this.formulario.value
    const contato: Contato = new Contato(formValues.nome, formValues.email)

    this.service
          .save(contato)
          .subscribe(response =>{
            let lista: Contato[] = [... this.contatos, response] //server pra adicionar o this.contato no array
            this.contatos = lista; //assim eu crio outra instancia para a lista ser atualizada em tempo de execução
            //this.contatos.push(response); //push adicionando ao array
            console.log(this.contatos);
          })


  }
  
}
