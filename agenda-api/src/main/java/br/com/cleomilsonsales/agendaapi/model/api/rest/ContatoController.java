package br.com.cleomilsonsales.agendaapi.model.api.rest;

import br.com.cleomilsonsales.agendaapi.model.entity.Contato;
import br.com.cleomilsonsales.agendaapi.model.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public List<Contato> list(){
        return repository.findAll();
    }

    @PatchMapping("{id}/favorito") //atualiazação parcial
    public void favorito(@PathVariable Integer id, @RequestBody Boolean favorito){
        //Relembrando: Optional pq pode ou não ter um contato
        Optional<Contato> contato = repository.findById(id);

        contato.ifPresent(c ->{
            c.setFavorito(favorito);
            repository.save(c);
        });
    }
}
