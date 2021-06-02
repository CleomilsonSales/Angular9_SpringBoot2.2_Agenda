package br.com.cleomilsonsales.agendaapi.model.repository;

import br.com.cleomilsonsales.agendaapi.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {
}
