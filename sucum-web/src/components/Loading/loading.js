import React from 'react';
import './loading.css'; // Arquivo CSS para estilizar o indicador de carregamento

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;