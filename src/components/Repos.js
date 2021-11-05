import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
	const { repos } = React.useContext(GithubContext);

	let languages = repos.reduce((total, repo) => {
		const { language, stargazers_count } = repo;

		if (!language) return total;

		if (!total[language]) {
			total[language] = { label: language, value: 1, stars: stargazers_count };
		} else {
			total[language] = {
				...total[language],
				value: total[language].value + 1,
				stars: total[language].stars + stargazers_count,
			};
		}

		return total;
	}, {});

	const mostUsedLanguages = Object.values(languages)
		.sort((a, b) => b.value - a.value)
		.slice(0, 5);

	const starredLanguages = Object.values(languages)
		.sort((a, b) => b.stars - a.stars)
		.map((item) => {
			return { ...item, value: item.stars };
		})
		.slice(0, 5);

	// stars, forks

	let { stars, forks } = repos.reduce(
		(total, item) => {
			const { name, stargazers_count, forks } = item;

			total.stars[stargazers_count] = { label: name, value: stargazers_count };
			total.forks[forks] = { label: name, value: forks };

			return total;
		},
		{
			stars: {},
			forks: {},
		}
	);

	stars = Object.values(stars).slice(-5).reverse();

	forks = Object.values(forks).slice(-5).reverse();

	// STEP 2 - Chart Data

	return (
		<section className='section'>
			<Wrapper className='section-center'>
				<Pie3D data={mostUsedLanguages} />
				<Column3D data={stars} />
				<Doughnut2D data={starredLanguages} />
				<Bar3D data={forks} />
			</Wrapper>
		</section>
	);
};

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	div {
		width: 100% !important;
	}
	.fusioncharts-container {
		width: 100% !important;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`;

export default Repos;
