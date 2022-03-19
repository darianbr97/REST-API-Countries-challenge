//access to dark-mode button
const darkMode = document.querySelector('header button')

darkMode.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('dark-mode')
    console.log('click darkM')
})


