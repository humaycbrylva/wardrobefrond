import React from 'react';
import styles from './PlanDetails.module.css';

const PlanDetails = ({ plan, onClose }) => {
  if (!plan) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <h2>{plan.name} ({plan.occasion || plan.type || 'Ümumi'})</h2>

        <div className={styles.planItems}>
          {plan.items.map((item, index) => (
            item ? (
              <div key={item._id || index} className={styles.planItem}>
                <img
                  src={`http://localhost:5000/closet/${item.image}`}
                  alt={item.title}
                  className={styles.planImage}
                />
                <span>{item.title}</span>
              </div>
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;

