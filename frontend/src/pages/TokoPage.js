import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TokoPage = () => {
  const stores = [
    { id: 1, name: 'Cabang Haliman House', city: 'Garut', address: 'Haliman House, Garut', hours: '10:00 - 20:00', mapUrl: 'https://maps.app.goo.gl/bswdXCNDPXfVrwwo7' },
    { id: 2, name: 'Cabang Rama Cipta Indah', city: 'Garut', address: 'C/25 Perum Rama Cipta Indah', hours: '10:00 - 20:00', mapUrl: 'https://maps.app.goo.gl/59XNibDEpx4ymcfa9' },
    { id: 3, name: 'Cabang BLK Garut', city: 'Garut', address: 'UPTD BLK Garut', hours: '10:00 - 20:00', mapUrl: 'https://maps.app.goo.gl/wPeJvLFoV85nTxhU8' },
    { id: 4, name: 'Cabang Mandala Residence', city: 'Garut', address: 'Blok M Mandala Residence 2', hours: '10:00 - 20:00', mapUrl: 'https://maps.app.goo.gl/V1xNmzNhmVojQ477A' },
    { id: 5, name: 'Cabang ITS.Gen-Q', city: 'Garut', address: "International Tahfizh School Generasi Qur'an", hours: '10:00 - 20:00', mapUrl: 'https://maps.app.goo.gl/fjq3st5rjxifPadb9' },
  ];

  return (
    <Container className="py-5 with-navbar-offset">
      <h1 className="mb-1">Toko</h1>
      <p className="text-muted mb-4">Informasi toko pusat dan cabang Narpati Leather.</p>

      {/* Kartu Info Perusahaan */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="store-card">
            <Card.Body>
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                <div>
                  <Card.Title className="mb-2">NARPATI LEATHER</Card.Title>
                  <div className="text-muted mb-2">Retail kerajinan produk kulit</div>
                  <div>
                    <strong>Alamat:</strong><br />
                    Jln A. Yani No. 302–302, Komplek Sukaregang Leather Center<br />
                    Kel. Kota Wetan, Kec. Garut Kota, Kab. Garut – Jawa Barat
                  </div>
                  {/* Link Google Maps toko pusat */}
                  <div className="mt-3">
                    <a
                      href="https://maps.app.goo.gl/US2Z8yDnYfyZxnpr7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Lihat di Google Maps
                    </a>
                  </div>
                </div>
                <div>
                  <ul className="mb-0" style={{ listStyle: 'none', paddingLeft: 0 }}>
                    <li><strong>Pemilik:</strong> Haliman Nasir</li>
                    <li><strong>Instagram:</strong> <a href="https://instagram.com/narpati_leather" target="_blank" rel="noopener noreferrer">@narpati_leather</a></li>
                    <li><strong>No. Tlp:</strong> <a href="tel:082116961475">0821 1696 1475</a></li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <p className="text-muted mb-3">Daftar cabang dan lokasi Google Maps.</p>
      <Row className="store-grid">
        {stores.map((store, idx) => (
          <Col key={store.id} md={6} lg={4} className="mb-4">
            <Card className="store-card" style={{ '--stagger': idx }}>
              <Card.Body>
                <div className="d-flex align-items-start justify-content-between mb-2">
                  <div>
                    <Card.Title className="mb-1">{store.name}</Card.Title>
                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>{store.city}</div>
                  </div>
                  <i className="fas fa-location-dot text-muted" aria-hidden="true"></i>
                </div>
                <Card.Text className="mb-3">
                  <strong>Alamat:</strong> {store.address}<br />
                  <strong>Jam Buka:</strong> {store.hours}
                </Card.Text>
                <a href={store.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-100">
                  Lihat di Google Maps
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TokoPage;