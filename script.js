const apiurl = 'https://superheroapi.com/api.php/10223569763528853'

const gen_random_hero = document.getElementById('gen_random_hero')
const bdiv = document.getElementById('heroImage')

const hero_Image = document.getElementById('heroIMG')

const searched_hero = document.getElementById('searched_hero')

const search_a_hero_userI = document.getElementById('search_a_hero_userI')

const hero_stats = document.getElementById('stats')
const hero_appearance = document.getElementById('appearance')
const hero_name = document.getElementById('name')
const bgdiv = document.getElementById('bg')


const fetch_hero_data = (id) => {
  fetch(`${apiurl}/${id}`)
    .then(response => response.json())
    //.then(json => console.log(json.name)) If we just wanted name
    .then(json => {
      statsp = fetch_hero_stats(json)
      document.getElementById('BGC').style.backgroundImage = "url(https://4kwallpapers.com/images/walls/thumbs_3t/3790.jpg)"
      hero_name.innerHTML = `<h2 style="color:white">${json.name}</h2>` // We can conatenate this name
      const Appearance = Object.keys(json.appearance).map(stat => `<p style="color:white"> ${capitalizef(stat)} : ${json.appearance[stat]}</p>`).join('')
      hero_appearance.innerHTML = `<h4 style="color:white"><u>Appearance</u></h4>${Appearance}`
      hero_Image.innerHTML = ` <img src= "${json.image.url}"height = 300 width = 300 id = "heroIM"/>`
      hero_stats.innerHTML = `${statsp}`
      console.log(json)
    }
    )
}

// <p> ${json.powerstats.__}</__>




const capitalizef = (word) => {
  word = word[0].toUpperCase() + word.slice(1).toLowerCase()
  return word
}



// Getting all stats
const fetch_hero_stats = (character) => {
  let Skeys = Object.keys(character.powerstats).map(stat => `<p style="color:white"> ${capitalizef(stat)} : ${character.powerstats[stat]}</p><br>`)
  Skeys.splice(0, 0, `<h4 style="color:white"><u>Powerstats</u></h4>`)
  let Bio = Object.keys(character.biography).map(stat => `<p style="color:white"> ${capitalizef(stat)} : ${character.biography[stat]}</p><br>`)
  Bio.splice(0, 0, `<h4 style="color:white"><u>Biography</u></h4>`)
  let Connections = Object.keys(character.connections).map(stat => `<p style="color:white"> ${capitalizef(stat)} : ${character.connections[stat]}</p><br>`)
  Connections.splice(0, 0, `<h4 style="color:white"><u>Connections</u></h4>`)
  let Work = Object.keys(character.work).map(stat => `<p style="color:white"> ${capitalizef(stat)} : ${character.work[stat]}</p><br>`)
  Work.splice(0, 0, `<h4 style="color:white"><u>Work</u></h4>`)

  MainS = Skeys
  MainS = MainS.concat(Bio)
  MainS = MainS.concat(Connections)
  MainS = MainS.concat(Work)

  return MainS.join('')
}





gen_random_hero.onclick = () => {
  let random_hero_ID = Math.ceil(Math.random() * 731)
  bgdiv.innerHTML = ''
  fetch_hero_data(random_hero_ID)
}

// document.querySelector('body').innerHTML += `<img src= "${json.image.url}"height = 200 width = 200/>`
// This line doesn't work for more than 1 click, so we get a div for image





//document.querySelector('body').innerHTML += "Goodbye"


// Searching for a Hero - We basically do not have a new function cause we can just pass name instead of id (/name instead of /id)
// WHat we need to change for names is that we need to get the first match : results[0]








const fetch_searched_hero_data = (name) => {
  fetch(`${apiurl}/search/${name}`)
    .then(response => response.json())
    //.then(json => console.log(json.name)) If we just wanted name
    .then(json => {
      console.log(json)
      displayall(json)
    })
    .catch(error => {
      alert('Superhero not Found')
      return
    })
}

searched_hero.onclick = () => {
  bgdiv.innerHTML = ''
  if (search_a_hero_userI.value == '') {
    alert('Empty Input')
  }
  else {
    fetch_searched_hero_data(search_a_hero_userI.value)
  }
}



const displayall = (character) => {
  if (character.results.length > 1) {
    //console.log('Function Executed')
    bgdiv.innerHTML = '<button type="button" style="margin-right:5px" id = "lastbtn" class="btn btn-info">Previous</button><button type="button" id = "nextbtn" class="btn btn-info">Next</button>'
    lastbtn = document.getElementById('lastbtn')
    nextbtn = document.getElementById('nextbtn')
    let i = 0
    fetch_hero_data(character.results[i].id)
    lastbtn.onclick = () => {
      if (i == 0) {
        return
      }
      else {
        i -= 1
        fetch_hero_data(character.results[i].id)
      }
    }

    nextbtn.onclick = () => {
      if (i == character.results.length - 1) {
        return
      }
      else {
        i += 1
        fetch_hero_data(character.results[i].id)
      }
    }
  }
  else {
    fetch_hero_data(character.results[0].id)
  }



}