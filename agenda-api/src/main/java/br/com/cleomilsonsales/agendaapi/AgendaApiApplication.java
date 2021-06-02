package br.com.cleomilsonsales.agendaapi;

import br.com.cleomilsonsales.agendaapi.model.entity.Contato;
import br.com.cleomilsonsales.agendaapi.model.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AgendaApiApplication {
	/* teste persistencia
	//Relembrando AutoWired é para fazer a injeção de dependencia
	@Bean
	public CommandLineRunner commandLineRunner(
			@Autowired ContatoRepository repository){
		return args -> {
			Contato contato =  new Contato();
			contato.setNome("Rita Miranda");
			contato.setEmail("rita@htomail.com");
			contato.setFavorito(false);
			repository.save(contato);
		};
	}*/

	public static void main(String[] args) {
		SpringApplication.run(AgendaApiApplication.class, args);
	}

}
