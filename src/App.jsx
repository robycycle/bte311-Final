import { useEffect, useState } from "react";
import Header from "./components/header";
import SustainableGoals from "./components/sustainablegoals";
import AnkaraMap from "./components/ankaramap";
import { districtConfig } from "./data/districtConfig";
import "./App.css";
import Footer from "./components/footer";

function App() {
  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState("");
  const [isNight, setIsNight] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [districtLoading, setDistrictLoading] = useState(false);
  const [districtPrecipitation, setDistrictPrecipitation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDistricts = Object.keys(districtConfig).filter(key =>
    districtConfig[key].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchDistrictDailyPrecipitation = async (districtKey) => {
    const district = districtConfig[districtKey];
    if (!district) return;
    const { lat, lon } = district;

    try {
      setDistrictLoading(true);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum,rain_sum,snowfall_sum,precipitation_probability_mean&timezone=Europe/Istanbul`
      );

      if (!res.ok) throw new Error("Veri alınamadı");
      const data = await res.json();

      setDistrictPrecipitation({
        rain: data.daily?.rain_sum?.[0] ?? 0,
        snow: data.daily?.snowfall_sum?.[0] ?? 0,
        total: data.daily?.precipitation_sum?.[0] ?? 0,
        probability: data.daily?.precipitation_probability_mean?.[0] ?? 0
      });
    } catch (err) {
      console.error("Yağış verisi hatası:", err);
    } finally {
      setDistrictLoading(false);
    }
  };

  const handleDistrictClick = (districtKey, event) => {
    if (!event || !event.currentTarget) return;

    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });

    setSelectedDistrict(districtKey);
    fetchDistrictDailyPrecipitation(districtKey);
  };

  useEffect(() => {
    async function fetchAnkaraWeather() {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Ankara&appid=${API_KEY}&units=metric&lang=tr`
        );
        if (!response.ok) throw new Error("Hava durumu alınamadı");
        const data = await response.json();
        setIsNight(data.weather[0].icon.includes("n"));
        setTemperature(Math.round(data.main.temp));
        setWeather(data.weather[0].main);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAnkaraWeather();
  }, []);

  if (loading) return <p>Veriler analiz ediliyor...</p>;
  if (error) return <p>Bir hata oluştu: {error}</p>;

  return (
    <div className="app-container">
      <Header temperature={temperature} weather={weather} isNight={isNight} />
      <SustainableGoals />
      <div className="container-fluid px-4 mt-4">
        <div className="row">
          <div className="col-lg-6 text-center">
            <main className="content shadow-sm bg-white rounded p-3">
              <AnkaraMap onDistrictClick={handleDistrictClick} />
            </main>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">🔍</span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="İlçe ara (Sincan, Çankaya...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {searchTerm && (
                  <ul className="list-group list-group-flush mt-2 shadow-sm rounded border" style={{ maxHeight: '150px', overflowY: 'auto', position: 'absolute', zIndex: 10, width: '90%' }}>
                    {filteredDistricts.map(key => (
                      <button
                        key={key}
                        className="list-group-item list-group-item-action border-0"
                        onClick={() => {
                          setSelectedDistrict(key);
                          fetchDistrictDailyPrecipitation(key);
                          setSearchTerm("");
                        }}
                      >
                        {districtConfig[key].name}
                      </button>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {selectedDistrict ? (
              <div className="card border-0 shadow-lg animated fadeIn" style={{ borderRadius: '15px' }}>
                <div className="card-header bg-primary text-white py-3" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                  <h5 className="mb-0 text-white">{districtConfig[selectedDistrict].name} Analiz Raporu</h5>
                </div>
                <div className="card-body p-4">
                  {districtLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                      <p className="mt-2 text-muted">İklim verileri işleniyor...</p>
                    </div>
                  ) : districtPrecipitation && (
                    <>
                      <div className="row text-center mb-4">
                        <div className="col-6 border-end">
                          <small className="text-muted text-uppercase">Yağış Dengesi</small>
                          <h2 className="fw-bold">%{districtPrecipitation.probability}</h2>
                        </div>
                        <div className="col-6">
                          <small className="text-muted text-uppercase">Toplam Miktar</small>
                          <h2 className={`fw-bold ${districtPrecipitation.total < 1.5 ? 'text-danger' : 'text-primary'}`}>
                            {districtPrecipitation.total.toFixed(1)} mm
                          </h2>
                        </div>
                      </div>

                      <div className={`alert ${districtPrecipitation.total < 1.5 ? 'alert-warning' : 'alert-info'} border-0 shadow-sm mb-4`}>
                        <h6 className="fw-bold mb-2">📊 SDG Analizi (Hedef 6 & 13)</h6>
                        <p className="small mb-0" style={{ lineHeight: '1.5' }}>
                          {districtPrecipitation.total < 1.5
                            ? "⚠️ Mevcut yağış seviyesi sürdürülebilir su döngüsünün altındadır. Yeraltı su kaynaklarının korunması için toplumsal farkındalık artırılmalıdır."
                            : "✅ Yağış miktarı kısa vadeli tarımsal ihtiyaçlar için yeterli görünse de, uzun vadeli su depolama stratejileri hayati önemini korumaktadır."}
                        </p>
                      </div>

                      <ul className="list-group list-group-flush small">
                        <li className="list-group-item d-flex justify-content-between px-0">
                          <span>💧 Toplam Yağmur</span>
                          <span className="badge bg-light text-dark">{districtPrecipitation.rain.toFixed(1)} mm</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between px-0">
                          <span>❄️ Kar Birikimi</span>
                          <span className="badge bg-light text-dark">{districtPrecipitation.snow.toFixed(1)} cm</span>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
                <div className="card-footer bg-white text-center py-2">
                  <small className="text-muted" style={{ fontSize: '10px' }}>Kaynak: Open-Meteo Global SDGs Model | 2026</small>
                </div>
              </div>
            ) : (
              <div className="card border-0 shadow-sm p-5 text-center text-muted bg-white" style={{ borderRadius: '15px', borderStyle: 'dashed', borderWidth: '2px' }}>
                <p className="mb-0">Analiz detaylarını görüntülemek için haritadan bir ilçe seçin veya arama yapın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {selectedDistrict && districtConfig[selectedDistrict] && (
        <div
          className="popup"
          style={{
            position: "fixed",
            left: popupPosition.x,
            top: popupPosition.y,
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
            backgroundColor: 'rgba(255,255,255,0.98)',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            pointerEvents: 'auto' // BURASI DÜZELDİ: Butona tıklayabilmen için auto olmalı
          }}
        >
          <button
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation(); // Harita tıklamasını engeller
              setSelectedDistrict(null); // Pop-up'ı kapatır
            }}
          >
            ×
          </button>

          <strong style={{ display: 'block', textAlign: 'center', marginBottom: '5px' }}>{districtConfig[selectedDistrict].name}</strong>
          {districtPrecipitation && (
            <div style={{ fontSize: '12px', textAlign: 'center' }}>
              Yağış: %{districtPrecipitation.probability} | {districtPrecipitation.total.toFixed(1)}mm
            </div>
          )}
        </div>
      )}
    </div>
    
  );
}

export default App;