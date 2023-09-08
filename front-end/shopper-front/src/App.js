import './App.css';
import mainLogo from './assets/shopper_logo.png'
import logOutImg from './assets/vector.png'
// import React, { useState } from 'react';
// import axios from 'axios';
import FileUpload from './forms';


// import logo from './shopper-br.png';


function App() {

  // const formUpload = document.getElementById('form-upload');
  // formUpload.addEventListener('submit', function(event) {
  //   event.preventDefault(); // Impede o envio padrão do formulário

  //   const inputArquivo = document.getElementById('input-arquivo');
  //   const arquivo = inputArquivo.files[0]; // Obtém o arquivo selecionado

  //   const formData = new FormData();
  //   formData.append('arquivo', arquivo); // Adiciona o arquivo ao objeto FormData

  //   // Requisição AJAX para a rota de upload
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'http://localhost:3001/upload');
  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //       console.log('Arquivo enviado com sucesso');
  //       const botaoValidar = document.getElementById('botao-validar');
  //       botaoValidar.disabled = false;
  //     } else {
  //       console.error('Erro ao enviar o arquivo');
  //     }
  //   };
  //   xhr.send(formData);
  // document.addEventListener('DOMContentLoaded', function() {
  //   const formUpload = document.getElementById('form-upload');
  //   formUpload.addEventListener('submit', function(event) {
  //     event.preventDefault(); // Impede o envio padrão do formulário
  
  //     const inputArquivo = document.getElementById('input-arquivo');
  //     const arquivo = inputArquivo.files[0]; // Obtém o arquivo selecionado
  
  //     const formData = new FormData();
  //     formData.append('arquivo', arquivo); // Adiciona o arquivo ao objeto FormData
  
  //     // Requisição AJAX para a rota de upload
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('POST', 'http://localhost:3001/upload');
  //     xhr.onload = function() {
  //       if (xhr.status === 200) {
  //         console.log('Arquivo enviado com sucesso');
  //         document.getElementById('botao-validar').disabled = false; // Habilita o botão de validar
  //       } else {
  //         console.error('Erro ao enviar o arquivo');
  //       }
  //     };
  //     xhr.send(formData);
  //   });
  // });

  // const FileUpload = () => {
  //   const [selectedFile, setSelectedFile] = useState(null);
  
  //   const handleFileSelect = (event) => {
  //     setSelectedFile(event.target.files[0]);
  //   };
  
  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  
  //     if (selectedFile) {
  //       const formData = new FormData();
  //       formData.append('file', selectedFile);
  
  //       try {
  //         const response = await axios.post('/upload', formData, {
  //           headers: {
  //             'Content-Type': 'multipart/form-data'
  //           }
  //         });
  //         console.log('Arquivo enviado com sucesso:', response.data);
  //         document.getElementById('botao-validar').disabled = false; // Habilita o botão de validar
  //       } catch (error) {
  //         console.error('Erro ao enviar o arquivo:', error);
  //       }
  //     }
  //   };
  // }
  
  return (
    <div className="container">
      <header className="navbar">
        <div className="navbar-left">
          <img src={mainLogo} className="icon_img" alt="icon" />
        </div>
        <nav className="navbar-links-center">
          <ul>
            <li><a href="/">Link 1</a></li>
            <li><a href="/">Link 2</a></li>
            <li><a href="/">Link 3</a></li>
            <li><a href="/">Link 4</a></li>
          </ul>
        </nav>
        <div className="navbar-right">
          <img src={logOutImg} className="log_out" alt="logout" />
          <a href="/">Login/Register</a>
        </div>
      </header>
      <main className="section">
        <section>

          {/* <form id="form-upload" onSubmit={handleSubmit}>
            <input type="file" id="input-arquivo" name="csvFile" onChange={handleFileSelect}/>
              <button type="submit">Enviar</button>
          </form> */}
          <FileUpload />
          <button id="botao-validar" disabled>Validar Arquivo</button>


        </section>
      </main>
    </div>
  );
}

export default App;
