//access to element's search
const form = document.querySelector('.search-country')
const inputSearch = document.querySelector('.searches input')
const inputFilter = document.querySelector('.search-region input')
const select = document.querySelector('.select-content')
const optionsBox = document.querySelector('.options')
const optionSelect = document.querySelector('.options')

select.addEventListener('click', e => {
    select.classList.toggle('active')
    optionsBox.classList.toggle('active')
})

optionsBox.addEventListener('click', e => {
    select.querySelector('h4').textContent = e.target.textContent
    inputFilter.value = e.target.textContent
    select.classList.toggle('active')
    optionsBox.classList.toggle('active')
})

const searchCountry = data => {
    form.addEventListener('keyup', (e) => {
        e.preventDefault()
        search.pais = inputSearch.value.toLowerCase()
        const dataFilter = data.filter(country => {
            const allNamesCountries = country.name.official.toLowerCase()
            if(allNamesCountries.indexOf(search.pais) !== -1) {
                return country
            }
        })
        // console.log(dataFilter)
        paintCard(dataFilter)
    })    
}

const searchRegion = data => {
    optionSelect.addEventListener('click', e => {
        e.preventDefault()
        console.log('cambiar region')
        search.region = e.target.textContent.toLowerCase()
        const dataFilter = data.filter(country => {
            const allRegion = country.region.toLowerCase()     
            if(allRegion.indexOf(search.region) !== -1) {
                return country
            }
        })    
        // console.log(dataFilter)
        paintCard(dataFilter)
    })
}