import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
//formularios reativos do angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto','id','nome','email','favorito'];

  //paginação
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5];


  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
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
    this.listarContatos(this.pagina, this.tamanho);
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

  /*sem paginação
  listarContatos(){
    this.service
            .list()
            .subscribe(response => {
              this.contatos = response;
            })
  }
  */

  //com paginação
  listarContatos(pagina:number, tamanho:number){
    this.service
            .list(pagina, tamanho)
            .subscribe(response => {
              this.contatos = response.content;
              this.totalElementos = response.totalElements;
              this.pagina = response.number;
            })
  }

  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho);
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
            /* sem paginação
            let lista: Contato[] = [... this.contatos, response] //server pra adicionar o this.contato no array
            this.contatos = lista; //assim eu crio outra instancia para a lista ser atualizada em tempo de execução
            //this.contatos.push(response); //push adicionando ao array
            */
            //com paginação
            this.listarContatos(this.pagina, this.tamanho);
            this.snackbar.open('O contato foi adicionado', 'Sucesso',{
              duration: 2000 //2seg
            })
            this.formulario.reset();
          })


  }

  upLoadFoto(event: any, contato: Contato){
    const files = event.target.files;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
            .upload(contato, formData)
            .subscribe( response => this.listarContatos(this.pagina, this.tamanho));
    }
  }

  visualizarContato(contato: Contato){
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    })
  }
  
}
