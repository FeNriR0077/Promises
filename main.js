let pokemonname = document.querySelector('.pokemonname')


const fetchPokemons = async () => {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
    let data= await response.json()   
    let pokemonlist = data.results
    
    let allurl = pokemonlist.map(data => data.url)

    let allurlpromise = await allurl.map(url => {
        let a = fetch(url)
        return a
    })

    console.log(allurlpromise) // logging array of promises

    Promise.all(allurlpromise)
        .then(res => {
            console.log("res", res) // logging the response array
            return Promise.all(res.map(re => re.json()))
        })
        .then(val => {
            console.log("val:", val) // logging the parsed calues in array
            val.map(a => {
                console.log(a.name)   // logging all the names from urls
                let pokeadd =`<p>${a.name}</p>`
                pokemonname.innerHTML += pokeadd
            
        })
        })

}

fetchPokemons()



