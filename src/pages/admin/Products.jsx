import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from '../../services/axiosInstance';
import styles from './Products.module.css';

import EditProduct from './EditProduct';  // Yeni modal komponent

const Products = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  const [closetItems, setClosetItems] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);  // Modal üçün state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, closetRes] = await Promise.all([
          axios.get(`/admin/user-products/${userId}`),
          axios.get(`/admin/user/${userId}/closet`)
        ]);
        setProducts(productRes.data);
        setClosetItems(closetRes.data);
      } catch (err) {
        console.error("Məhsullar və geyimlər alınmadı:", err);
      }
    };
    fetchData();
  }, [userId]);

  const handleDelete = async (id, type = 'product') => {
    const confirm = window.confirm('Məhsulu silmək istəyirsiz?');
    if (!confirm) return;

    try {
      if (type === 'product') {
        await axios.delete(`/products/${id}`);
        setProducts(prev => prev.filter(p => p._id !== id));
      } else if (type === 'closet') {
        await axios.delete(`/closet/${id}`);
        setClosetItems(prev => prev.filter(c => c._id !== id));
      }
    } catch (err) {
      console.error("Silinmə xətası:", err);
      alert("Silinmə zamanı xəta baş verdi.");
    }
  };

  // REDAKTƏ üçün modalı açırıq
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // Modaldan sonra yenilənmə funksiyası
  const refreshProducts = async () => {
    try {
      const res = await axios.get(`/admin/user-products/${userId}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Məhsullar yenilənmədi:", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={() => navigate('/admin/products')}>⬅️ Geri</button>

      <h2>İstifadəçinin Əlavə Etdiyi Məhsullar</h2>
      <div className={styles.grid}>
        {products.length === 0 && <p>Heç bir məhsul tapılmadı.</p>}
        {products.map(product => (
          <div key={product._id} className={styles.card}>
            <img
              src={`http://localhost:5000/uploads/${product.images?.[0]}`}
              alt="məhsul"
              className={styles.productImage}
            />
            <p><strong>Kateqoriya:</strong> {product.category}</p>
            <p><strong>Brend:</strong> {product.brand || '—'}</p>
            <p><strong>Ölçü:</strong> {product.size || '—'}</p>
            <p><strong>Rəng:</strong> {product.color || '—'}</p>
            <div className={styles.actions}>
              <button onClick={() => handleEdit(product)}><FaEdit /> Redaktə</button>
              <button onClick={() => handleDelete(product._id, 'product')}><FaTrash /> Sil</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modalı göstər */}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={() => {
            setEditingProduct(null);
            refreshProducts();
          }}
        />
      )}

      {/* Closet geyimlər hissəsi eyni qalır */}
      <h2>İstifadəçinin Closet Geyimləri</h2>
      <div className={styles.grid}>
        {closetItems.length === 0 && <p>Heç bir geyim tapılmadı.</p>}
        {closetItems.map(item => (
          <div key={item._id} className={styles.card}>
            <img
              src={`http://localhost:5000/closet/${item.image}`}
              alt="geyim"
              className={styles.productImage}
            />
            <p><strong>Kateqoriya:</strong> {item.category}</p>
            <p><strong>Brend:</strong> {item.brand || '—'}</p>
            <p><strong>Ölçü:</strong> {item.size || '—'}</p>
            <p><strong>Rəng:</strong> {item.color || '—'}</p>
            <div className={styles.actions}>
              <button /* Closet üçün modal eyni şəkildə əlavə edə bilərsən */ >Redaktə</button>
              <button onClick={() => handleDelete(item._id, 'closet')}><FaTrash /> Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;



