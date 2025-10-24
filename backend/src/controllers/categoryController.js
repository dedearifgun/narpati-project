const Category = require('../models/categoryModel');
const path = require('path');
const fs = require('fs');
const { logAudit } = require('../utils/audit');

// Tambahkan daftar kategori default: Pria, Wanita, Aksesoris
const DEFAULT_CATEGORIES = [
  { name: 'Pria', gender: 'pria' },
  { name: 'Wanita', gender: 'wanita' },
  { name: 'Aksesoris', gender: 'unisex' },
];

async function ensureDefaultCategories() {
  try {
    // Pastikan tiga kategori utama tersedia
    for (const def of DEFAULT_CATEGORIES) {
      const exists = await Category.findOne({ name: def.name });
      if (!exists) {
        await Category.create({ ...def });
      }
    }

    // Tambahkan subkategori default untuk Aksesoris
    const aksesoris = await Category.findOne({ name: 'Aksesoris' });
    if (aksesoris) {
      const defaultSubs = ['Dinu', 'Jati Borghini'];
      const toAdd = defaultSubs.filter(sub => !aksesoris.subcategories?.includes(sub));
      if (toAdd.length > 0) {
        await Category.updateOne(
          { _id: aksesoris._id },
          { $addToSet: { subcategories: { $each: toAdd } } }
        );
      }
    }
  } catch (_) {
    // abaikan error pembuatan default agar endpoint tetap bekerja
  }
}

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    // Pastikan 3 kategori default tersedia
    await ensureDefaultCategories();

    let query = {};

    // Filter by gender
    if (req.query.gender) {
      query.gender = req.query.gender;
    }

    // Filter by featured
    if (req.query.featured) {
      query.featured = req.query.featured === 'true';
    }

    const categories = await Category.find(query).sort({ order: 1, name: 1 });

    // Batasi hanya ke tiga kategori default
    const allowedNames = new Set(DEFAULT_CATEGORIES.map(d => d.name));
    const filtered = (categories || []).filter(c => allowedNames.has(c.name));

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mendapatkan kategori',
      error: error.message
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategori tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mendapatkan kategori',
      error: error.message
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin)
exports.createCategory = async (req, res) => {
  try {
    // Add image URL if file is uploaded
    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }

    const category = await Category.create(req.body);

    // Audit log
    await logAudit(req, { action: 'create', model: 'Category', itemId: category._id?.toString(), details: { name: category.name } });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal membuat kategori',
      error: error.message
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategori tidak ditemukan'
      });
    }

    // Add image URL if file is uploaded
    if (req.file) {
      // Delete old image if exists
      if (category.imageUrl && category.imageUrl.startsWith('/uploads/')) {
        const oldImagePath = path.join(
          __dirname,
          '../..',
          category.imageUrl
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Audit log
    await logAudit(req, { action: 'update', model: 'Category', itemId: category._id?.toString(), details: { updatedFields: Object.keys(req.body || {}) } });

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengupdate kategori',
      error: error.message
    });
  }
};

// @desc    Reorder categories
// @route   PUT /api/categories/reorder
// @access  Private (Admin)
exports.reorderCategories = async (req, res) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({
        success: false,
        message: 'Payload tidak valid: orders harus berupa array'
      });
    }

    const bulkOps = orders
      .filter(o => (o && (o.id || o._id) !== undefined && typeof o.order === 'number'))
      .map(o => ({
        updateOne: {
          filter: { _id: o.id || o._id },
          update: { $set: { order: o.order } }
        }
      }));

    if (bulkOps.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada operasi yang valid untuk dijalankan'
      });
    }

    await Category.bulkWrite(bulkOps);
    const categories = await Category.find({}).sort({ order: 1, name: 1 });

    // Audit log
    await logAudit(req, { action: 'reorder', model: 'Category', itemId: 'bulk', details: { count: bulkOps.length } });

    res.status(200).json({
      success: true,
      message: 'Urutan kategori berhasil disimpan',
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menyimpan urutan kategori',
      error: error.message
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategori tidak ditemukan'
      });
    }

    // Delete image if exists
    if (category.imageUrl && category.imageUrl.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '../..', category.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await category.deleteOne();

    // Audit log
    await logAudit(req, { action: 'delete', model: 'Category', itemId: category._id?.toString(), details: { name: category.name } });

    res.status(200).json({
      success: true,
      message: 'Kategori berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus kategori',
      error: error.message
    });
  }
};