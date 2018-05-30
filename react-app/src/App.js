import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {

	state = {
		products: [],
		alunos: [],
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
		}
	}
	
	componentDidMount() {
		this.getProducts();
		this.getAlunos();
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
		const { product } = this.state;
		axios.delete('http://localhost:8000/api/cursos/'+id)
		.then(this.getProducts)
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
		const { product } = this.state;
		axios.delete('http://localhost:8000/api/alunos/'+id)
		.then(this.getAlunos)
		.catch(err => console.error(err))
	}
	
	renderProduct = ({_id, titulo, descricao}) => 
		<div key={_id}>
			{titulo}, {descricao}
			<button onClick={() => this.setState({product: {_id, titulo, descricao}})}> Edit </button>
			<button onClick={() => this.removeProduct(_id)}> Remove </button>
		</div>

	renderAluno = ({_id, nome, email, nascimento}) => 
		<div key={_id}>
			{nome}, {email}, {nascimento}
			<button onClick={() => this.setState({aluno: {_id, nome, email, nascimento}})}> Edit </button>
			<button onClick={() => this.removeAluno(_id)}> Remove </button>
		</div>
	
	render() {
		const {products, alunos, product, aluno} = this.state;
	    return (
	      <div className="App">
		      <div>
			      <input ref="titulo" value={product.titulo} 
			      onChange={e => this.setState({ product: { ...product, titulo: e.target.value }})}/>
			      <input ref="descricao" value={product.descricao} 
			      onChange={e => this.setState({ product: { ...product, descricao: e.target.value }})}/>
			      <button onClick={this.addProduct}> Add Curso </button>
		      </div>

		      <div>
			      <input ref="nome" value={aluno.nome} 
			      onChange={e => this.setState({ aluno: { ...aluno, nome: e.target.value }})}/>
			      <input ref="email" value={aluno.email} 
			      onChange={e => this.setState({ aluno: { ...aluno, email: e.target.value }})}/>
			      <input ref="nascimento" value={aluno.nascimento} 
			      onChange={e => this.setState({ aluno: { ...aluno, nascimento: e.target.value }})}/>
			      <button onClick={this.addAluno}> Add Aluno </button>
		      </div>
	      		
		      <h3> Cursos cadastrados </h3>
		      {products.map(this.renderProduct)}

		      <h3> Alunos cadastrados </h3>
		      {alunos.map(this.renderAluno)}

	      	
	      </div>
	    );
	}
}

export default App;
