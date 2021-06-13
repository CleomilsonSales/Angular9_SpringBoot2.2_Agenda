package br.com.cleomilsonsales.agendaapi.model.api.rest;

import br.com.cleomilsonsales.agendaapi.model.entity.Contato;
import br.com.cleomilsonsales.agendaapi.model.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contatos")
@RequiredArgsConstructor
@CrossOrigin("*") //aceitando qualquer dominio, so para testar
public class ContatoController {

    private final ContatoRepository repository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contato save(@RequestBody Contato contato){
        return repository.save(contato);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) //204-sucesso
    public void delete(@PathVariable Integer id){
        repository.deleteById(id);
    }

    /* trazendo tudo
    @GetMapping

    public List<Contato> list(){

        return repository.findAll();
    }
    */
    //trazendo tudo paginado
    @GetMapping
    public Page<Contato> list(
            @RequestParam(value = "page", defaultValue = "0") Integer pagina,
            @RequestParam(value = "size", defaultValue = "10") Integer tamanhoPagina
    ){
        PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
        return repository.findAll(pageRequest);
    }

    @PatchMapping("{id}/favorito") //atualiazação parcial
    public void favorito(@PathVariable Integer id){
        //Relembrando: Optional pq pode ou não ter um contato
        Optional<Contato> contato = repository.findById(id);

        contato.ifPresent(c ->{
            boolean favorito = c.getFavorito() == Boolean.TRUE; //trantando o valor sendo null
            c.setFavorito(!favorito);
            repository.save(c);
        });
    }

    //salvando a foto diretamente no banco
    @PutMapping("{id}/foto")
    public byte[] addPhoto(@PathVariable Integer id,
                           @RequestParam("foto") Part arquivo){
        Optional<Contato> contato = repository.findById(id);
        return contato.map(c -> {
            try{
                InputStream is = arquivo.getInputStream();
                byte[] bytes =  new byte[(int) arquivo.getSize()];
                IOUtils.readFully(is,bytes);
                c.setFoto(bytes);
                repository.save(c);
                is.close();
                return bytes;
            }catch (IOException e){
                return null;
            }
        }).orElse(null); //para o map
    }
}
