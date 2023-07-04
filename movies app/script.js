
	// my personnal api kay
	// e63a8dffaff726bc037f9c6061fbb0a1

	const API_KEY = 'api_key=e63a8dffaff726bc037f9c6061fbb0a1';
	const  BASE_URL = 'https://api.themoviedb.org/3';
	const API_URL = BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
	const IMG_URL = 'https://image.tmdb.org/t/p/w500';
	const searchURL = BASE_URL+'/search/movie?'+API_KEY;

	const container = document.querySelector('.container');
	const form = document.querySelector('#form');
	const search = document.querySelector('.search');
	const searchBtn = document.querySelector(".searchBtn");

	function getMovies(url){
		fetch(url)
		.then((res) =>{ 
			return res.json();
		})
		.then((data)=>{
			if(data.results.length > 0){
			showMovies(data.results);
			}
			else{
				container.innerHTML = '';
				container.innerHTML = '<h1 class="no-data"><img src="ufo-3.png"  class="ufo ufo-1"> NO DATA FOUND<img src="ufo-gif.gif"  class="ufo ufo-2"></h1>';
			}
		})
		.catch((err) => console.log(err))
	}
	getMovies(API_URL);

	function showMovies(data){
		container.innerHTML = '';
		var imgNo = 0;
		data.forEach(movie => {
			const {title,vote_average,poster_path,overview,release_date} = movie;
			const movieEl = document.createElement('div');
			movieEl.classList.add('card');
			movieEl.innerHTML = `
			<img src="${IMG_URL+poster_path}" class="img" onerror="this.onerror = addErrorDiv(this.parentElement,this);">
			<div class="card-name">
					<div class="name">
						${title}
					</div>     
					<div class="rating ${getColor(vote_average)}">
						${vote_average}
					</div>
				</div>
				<div class="card-desc">
					<div class="card-desc-headings">
						Overview :-
					</div>
					<div class="overview">
						${overview}
					</div>
					<div class="card-desc-headings">
						Release date :-
					</div>
					<div class="release-date">
						${release_date}
					</div>
				</div>
			`;

		container.appendChild(movieEl);
		imgNo++;
		});
	}
	function getColor(vote){
		if(vote>=8){
			return 'green';
		}else if(vote >= 5){
			return 'orange';
		}else{
			return 'red';
		}
	}


	searchBtn.addEventListener('click',(e)=>{
		e.preventDefault();
		const searched = search.value;
		window.location.search = '?searchQuery='+searched;
		let queryString = window.location.search;
		let urlParams = new URLSearchParams(queryString);
		let searchQuery = urlParams.get('searchQuery');
		if(searched){
			getMovies(searchURL+'&query='+searchQuery);
		}else{
			getMovies(API_URL);
		}
	})

	form.addEventListener('submit',(e)=>{
		e.preventDefault();
		const searched = search.value;
		window.location.search = '?searchQuery='+searched;
		let queryString = window.location.search;
		let urlParams = new URLSearchParams(queryString);
		let searchQuery = urlParams.get('searchQuery');
		if(searched){
			getMovies(searchURL+'&query='+searchQuery);
		}else{
			getMovies(API_URL);
		}
	})

	function addErrorDiv(parent,thisEl){
		thisEl.style.display = 'none';
		const errorEl = document.createElement('div');
		errorEl.classList.add('error-container');
		errorEl.innerHTML = '404<img src="errorImg.png" alt="not found" class="error-img"><h5 class="error-desc">Looks Like Pirate stolen The Image!</h5>';
		parent.prepend(errorEl);
	}


	// this is for getting the search query and changing the resuldt according to it 
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);
	let searchQuery = urlParams.get('searchQuery');
	if(searchQuery.length > 0){
	search.value = searchQuery;
	getMovies(searchURL+'&query='+searchQuery);
}
	else
	getMovies(API_URL);
