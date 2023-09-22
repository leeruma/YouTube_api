const frame = document.querySelector('section');
const api_key = 'AIzaSyDFJHyRyXK6qMLPfq9abhraNto3AumpcSY';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PLnBZ3Abl_z0NvoNbCbU2WV5-rkmzQsnwa';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
const tit_len = 50;
const desc_len = 100;

// 일정 글자수 이상일때 글자짜르고 말줄임표 붙이기
// 문자열.substr(시작위치, 자를 글자수)

// beef-lettuce-tomato --> Beef Lettuce Tomato
let text = 'beef-lettuce-tomato';
text = text
	.split('-') // 기존 문자열에서 -을 기준으로 배열로 분리
	.map((el) => el.charAt(0).toUpperCase() + el.slice(1)) // 분리된 문자값을 반복돌면서 첫 번째 글자만 대문자 변경 + 첫 번째를 제외한 나머지 문자 이어 붙임(각 단어의 첫글자만 대문자로 변경돼서 배열로 반환)
	.join(' '); // 첫글자만 대문자로 변경된 단어들을 다시 빈칸으로 이어붙이기
console.log(text);

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.map((data) => {
			let desc = data.snippet.description;
			desc.length > desc_len ? (desc = desc.substr(0, desc_len) + '...') : desc;

			// 날자값 가공
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
