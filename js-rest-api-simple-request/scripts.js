
const root = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'https://icon2.kisspng.com/20171221/lke/superman-logo-png-hd-5a3b5bcbb7f731.1346215415138395637535.jpg';
logo.setAttribute('id', 'main-logo');
root.appendChild(logo);

const container = document.createElement('div');
container.setAttribute('class', 'container');
root.appendChild(container);

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {
	// Begin accessing JSON data here
	var data = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) {
		data.forEach(movie => {
			// Log each movie's title	
			console.log(movie.title);
			fillMovieData(movie, container);
		});
	} else {
		console.log('Error '+request.status);
		console.log(request);
		const h1 = document.createElement('h1');
		h1.textContent = 'Error '+request.status;
		container.appendChild(h1);
	}
}

// Send request
request.send();

function fillMovieData(movie, e_parent) {
	// Create a div with a card class
	const card = document.createElement('div');
	card.setAttribute('class', 'card');

	// Create an h1 and set the text content to the film's title
	const h1 = document.createElement('h1');
	h1.textContent = movie.title;

	// Create a p and set the text content to the film's description
	const p = document.createElement('p');
	movie.description = movie.description.substring(0, 300); // Limit to 300 chars
	p.textContent = `${movie.description}...`; // End with an ellipses

	// Each card will contain an h1 and a p
	card.appendChild(h1);
	card.appendChild(p);

	// Append the cards to the container element
	e_parent.appendChild(card);
}
