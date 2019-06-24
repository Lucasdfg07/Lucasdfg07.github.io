package com.algaworks.projeto.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.algaworks.projeto.model.Fornecedor;

public interface Fornecedores extends JpaRepository<Fornecedor, Long> {
	
}
