  //Create axios instance for API
  const instance = axios.create({
    baseURL: 'https://api.gfycat.com/v1',
  });

  //Run storeToken function to retrieve access token and append to header
  const main = async() => {
    await storeToken();
  }

  //OAuth call to Gfycats platform
  const getToken = async() => {
    const callRequest = await instance.post('/oauth/token', {
      grant_type: "client_credentials", 
      client_id:"2_92uvkw",
      client_secret:"v_QScSxmMZsQ-Y46m3ABXUKqukHhGd_H0vX0izrqhLghVZZLcQh7npepl8ARu-GU",
    })
      return callRequest.data.access_token; 
  }

  //Append access token to header
  const storeToken = async() => {
    const token = await getToken(); 
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

   //Return user searched gifs
  const getSearchGifs = async() => {
    const userValue = document.getElementById("userSearch").value;
    const callSearchGifs  = await instance.get('/gfycats/search', {
      params: {
        search_text: userValue,
      }
    })
    for (i in callSearchGifs.data.gfycats){
      const searchImage = document.createElement('img');
      searchImage.src = callSearchGifs.data.gfycats[i].gifUrl;
      document.body.appendChild(searchImage);
    }  
  }

  //Return trending gifs
  const getTrendingGifs = async() => {
    const callTrendingGifs = await instance.get('/reactions/populated?tagName=trending', {
    })
    for (i in callTrendingGifs.data.gfycats){
      const image = document.createElement('img');
      image.src = callTrendingGifs.data.gfycats[i].gifUrl;
      document.body.appendChild(image);
    }  
  }

  main();