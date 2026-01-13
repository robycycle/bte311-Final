🌍 Ankara Yaşam ve Su Monitörü
Bu proje; küresel ısınma ve Ankara barajlarındaki su rezervlerinin azalmasıyla derinleşen iklim krizine karşı toplumsal farkındalık yaratmak amacıyla geliştirilmiştir. Ankara’nın ilçelerindeki günlük su döngüsünü anlık verilerle takip eden uygulama, elde edilen analizleri Birleşmiş Milletler Sürdürülebilir Kalkınma Amaçları'ndan SDG 6 (Temiz Su ve Sanitasyon) ve SDG 13 (İklim Eylemi) ile ilişkilendirerek kullanıcıya dinamik bir takip paneli sunar.

Teknik Özellikler ve Karar Mantığı
Günlük Veri Agregasyonu
Uygulama, OpenWeather ve Open-Meteo API'lerinden gelen anlık verileri harmanlayarak günlük toplam yağış (Yağmur + Kar) miktarını hesaplar.
• Ayrıştırılmış Veri: Yağışın ne kadarı sıvı (yağmur), ne kadarı katı (kar) olarak düştüğünü mm cinsinden analiz eder.
• Gece/Gündüz Kontrolü: API'den gelen ikon verisine göre arayüz temasını otomatik olarak güncelleyerek dinamik bir kullanıcı deneyimi sunar.

Sürdürülebilirlik (SDG) Analiz Eşiği
Sistem, toplanan verileri projemiz için belirlenen kritik bir eşik değerine göre yorumlar:
• 1.5 mm Eşiği: Eğer bir ilçede günlük toplam yağış 1.5 mm altındaysa, sistem otomatik olarak "Kritik su döngüsü yetersizliği" uyarısı verir.
• SDG Bağlantısı: Bu analiz, kullanıcıyı SDG 6 (Temiz Su) ve SDG 13 (İklim Eylemi) hedefleri doğrultusunda yer altı su kaynaklarını korumaya teşvik eder.

Kullandığım Araçlar
• React (Vite): Bileşen bazlı modern mimari, useState ve useEffect hook yönetimi.
• Bootstrap: Mobil uyumlu (responsive) kart ve popup tasarımları.
• SVG Path Mapping: Ankara'nın 25 ilçesi için özel olarak kodlanmış etkileşimli vektörel harita.
• API: OpenWeatherMap https://api.openweathermap.org & Open-Meteo https://open-meteo.com/

Kurulum ve Çalıştırma Talimatları
Projeyi yerel bilgisayarınızda çalıştırmak için Node.js kurulu olmalıdır.
1. Terminali (CMD) açın.
2. Klasörün içerisine girin : Proje dosyalarının bulunduğu dosya yoluna klasöre "cd" komutu ile gidin.
3. Projeyi Başlatma: Uygulamayı yerel sunucuda (Localhost) ayağa kaldırmak için "npm dev run" komutunu girin.
4. Tarayıcınızda terminalde belirtilen adresi (örneğin http://localhost:5173) açarak uygulamayı kullanmaya başlayabilirsiniz.
   
⚠️ Veri Sorumluluk Notu
Bu platformda sunulan veriler sadece sürdürülebilirlik farkındalığı oluşturmak amacıyla sunulan tahminlerdir. Hayati kararlar için T.C. Meteoroloji Genel Müdürlüğü resmi verileri esas alınmalıdır.

Ekran Görüntüsü:
<img width="1919" height="863" alt="image" src="https://github.com/user-attachments/assets/323b098e-e5d7-408e-baaf-a9e3cff34707" />
<img width="1919" height="715" alt="image" src="https://github.com/user-attachments/assets/26ea7632-9f36-41b1-8c49-08cdf5fca3b1" />

--------------------------------------------------------------------------------

Ders Sorumlusu: Dr. Esra KIDIMAN DEMİRHAN
Geliştirici: Nurbanu Polat
