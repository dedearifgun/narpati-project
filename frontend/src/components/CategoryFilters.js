import React, { useMemo, useState } from 'react';

// Sidebar filter bergaya accordion seperti contoh screenshot
// Props:
// - categories: array kategori dari API (name, slug)
// - selectedCategory: slug kategori terpilih atau 'all'
// - onSelectCategory: (slug|'all') => void
// - genderTitle: label gender untuk heading (Pria/Wanita/Aksesoris)
const CategoryFilters = ({ categories = [], selectedCategory = 'all', selectedSubcategory = 'all', onSelectCategory, onSelectSubcategory, genderTitle = '', currentGender = '', subcategories = null }) => {
  const [open, setOpen] = useState({ collection: true, others: false, filters: false });

  // Subkategori dari kategori terpilih, dengan override jika prop `subcategories` tersedia
  const subItems = useMemo(() => {
    // Jika ada override subcategories dari parent (CategoryPage), gunakan itu
    if (Array.isArray(subcategories)) {
      const items = [{ name: 'Semua Style', slug: 'all' }];
      return subcategories.length
        ? [...items, ...subcategories.map(s => ({ name: s, slug: s }))]
        : items;
    }

    // Fallback ke kategori API ketika override tidak diberikan
    if (!Array.isArray(categories) || categories.length === 0) {
      return [{ name: 'Semua Style', slug: 'all' }];
    }
    const current = String(currentGender || '').toLowerCase();
    const selectedSlug = selectedCategory !== 'all'
      ? selectedCategory
      : (categories.find(c => String(c.gender || '').toLowerCase() === current)?.slug || categories[0]?.slug || '');
    const cat = categories.find(c => c.slug === selectedSlug);
    const subs = Array.isArray(cat?.subcategories) ? cat.subcategories : [];
    return [{ name: 'Semua Style', slug: 'all' }, ...subs.map(s => ({ name: s, slug: s }))];
  }, [categories, selectedCategory, currentGender, subcategories]);

  // Daftar kategori utama lain (Pria/Wanita/Aksesoris)
  const otherMainCategories = useMemo(() => {
    const current = String(currentGender || '').toLowerCase();
    const mains = ['pria', 'wanita', 'aksesoris'];
    const label = (slug) => (slug === 'pria' ? 'Pria' : slug === 'wanita' ? 'Wanita' : 'Aksesoris');
    return mains.filter(m => m !== current).map(slug => ({ slug, label: label(slug) }));
  }, [currentGender]);

  return (
    <aside className="filter-sidebar">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        .filter-sidebar { font-family: 'Poppins', sans-serif; }
      `}</style>

      <div className="filter-section">
        <button className="filter-header" onClick={() => setOpen(prev => ({ ...prev, collection: !prev.collection }))}>
          <span className="filter-header-title">Collection</span>
          <span className="filter-header-icon">{open.collection ? '−' : '+'}</span>
        </button>
        {open.collection && (
          <div className="filter-group">
            <div className="filter-group-title">{genderTitle}</div>
            <ul className="filter-list">
              {subItems.map((it) => (
                <li key={it.slug}>
                  <button
                    className={`filter-item ${selectedSubcategory === it.slug ? 'active' : ''}`}
                    onClick={() => {
                      if (it.slug === 'all') {
                        // Reset subkategori ke semua style pada kategori terpilih
                        if (typeof onSelectSubcategory === 'function') onSelectSubcategory('all');
                      } else {
                        if (typeof onSelectSubcategory === 'function') onSelectSubcategory(it.slug);
                      }
                    }}
                  >
                    {it.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="filter-section">
        <button className="filter-header" onClick={() => setOpen(prev => ({ ...prev, others: !prev.others }))}>
          <span className="filter-header-title">Kategori Lain</span>
          <span className="filter-header-icon">{open.others ? '−' : '+'}</span>
        </button>
        {open.others && (
          <div className="filter-group">
            <ul className="filter-list">
              {otherMainCategories.map((it) => (
                <li key={it.slug}>
                  <button
                    className="filter-item"
                    onClick={() => { window.location.href = `/category/${it.slug}/all`; }}
                  >
                    {it.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="filter-section">
        <button className="filter-header" onClick={() => setOpen(prev => ({ ...prev, filters: !prev.filters }))}>
          <span className="filter-header-title">Filters</span>
          <span className="filter-header-icon">{open.filters ? '−' : '+'}</span>
        </button>
        {open.filters && (
          <div className="filter-group">
            <ul className="filter-list">
              {['Size', 'Color', 'Material'].map((label) => (
                <li key={label}>
                  <button className="filter-item inactive" disabled>{label}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};

export default CategoryFilters;