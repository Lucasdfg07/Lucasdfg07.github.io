package com.algaworks.projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.algaworks.projeto.model.Fornecedor;
import com.algaworks.projeto.repository.Fornecedores;

@Controller
public class FornecedoresController {
	
	@Autowired
	private Fornecedores fornecedores;
	
	@GetMapping("/fornecedores")
	public ModelAndView listar() {
		ModelAndView modelAndView = new ModelAndView("ListaFornecedores");
		
		modelAndView.addObject("fornecedores", fornecedores.findAll());
		
		modelAndView.addObject(new Fornecedor());
		
		return modelAndView;
	}
	
	@PostMapping("/fornecedores")
	public String salvar(Fornecedor fornecedor) {
		this.fornecedores.save(fornecedor);
		return "redirect:/fornecedores";
	}
	
	@GetMapping("/")
	public ModelAndView menu() {
		ModelAndView modelAndView = new ModelAndView("Menu");
		
		return modelAndView;
	}
	
	@GetMapping("/sobre")
	public ModelAndView sobre() {
		ModelAndView modelAndView = new ModelAndView("Sobre");
		
		return modelAndView;
	}
	
}
