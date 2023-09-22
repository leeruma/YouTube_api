const frame = document.querySelector('section');
const api_key = 'AIzaSyDFJHyRyXK6qMLPfq9abhraNto3AumpcSY';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PLnBZ3Abl_z0NvoNbCbU2WV5-rkmzQsnwa';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.map((data) => {
			tags += `
      <article>
        <h2>${data.snippet.title}</h2>
        <div class='txt'>
          <p>${data.snippet.description}</p>
          <span>${data.snippet.publishedAt}</span>
        </div>
        <div class='pic'>
          <img src='${data.snippet.thumbnails.standard.url}'>
        </div>
      </article>
      `;
		});
		frame.innerHTML = tags;
	});
