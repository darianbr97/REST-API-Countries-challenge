//access to template-cards
const template = document.querySelector('#template-card').content
const fragment = document.createDocumentFragment()
const sectionCountries = document.querySelector('.countries')
const anclas = document.querySelector('.card-details a')

let search = {
    pais: "all",
    region: ""
}

document.addEventListener('click', e => {
    e.stopPropagation()
    if(!(e.target.classList.contains('select-box')||
        e.target.classList.contains('select-content')||
            e.target.classList.contains('select-title')||
                e.target.classList.contains('fa-angle-down')||
                    e.target.classList.contains('options')||
                        e.target.classList.contains('options-title'))) {
            select.classList.remove('active')
            optionsBox.classList.remove('active')             
    }

    if(e.target.classList.contains('card-details')) {
        let url = e.target.getAttribute('href')
        const end = url.search('&')
        let newUrl = url.substring(0,end)
        newUrl = newUrl + `&darkMode=${document.querySelector('body').classList.contains('dark-mode')}`
        e.target.setAttribute('href',newUrl)
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const query = new URLSearchParams(window.location.search)
    const param = query.get('darkMode')
    console.log(query)

    if(param === 'true'){
        console.log('add')
        document.querySelector('body').classList.add('dark-mode')
    }else if(param === 'false') {
        console.log('remove')
        document.querySelector('body').classList.remove('dark-mode')
    }
    fetchData()
})
 
const fetchData = async() => {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/all`)
        const data = await res.json()
        console.log(data)
        paintCard(data)
        searchCountry(data)
        searchRegion(data)
    } catch (error) {
        console.log(error)
    }
}

const paintCard = data_server => {
    sectionCountries.innerHTML = ''
    data_server.forEach(country => {
        const clone = template.cloneNode(true)
        clone.querySelector('.card-picture').setAttribute('src',country.flags.png)
        clone.querySelector('.card-country').innerHTML = `<h4 class="card-country">${country.name.common}</h4>` 
        clone.querySelector('.card-population').innerHTML = `<p class="card-population">Population: <span class="number">${country.population}</span></p>` 
        clone.querySelector('.card-region').innerHTML = `<p class="card-region">Region: <span class="number">${country.region}</span></p>`
        clone.querySelector('.card-capital').innerHTML = `<p class="card-capital">Capital: <span class="number">${country.capital}</span></p> ` 
        clone.querySelector('a').innerHTML = `<a  href="detail.html?name=${country.name.common}&darkMode=${document.querySelector('body').classList.contains('dark-mode')}" class="card-details">More info...</a> `
        fragment.appendChild(clone)
    });
    sectionCountries.appendChild(fragment)
}