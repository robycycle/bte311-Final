import "./Header.css";


function Header({ temperature, weather , isNight }) {
  return (
    <header className={`header header-${weather.toLowerCase()} ${isNight ? "night" : "day"}`}>
      <div className="header-left">
         <h1>Ankara</h1>
        <h2>Yaşam ve Su Monitörü</h2>
        
      </div>

      <div className="row mt-2">
          <div className="col-12">
            {/* Hafta 8 notlarındaki Bootstrap tipografi sınıfları [3] */}
            <p className="small text-white-55 m-0 pt-2 header-description">
              <strong> Sürdürülebilir Kalkınma Hedefleri (Amaç 6: Temiz Su ve Sanitasyon & Amaç 13: İklim Eylemi)</strong>
              doğrultusunda geliştirilen bu sayfa, Ankara’ya ait hava durumu verilerini kullanarak iklim değişikliği ve su kaynaklarının korunmasına yönelik toplumsal farkındalık oluşturmayı amaçlamaktadır.
          
            </p>
          </div>
        </div>

      <div className="header-right">
        <span className="temp">{temperature}°C</span>
        <span className="icon">{getWeatherIcon(weather, isNight)}</span>
      </div>
    <div className="header-content">
    </div>
    </header>
  );
}

function getWeatherIcon(weather, isNight) {
  switch (weather) {
    case "Clear":
      return isNight ? "🌙" : "☀️";
    case "Clouds":
      return "☁️";
    case "Rain":
      return "🌧️";
    case "Snow":
      return "❄️";
    case "Thunderstorm":
      return "⛈️";
    default:
      return isNight ? "🌙" : "🌤️";
  }
}


export default Header;

