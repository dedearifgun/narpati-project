import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SectionTitle = ({ children }) => (
  <h2 className="mt-4 mb-3" style={{ fontWeight: 700 }}>{children}</h2>
);

const Bullet = ({ children }) => (
  <li className="mb-2">{children}</li>
);

const SejarahPage = () => {
  return (
    <Container className="py-5 with-navbar-offset">
      <h1 className="mb-1">Sejarah & Profil</h1>
      <p className="text-muted mb-4">Profil singkat, visi-misi, sejarah, produk, dan prestasi Narpati Leather.</p>

      {/* Tentang Kami */}
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <SectionTitle>Tentang Kami</SectionTitle>
              <p>
                Narpati Leather merupakan salah satu UMKM yang memproduksi dan menjual
                produk-produk berbahan dasar kulit, baik kulit sapi maupun kulit domba.
                Produk yang dihasilkan di antaranya jaket kulit, tas pria dan wanita,
                dompet, ikat pinggang, dan aksesori lainnya.
              </p>
              <Row>
                <Col md={6}>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    <Bullet>
                      <strong>Nama Perusahaan:</strong> NARPATI LEATHER
                    </Bullet>
                    <Bullet>
                      <strong>Bidang Usaha:</strong> Retail kerajinan produk kulit
                    </Bullet>
                    <Bullet>
                      <strong>Alamat:</strong> Jln A. Yani No. 302–302, Komplek Sukaregang Leather Center,
                      Kel. Kota Wetan, Kec. Garut Kota, Kab. Garut – Jawa Barat
                    </Bullet>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    <Bullet><strong>Pemilik:</strong> Haliman Nasir</Bullet>
                    <Bullet>
                      <strong>Instagram:</strong> <a href="https://instagram.com/narpati_leather" target="_blank" rel="noopener noreferrer">@narpati_leather</a>
                    </Bullet>
                    <Bullet>
                      <strong>No. Tlp:</strong> <a href="tel:082116961475">0821 1696 1475</a>
                    </Bullet>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Visi & Misi */}
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <SectionTitle>Visi & Misi</SectionTitle>
              <Row>
                <Col md={6}>
                  <h5 className="fw-bold">Visi</h5>
                  <p>
                    Menjadi UMKM pilihan masyarakat serta kebanggaan daerah Garut yang
                    mampu menghasilkan produk kerajinan kulit berkualitas.
                  </p>
                </Col>
                <Col md={6}>
                  <h5 className="fw-bold">Misi</h5>
                  <ul>
                    <Bullet>
                      Menjadi UMKM yang menghasilkan dan menjadi retail produk kulit berkualitas.
                    </Bullet>
                    <Bullet>
                      Berkontribusi memenuhi kebutuhan produk-produk kulit yang dibutuhkan masyarakat.
                    </Bullet>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sejarah Toko */}
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <SectionTitle>Sejarah Toko</SectionTitle>
              <p>
                Berawal dari hadirnya sentra penjualan kerajinan kulit terbesar di Kabupaten Garut,
                yang kini dikenal sebagai Sukaregang Leather Center, Narpati Leather menjadi
                salah satu bagian dari banyaknya toko retail di dalamnya. Memulai usaha pada
                Maret 2015, Narpati Leather konsisten memproduksi dan menjual produk-produk
                kerajinan kulit berkualitas.
              </p>
              <SectionTitle>Linimasa Singkat</SectionTitle>
              <ul>
                <Bullet>2015 — Memulai operasional di Sukaregang Leather Center.</Bullet>
                <Bullet>2016 — Ekspansi kategori produk dan peningkatan kapasitas produksi.</Bullet>
                <Bullet>2017 — Penghargaan UKM Berprestasi dari Bupati Garut.</Bullet>
                <Bullet>2018–2020 — Penguatan brand dan peningkatan kanal pemasaran.</Bullet>
                <Bullet>2021–Sekarang — Diversifikasi produk dan perbaikan layanan pelanggan.</Bullet>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Produk & Layanan */}
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <SectionTitle>Produk & Layanan</SectionTitle>
              <ul>
                <Bullet>Jaket kulit</Bullet>
                <Bullet>Tas untuk pria dan wanita</Bullet>
                <Bullet>Dompet</Bullet>
                <Bullet>Ikat pinggang</Bullet>
                <Bullet>Aksesori kulit lainnya</Bullet>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Prestasi */}
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <SectionTitle>Prestasi</SectionTitle>
              <ul>
                <Bullet>
                  2017 — Penghargaan dari Bupati Garut sebagai UKM Berprestasi Bidang Kerajinan Kulit
                  Tingkat Kabupaten Garut.
                </Bullet>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SejarahPage;