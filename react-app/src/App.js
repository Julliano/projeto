import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {

	state = {
		products: [],
		alunos: [],
		matriculas: [],
		product: {
			id: null,
			titulo: 'Teste',
			preco: 0,
			descricao: 'teste de inserção',
		},
		aluno: {
			nome: 'Ciclano',
			email: 'Ciclano@gmail.com',
			nascimento: '25/02/1989'
		},
		matricula: {
			aluno: {},
			curso: {}
		}
	}
	
	componentDidMount() {
		this.getProducts();
		this.getAlunos();
		this.getMatriculas();
	}
	
	
//Funções que relacionadas a cursos
	getProducts = _ => {
		fetch('http://localhost:8000/api/cursos')
		.then(response => response.json())
		.then(response => this.setState({ products: response.data}))
		.catch( err => console.error(err))
	}

	addProduct = _ => {
		const { product } = this.state;
		if(product._id){
			axios.put('http://localhost:8000/api/cursos/'+product._id, {titulo: product.titulo,
				descricao: product.descricao,})
			.then(this.getProducts)
			.catch(err => console.error(err))
		} else {
			axios.post('http://localhost:8000/api/cursos/add', {titulo: this.state.product.titulo,
				descricao: this.state.product.descricao,})
				.then(this.getProducts)
				.catch(err => console.error(err))
		}
	}

	removeProduct = (id) => {
//		const { product } = this.state;
		axios.delete('http://localhost:8000/api/cursos/'+id)
		.then(this.getProducts)
		.catch(err => console.error(err))
	}

//Funções que relacionadas a alunos
	getMatriculas = _ => {
		fetch('http://localhost:8000/api/matriculas')
		.then(response => response.json())
		.then(response => this.setState({ matriculas: response.data}))
		.catch( err => console.error(err))
	}
	
	addMatricula = _ => {
		const { matricula } = this.state;
		console.log(matricula)
		axios.post('http://localhost:8000/api/matriculas/add', {
			aluno:matricula.aluno, 
			curso:matricula.curso})
			.then(this.getMatriculas)
			.catch(err => console.error(err))
	}
	
	removeMatricula = (id) => {
//		const { product } = this.state;
		axios.delete('http://localhost:8000/api/matriculas/'+id)
		.then(this.getMatriculas)
		.catch(err => console.error(err))
	}
	
//Funções que relacionadas a alunos
	getAlunos = _ => {
		fetch('http://localhost:8000/api/alunos')
		.then(response => response.json())
		.then(response => this.setState({ alunos: response.data}))
		.catch( err => console.error(err))
	}
	
	addAluno = _ => {
		const { aluno } = this.state;
		if(aluno._id){
			axios.put('http://localhost:8000/api/alunos/'+aluno._id, {nome: aluno.nome,
				email: aluno.email,
				nascimento: aluno.nascimento})
				.then(this.getAlunos)
				.catch(err => console.error(err))
		} else {
			axios.post('http://localhost:8000/api/alunos/add', {nome: aluno.nome,
				email: aluno.email,
				nascimento: aluno.nascimento})
				.then(this.getAlunos)
				.catch(err => console.error(err))
		}
//		this.setState({aluno:{}})
	}
	
	removeAluno = (id) => {
//		const { product } = this.state;
		axios.delete('http://localhost:8000/api/alunos/'+id)
		.then(this.getAlunos)
		.catch(err => console.error(err))
	}
	
	renderProduct = ({_id, titulo, descricao}) => 
		<div key={_id}>
			{titulo}, {descricao}
			<button type="submit" className="btn btn-sm btn-warning" onClick={() => this.setState({product: {_id, titulo, descricao}})}> Edit </button>
			<button type="submit" className="btn btn-sm btn-danger" onClick={() => this.removeProduct(_id)}> Remove </button>
		</div>

	renderAluno = ({_id, nome, email, nascimento}) => 
		<div key={_id}>
			{nome}, {email}, {nascimento}
			<button type="submit" className="btn btn-sm btn-warning" onClick={() => this.setState({aluno: {_id, nome, email, nascimento}})}> Edit </button>
			<button type="submit" className="btn btn-sm btn-danger" onClick={() => this.removeAluno(_id)}> Remove </button>
		</div>

	render() {
		const {products, alunos, product, aluno, matricula, matriculas} = this.state;
	    return (
	      <div className="App col-md-6">
	      	<h4> Cadastrar curso: </h4>
		      <div className="form-group col-md-12 flex">
			      <input className="form-control col-md-3" ref="titulo" value={product.titulo} 
			      onChange={e => this.setState({ product: { ...product, titulo: e.target.value }})}/>
			      <input className="form-control col-md-3" ref="descricao" value={product.descricao} 
			      onChange={e => this.setState({ product: { ...product, descricao: e.target.value }})}/>
			      <button type="submit" className="btn btn-primary" onClick={this.addProduct}> Add Curso </button>
		      </div>

		      <h4> Cadastrar aluno: </h4>
		      <div className="form-group col-md-12 flex">
			      <input className="form-control col-md-3" ref="nome" value={aluno.nome} 
			      onChange={e => this.setState({ aluno: { ...aluno, nome: e.target.value }})}/>
			      <input className="form-control col-md-3" ref="email" value={aluno.email} 
			      onChange={e => this.setState({ aluno: { ...aluno, email: e.target.value }})}/>
			      <input className="form-control col-md-3" ref="nascimento" value={aluno.nascimento} 
			      onChange={e => this.setState({ aluno: { ...aluno, nascimento: e.target.value }})}/>
			      <button type="submit" className="btn btn-primary" onClick={this.addAluno}> Add Aluno </button>
		      </div>

		      <h4> Matricular aluno: </h4>
		      <div className="form-group col-md-12 flex">
		      	  <select onChange={e => this.setState({ matricula: { ...matricula, curso: e.target.value }})}>
		      	  		{products.map(x => <option value={x._id} key={x._id}>{x.titulo}</option>)}
		      	  </select>
		      	  <select onChange={e => this.setState({ matricula: { ...matricula, aluno: e.target.value }})}>
		      	  		{alunos.map(x => <option value={x._id} key={x._id}>{x.nome}</option>)}
	      	  	  </select>
			      <button type="submit" className="btn btn-primary" onClick={this.addMatricula}> Matricular </button>
		      </div>
	      		
		      <h3> Cursos cadastrados </h3>
		      {products.map(this.renderProduct)}

		      <h3> Alunos cadastrados </h3>
		      {alunos.map(this.renderAluno)}

		      <h3> Matriculas realizadas </h3>
		      { this.state.matriculas.map((matricula,i) =>
		      <div>
		      	{matricula.aluno.nome}, {matricula.curso.titulo}
				<button type="submit" className="btn btn-sm btn-danger" onClick={() => this.removeMatricula(matricula._id)}> Remove </button>
		      </div>
		      )}

	      	
	      </div>
	    );
	}
}

export default App;
