import React from 'react';
import './skeleton.css'; // Arquivo CSS para estilizar o indicador de carregamento

const Skeleton = () => {
  return (
    <div className="container">
      <div className="skeleton">
        <div className="skeleton-header"></div>
        <div className='containerLabels'>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
        </div>
      </div>
  </div>
  );
};

export default Skeleton;