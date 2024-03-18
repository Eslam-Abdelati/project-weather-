let form = document.querySelector('#form1')

const errorF = document.querySelector('#error')
const locationA = document.querySelector('#location')
const forecastF = document.querySelector('#forecast')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherFunction()
    form.reset()
})

const weatherFunction = async () => {
    try {
        const countryName = document.querySelector('#countryName').value
        const res = await fetch('http://localhost:3000/wether?address=' + countryName)
        const data = await res.json()
        if (data.error) {
            errorF.innerHTML = data.error
            locationA.innerHTML = ""
            forecastF.innerHTML = ""
        } else {
            setTimeout(()=>{
                locationA.innerHTML = data.location
            },100)
            setTimeout(() => {
                forecastF.innerHTML = data.forecast
            },1000);
            errorF.innerHTML = ""
        }
    } catch (e) {
        console.log(e);
    }
}
