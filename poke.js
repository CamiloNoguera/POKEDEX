const poke_container = document.getElementById("poke_container");
const pokemons_number = 9;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.id
            }.png" alt="${name}"/>
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
              .toString()
              .padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

  pokemonEl.innerHTML = pokeInnerHTML;

  poke_container.appendChild(pokemonEl);

  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-block-back");
  cardBack.textContent="Back";

  cardContainer.appendChild(pokemonEl);
  cardContainer.appendChild(cardBack);
  poke_container.appendChild(flipCard);
}

// function progressBars(stats) {
// 	const statsContainer = document.createElement("div");
// 	statsContainer.classList.add("stats-container");
  
// 	for (let i = 0; i < 3; i++) {
// 	  const stat = stats[i];
  
// 	  const statPercent = stat.base_stat / 2 + "%";
// 	  const statContainer = document.createElement("stat-container");
// 	  statContainer.classList.add("stat-container");
  
// 	  const statName = document.createElement("p");
// 	  statName.textContent = stat.stat.name;
  
// 	  const progress = document.createElement("div");
// 	  progress.classList.add("progress");
  
// 	  const progressBar = document.createElement("div");
// 	  progressBar.classList.add("progress-bar");
// 	  progressBar.setAttribute("aria-valuenow", stat.base_stat);
// 	  progressBar.setAttribute("aria-valuemin", 0);
// 	  progressBar.setAttribute("aria-valuemax", 200);
// 	  progressBar.style.width = statPercent;
  
// 	  progressBar.textContent = stat.base_stat;
  
// 	  progress.appendChild(progressBar);
// 	  statContainer.appendChild(statName);
// 	  statContainer.appendChild(progress);
  
// 	  statsContainer.appendChild(statContainer);
// 	}
  
// 	return statsContainer;
//   }

fetchPokemons();
