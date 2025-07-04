import React, { useState, useEffect } from 'react';
import ClosetCategory from './ClosetCategory';
import axios from '../../services/axiosInstance';
import PlanDetails from './PlanDetails';  // əlavə et
import styles from './Planner.module.css';
import Suggestions from './Suggestions';

const Planner = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [planName, setPlanName] = useState('');
  const [planType, setPlanType] = useState('Ümumi');
  const [savedPlans, setSavedPlans] = useState([]);
  const [viewPlan, setViewPlan] = useState(null);
  const [editingPlanId, setEditingPlanId] = useState(null);

  // Paltar seçmə funksiyası
  const handleSelectItem = (item) => {
    setSelectedItems(prev => {
      if (prev.some(i => i._id === item._id)) {
        return prev.filter(i => i._id !== item._id);
      }
      return [...prev, item];
    });
  };

  // Planı yadda saxla və update et
  const savePlan = async () => {
    if (!planName) {
      alert('Plana ad verin');
      return;
    }
    if (selectedItems.length === 0) {
      alert('Ən az bir paltar seçin');
      return;
    }

    try {
      const items = selectedItems.map(item => ({
        product: item._id,
        image: item.image,
        title: item.title,
      }));

      if (editingPlanId) {
        // Update plan
        await axios.put(`/planner/${editingPlanId}`, {
          name: planName,
          type: planType,
          items,
        });
        alert('Plan yeniləndi');
      } else {
        // Yeni plan yarat
        await axios.post('/planner', {
          name: planName,
          type: planType,
          items,
        });
        alert('Plan yadda saxlanıldı');
      }

      setPlanName('');
      setPlanType('Ümumi');
      setSelectedItems([]);
      setEditingPlanId(null);
      fetchSavedPlans();
    } catch (error) {
      console.error('Plan yadda saxlanmadı:', error);
      alert('Xəta baş verdi');
    }
  };

  // Yadda saxlanmış planları gətir
  const fetchSavedPlans = async () => {
    try {
      const res = await axios.get('/planner');
      setSavedPlans(res.data);
    } catch (error) {
      console.error('Planlar gətirilə bilmədi:', error);
    }
  };

  const handleAddSuggestionItems = (item) => {
  setSelectedItems(prev => {
    if (prev.some(i => i._id === item._id)) return prev;
    return [...prev, item];
  });
};


  // Plan silmək
  const handleDelete = async (id) => {
    if (!window.confirm('Planı silmək istədiyinizə əminsiniz?')) return;
    try {
      await axios.delete(`/planner/${id}`);
      alert('Plan silindi');
      // Əgər silinən plan edit vəziyyətindədirsə, reset et
      if (editingPlanId === id) {
        setPlanName('');
        setPlanType('Ümumi');
        setSelectedItems([]);
        setEditingPlanId(null);
      }
      fetchSavedPlans();
    } catch (error) {
      console.error('Plan silinmədi:', error);
      alert('Plan silinmədi, xəta baş verdi');
    }
  };

  // Plan redaktə etmək üçün
  const handleEdit = (id) => {
    const planToEdit = savedPlans.find(plan => plan._id === id);
    if (!planToEdit) return alert('Plan tapılmadı');

    setPlanName(planToEdit.name);
    setPlanType(planToEdit.type || 'Ümumi');
    setSelectedItems(planToEdit.items.map(item => ({
      _id: item.product || item._id,
      image: item.image,
      title: item.title,
    })));
    setEditingPlanId(id);
    setViewPlan(null);
  };

  useEffect(() => {
    fetchSavedPlans();
  }, []);

  return (
    <div>
        <div className={styles.planner}>
      <h1>Geyim Planlayıcısı</h1>

      <input
        type="text"
        placeholder="Plan adı"
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
      />

      <select value={planType} onChange={(e) => setPlanType(e.target.value)}>
        <option value="Ümumi">Ümumi</option>
        <option value="Spor">Spor</option>
        <option value="Rəsmi">Rəsmi</option>
      </select>

      <ClosetCategory onSelectItem={handleSelectItem} />

      <div className={styles.textdiv}>
        <h3>Seçilmiş Paltarlar ({selectedItems.length})</h3>
        <div className={styles.selectedItemsContainer}>
          {selectedItems.map(item => (
            <div key={item._id} className={styles.selectedItem}>
              <img src={`http://localhost:5000/closet/${item.image}`} alt={item.title} />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={savePlan} className={styles.saveButton}>
        {editingPlanId ? 'Planı Yenilə' : 'Planı Yadda Saxla'}
      </button>

      <hr />

      <div className={styles.textdiv}>
        <h3>Yadda Saxlanmış Planlar</h3>
        {savedPlans.length === 0 && <p>Heç bir plan yoxdur</p>}
        {savedPlans.map(plan => (
          <div key={plan._id} className={styles.savedPlan}>
            <span
              onClick={() => setViewPlan(plan)}
              style={{ flex: 1, cursor: 'pointer' }}
            >
              {plan.name} ({plan.type})
            </span>
            <div className={styles.planButtons}>
              <button
                className={`${styles.planButton} ${styles.editBtn}`}
                onClick={() => handleEdit(plan._id)}
              >
                Edit
              </button>
              <button
                className={`${styles.planButton} ${styles.deleteBtn}`}
                onClick={() => handleDelete(plan._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {viewPlan && (
        <PlanDetails plan={viewPlan} onClose={() => setViewPlan(null)} />
      )}
    </div>
    <Suggestions
  occasionFilter={planType}  // Mövcud seçilmiş plan tipinə görə filter
  onAdd={handleAddSuggestionItems}
/>
    </div>
    
  );
};

export default Planner;
