const frame = document.querySelector('section');
const api_key = 'AIzaSyDFJHyRyXK6qMLPfq9abhraNto3AumpcSY';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PLnBZ3Abl_z0NvoNbCbU2WV5-rkmzQsnwa';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
const tit_len = 30;
const desc_len = 100;

let text = 'beef-lettuce-tomato';
text = text
	.split('-')
	.map((el) => el.charAt(0).toUpperCase() + el.slice(1))
	.join(' ');
console.log(text);

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.map((data) => {
			let desc = data.snippet.description;
			desc.length > desc_len ? (desc = desc.substr(0, desc_len) + '...') : desc;

			let date = data.snippet.publishedAt.split('T')[0];
			date = date.split('-').join('.');

			tags += `
      <article>
        <h2>${
					data.snippet.title.length > tit_len
						? data.snippet.title.substr(0, tit_len) + '...'
						: data.snippet.title
				}</h2>
        <div class='txt'>
          <p>${desc}</p>
          <span>${date}</span>
        </div>
        <div class='pic'>
          <img src='${data.snippet.thumbnails.standard.url}'>
        </div>
      </article>
      `;
		});
		frame.innerHTML = tags;
	});
