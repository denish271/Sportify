const API_KEY = 'd119de2c-9353-44de-bc36-c884d6540bbe'

let getmatches = () => {
    const url = `https://api.cricapi.com/v1/series?apikey=${API_KEY}`; 
    return fetch(url).then((res) => res.json()).catch((e) => {console.log("Error",e)})
}

export {getmatches};