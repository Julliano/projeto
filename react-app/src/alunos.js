import React, { Component } from 'react';

class Component extends Component {
	render(){
		<div key={_id}>
			{nome}, {email}, {nascimento}
			<button onClick={() => this.setState({aluno: {_id, nome, email, nascimento}})}> Edit </button>
			<button onClick={() => this.removeAluno(_id)}> Remove </button>
		</div>
	}
}

export default Component;