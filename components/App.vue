<template>
    <div id="app">
      <header>
        <!-- Aquí puedes agregar un encabezado común para todas las páginas -->
        <router-link to="/" class="home-link">
          <h1>FerroAR</h1>
        </router-link>
        <nav>
          <!-- Aquí podrías agregar la navegación de la aplicación -->
          <div class="nav-buttons">
            <router-link to="/login" class="btn">Iniciar Sesión</router-link>
          </div>
          <div class="nav-buttons">
            <router-link to="/register" class="btn">Registrarse</router-link>
          </div>
        </nav>
      </header>
      
      <main>
        <!-- El componente Index.vue se mostrará aquí cuando la ruta coincida con '/' -->
        <router-view></router-view>
      </main>
      
      <footer>
        <!-- Aquí puedes agregar un pie de página común para todas las páginas -->
        <p>&copy; 2024 FerroAR</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App'
  }
  </script>
  
  <style>
  /* Estilos globales de la aplicación */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  
  header {
    background-color: #292929;
    color: #fff;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  header h1 {
    margin: 0;
    padding-left: 20px;
  }
  
  nav {
    display: flex;
  }
  
  .home-link {
    text-decoration: none;
    color: inherit;
  }
  
  .nav-buttons {
    display: flex;
  }
  
  .nav-buttons router-link {
    margin-right: 10px;
  }
  
  .btn {
    background-color: #0056b3;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 0; /* Hacer los botones cuadrados */
    text-decoration: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Transiciones suaves */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1); /* Agregar sombra externa */
  }
  
  .btn:hover {
    background-color: #002f61;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2), 0 0 12px rgba(0, 0, 0, 0.2); /* Cambiar la sombra al pasar el mouse */
  }
  
  main {
    padding: 20px;
  }
  
  footer {
    background-color: #292929;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  </style>
  