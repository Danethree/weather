import {useState} from 'react'
import { API_KEY } from './API.env';


function App() {
  const [city,setCity] = useState("");
  const [weatherForecast,setWeatherForecast] = useState(null)
  const handleChange = (e) => {
    setCity(e.target.value);
  }
  const handleSearch = ()=>{
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=pt`)
    .then((response)=>{
      if(response.status === 200)
      {
        return response.json()
      }

    })

    .then((data)=>{
      setWeatherForecast(data)
    })
  }
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-7 ">
          <a className="navbar-brand text-white" href = "#top">Previsão do tempo</a>
      </nav>
      <main className="container">
          <div className="jumbotron mb-7">
            <h1>Verifique agora a previsão do tempo da sua cidade</h1>
            <p className="lead">Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar</p> 
            <div className="row mb-4">
                <div className="col-md-6">
                  <input className="form-control" value={city} onChange={handleChange}>

                  </input>
                </div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={handleSearch}>
              Pesquisar
            </button>

           {weatherForecast ? (
                <div>
                <div className="mt-4 d-flex align-items-center">
                <div>
                  <img src={weatherForecast.current.condition.icon}/>
                </div>
                <div>
                  <h3>Tempo: {weatherForecast.current.condition.text}</h3>
                  <p className= "lead">
                    Temperatura: {weatherForecast.current.temp_c} °C
                  </p>
                </div>
                </div>
              </div>
         
           ):null}
           
           
          </div>

      </main>

   
    </div>
  )
}

export default App
