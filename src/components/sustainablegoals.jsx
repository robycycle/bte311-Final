import sg6 from "../assets/sg6.png";
import sg13 from "../assets/sg13.png";
import "./sustainablegoals.css";

function SustainableGoals() {
  return (
    <section className="container my-4">
      <div className="row justify-content-between">

        {/* AMAÇ 6 */}
        <div className="col-md-5">
          <div className="d-flex align-items-start gap-3">
            <div className="goal-box"> 
              <a href="https://www.kureselamaclar.org/amaclar/temiz-su-ve-sanitasyon/" target="_blank" rel="noopener noreferrer">
              <img src={sg6} alt="Amaç 6 - Temiz Su ve Sanitasyon" /> </a> </div>
            <p className="small mb-0">
              <strong>Temiz Su ve Sanitasyon:</strong><br />
              Ankara'nın su döngüsünü ilçe bazlı verilerle izleyerek, kentsel su kaynaklarının verimli kullanımına dair farkındalık oluşturmayı ve sürdürülebilir su yönetimini desteklemeyi amaçlıyoruz.
            </p>
          </div>
        </div>

        {/* AMAÇ 13 */}
        <div className="col-md-5">
          <div className="d-flex align-items-start gap-3">
            <div className="goal-box">
              <a href="https://www.kureselamaclar.org/amaclar/iklim-eylemi/" target="_blank" rel="noopener noreferrer">
                <img src={sg13} alt="Amaç 13 - İklim Eylemi" /> </a>
            </div>
            <p className="small mb-0">
              <strong>İklim Eylemi:</strong><br />
              Değişen yağış rejimlerini ve kuraklık riskini anlık verilerle analiz ederek, iklim krizinin yerel etkilerine karşı toplumsal direnci artırmayı ve bireysel iklim eylemlerini teşvik etmeyi hedefliyoruz.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default SustainableGoals;
