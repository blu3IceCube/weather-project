
const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
const port = 3000

const key = config.MY_KEY

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html')

})

app.post('/weather', (req, res) => {

    const query = req.body.cityName
    const apiKey = key
    const unit = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`

    https.get(url, (response) => {

        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            const location = weatherData.name
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<h1>The temperature in ${location} is ${temp} degrees Celcius.</h1>`)
            res.write(`<img src=${imageUrl}>`)
            res.write(`<h3>${desc}</h3>`)
            res.send()
        })

    })
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})