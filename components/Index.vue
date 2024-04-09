<template>
    <div class="background-container">
      <div class="center-content">
        <h1 style="font-size: 3em; text-align: center; font-family: 'Arial', sans-serif; font-weight: bold; margin-bottom: 20px;">FerroAR</h1>
        <p style="text-align: justify; font-family: 'Arial', sans-serif; font-size: 1.2em;">
          La Realidad Aumentada es un tipo de tecnología que nos permite añadir capas de información visual sobre el mundo real que nos rodea. Dicha información se puede ver a través de diferentes dispositivos como pueden ser nuestros propios teléfonos móviles. Un turista puede alzar su cámara y encontrar puntos de interés apuntando hacia los lugares que quiere visitar; un operario puede realizar labores de mantenimiento en una sala de máquinas, obteniendo información de dónde se encuentra cada componente, simplemente apuntando con su tablet y sin necesidad de consultar un complicado mapa, un ecommerce puede mostrar sus artículos en 3D incrustando una experiencia de AR en su web para mejorar la experiencia de compra y acortar el periodo de decisión ofreciendo al usuario un proceso más real.
        </p>
        <p style="text-align: justify; font-family: 'Arial', sans-serif; font-size: 1.2em;">
          Características de la Realidad Aumentada:
          <ul style="list-style-type: disc; text-align: left;">
            <li>Permite la combinación del mundo real y el mundo virtual.</li>
            <li>Depende del contexto.</li>
            <li>Es interactiva en tiempo real.</li>
            <li>Utiliza las tres dimensiones.</li>
          </ul>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Lógica de Vue.js para la página de inicio
  }
  </script>
  
  <style scoped>
  /* Estilos CSS para la página de inicio */
  body {
      margin: 0;
      padding: 0;
  }
  
  .background-container {
      position: static;
      width: 100%;
      height: 100vh;
      overflow: hidden;
  }
  
  .background-container::after {
      content: "";
      background-image: url('C:\Users\kevin\Downloads\Proyecto/imagen.png'); /* Ruta de la imagen de fondo */
      background-size: cover; /* Ajusta la imagen para cubrir todo el contenedor */
      background-position: center; /* Centra la imagen */
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(10px); /* Ajusta el valor para cambiar la intensidad del desenfoque */
      z-index: -1; /* Asegura que la imagen esté detrás del contenido */
  }
  
  .center-content {
      display: flex;
      flex-direction: column;
      justify-content: center; /* Centra el contenido verticalmente */
      align-items: center; /* Centra horizontalmente */
      position: relative;
      z-index: 1; /* Asegura que el contenido esté por encima de la imagen */
      background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
      color: rgb(255, 255, 255); /* Color del texto */
      padding: 20px; /* Espacio alrededor del texto */
      border-radius: 10px; /* Bordes redondeados */
  }
  
  /* Estilos para el texto */
  .center-content h1,
  .center-content p {
      color: white; /* Color del texto */
  }
  </style>
  