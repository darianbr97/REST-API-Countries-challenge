//access to the URL of details's page
const query = new URLSearchParams(window.location.search)
const params = {
    name: query.get('name'),
    darkMode: query.get('darkMode')
}

if(params.darkMode === 'true'){
    console.log('add')
    document.querySelector('body').classList.add('dark-mode')
}else if(params.darkMode === 'false') {
    console.log('remove')
    document.querySelector('body').classList.remove('dark-mode')
}

//access to the sections
const sectionDetails = document.getElementById('details')
const templateDetails = document.getElementById('template-details').content
const fragment = document.createDocumentFragment()
const sectionBtnBorders = document.querySelector('.border-countries')
const btnBACK = document.querySelector('nav a')

document.addEventListener('DOMContentLoaded', e => {
    fetchData()
})

const fetchData = async() => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json()
        const dataFilter = data.filter(country => country.name.common === params.name)
        console.log(dataFilter)
        paintDetails(dataFilter)
        loadParamURL(data)
    } catch (error) {
        console.log(error)
    }
}

const paintDetails = data => {
    sectionDetails.innerHTML = ''
    data.forEach(country => {
        const clone = templateDetails.cloneNode(true)
        clone.querySelector('img').setAttribute('src',country.flags.png)
        clone.querySelector('h2').textContent = country.name.common
        clone.querySelectorAll('.primary p')[0].innerHTML = `Native Name: <span>${country.name.common}</span>`
        clone.querySelectorAll('.primary p')[1].innerHTML = `Population: <span>${country.population}</span>`
        clone.querySelectorAll('.primary p')[2].innerHTML = `Region: <span>${country.region}</span>`
        clone.querySelectorAll('.primary p')[3].innerHTML = `Sub Region: <span>${country.subregion}</span>`
        clone.querySelectorAll('.primary p')[4].innerHTML = `Capital: <span>${country.capital}</span>`
        clone.querySelectorAll('.secondary p')[0].innerHTML = `Top Level Domain: <span>${country.tld}</span>`
        let cadCurr = clone.querySelectorAll('.secondary p')[1].innerHTML = `Currencies: `
        const arrayCurr = country.currencies
        let subcadena
        Object.values(arrayCurr).forEach(curr => {
            subcadena = `<span>${curr.name}</span>`
            return
        })
        cadCurr += subcadena
        clone.querySelectorAll('.secondary p')[1].innerHTML = cadCurr

        let cantLng = clone.querySelectorAll('.secondary p')[2].textContent 
        cantLng = 'Languages: '
        const arrayLng = country.languages
        Object.values(arrayLng).forEach(lng => {
            cantLng += `<span>${lng}</span>, `
        })
        const cadena = cantLng.substring(0,(cantLng.length)-2)
        clone.querySelectorAll('.secondary p')[2].innerHTML = cadena
        
        let cantBorders = clone.querySelector('.border-countries').innerHTML = `<p>Border Countries:</p> <div class="btnBorders">`
        try {
            let arrayBorders = country.borders
            arrayBorders.forEach(bds => {
                cantBorders += `<button value="${bds}">${bds}</button>`
            })
            cantBorders += `</div>`
            clone.querySelector('.border-countries').innerHTML = cantBorders 
        } catch (error) {
            console.log(`${country.name.common} no tiene paises fronteras`)
        }     
        
        fragment.appendChild(clone)
        sectionDetails.appendChild(fragment)
    });  
}

const loadParamURL = data => {
    let url
    sectionDetails.addEventListener('click', e => {
        // console.log(e.target.tagName)
        if(e.target.tagName === 'BUTTON'){
            const theCountry = data.filter(country => country.cca3 === e.target.getAttribute('value'))
            console.log(theCountry[0].name.common)
            url = `detail.html?name=${theCountry[0].name.common}&darkMode=${document.querySelector('body').classList.contains('dark-mode')}`
            window.open(url,'_self')
        }
    })
}

btnBACK.addEventListener('click', () => {
    let url = btnBACK.getAttribute('href')
    url += `?darkMode=${document.querySelector('body').classList.contains('dark-mode')}`
    btnBACK.setAttribute('href',url)
})