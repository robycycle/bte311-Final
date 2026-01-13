const Footer = () => {
  return (
    <footer className="bg-white text-dark p-4 mt-5 border-top">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {/* API Bilgilendirmesi */}
            <p className="small mb-2 text-muted">
              Bu platformda sunulan yağış ve iklim verileri <strong>Open-Meteo</strong> ve 
              <strong> OpenWeather</strong> API servisleri aracılığıyla anlık olarak çekilmektedir.
            </p>
            
            {/* Yasal Uyarı Metni */}
            <p className="small mb-2 text-muted" style={{ fontSize: '0.85rem' }}>
              Veriler sadece sürdürülebilirlik farkındalığı oluşturmak amacıyla sunulan birer tahmin niteliğindedir. 
              Hayati kararlarınız ve resmi işlemleriniz için lütfen <strong>T.C. Meteoroloji Genel Müdürlüğü</strong>'nün 
              resmi verilerini kullanınız.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;