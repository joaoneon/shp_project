import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isValidationSuccessful, setIsValidationSuccessful] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('csvFile', selectedFile);

      try {
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Arquivo enviado com sucesso:', response.data);
        document.getElementById('botao-validar').disabled = false;
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
      }
    }
  };

  const handleValidation = async () => {
    try {
      const response = await axios.post('http://localhost:3001/validar-arquivo');

      if (response.status === 200) {
        setIsValidationSuccessful(true);
      }
    } catch (error) {
      console.error('Erro ao validar o arquivo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect} />
      <button type="submit">Enviar</button>
      <button id="botao-validar" onClick={handleValidation} disabled={!selectedFile}>Validar Arquivo</button>
      <button id="botao-integrar" disabled={!isValidationSuccessful}>Alterar no BD</button>
    </form>
  );
};

export default FileUpload;
