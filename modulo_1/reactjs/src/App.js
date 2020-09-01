import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import api from './services/api';

import './App.css';

export default function App() {
	const [projects, setProjects] = useState([]);

	async function handleAddProject() {
		// setProjects([...projects, `Novo Projeto ${Date.now()}`]);

		const response = await api.post('projects', {
			title: `Novo Projeto ${Date.now()}`,
			owner: 'Vitor',
		});
		const project = response.data;
		setProjects([...projects, project]);
	}

	useEffect(() => {
		api.get('projects').then((response) => {
			setProjects(response.data);
		});
	}, []);

	return (
		//Isso vai englobar os conteudos sem gerar uma div a mais
		<>
			<Header title='Projects' />

			<ul>
				{projects.map((item) => (
					<li key={item.id}>{item.title}</li>
				))}
			</ul>

			<button type='button' onClick={handleAddProject}>
				Adicionar Projeto
			</button>
		</>
	);
}
