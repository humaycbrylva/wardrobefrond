import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from '../../services/axiosInstance';
import styles from './AdminPanel.module.css';

const Products = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  const [closetItems, setClosetItems] = useState([]);
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

  const handleDelete = async (id) => {
    const confirm = window.confirm('Məhsulu silmək istəyirsiz?');
    if (!confirm) return;
    try {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error("Silinmə xətası:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={() => navigate('/admin/products')}>⬅️ Geri</button>
      <h2>İstifadəçinin Əlavə Etdiyi Məhsullar</h2>

      <h2>İstifadəçinin Closet Geyimləri</h2>

      <div className={styles.grid}>
        {closetItems.map(item => (
          <div key={item._id} className={styles.card}>
            <img src={`http://localhost:5000/uploads/${item.image}`} alt="geyim" />
            <p><strong>Kateqoriya:</strong> {item.category}</p>
            <p><strong>Brend:</strong> {item.brand}</p>
            <p><strong>Ölçü:</strong> {item.size}</p>
            <p><strong>Rəng:</strong> {item.color}</p>
            <div className={styles.actions}>
              <button onClick={() => handleEdit(item._id)}><FaEdit /> Redaktə</button>
              <button onClick={() => handleDelete(item._id)}><FaTrash /> Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;


