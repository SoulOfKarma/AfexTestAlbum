Album Online de videos de Youtube

Este proyecto es una aplicación web que te permite buscar videos de YouTube, guardarlos y listarlos en una base de datos de Firebase.

Funcionamiento
Al abrir la aplicación, se muestra un input donde puedes ingresar el Link de un video de YouTube. Al presionar el botón "Añadir", la aplicación realiza una búsqueda a través de la API de YouTube. Este Guarda el Video en la base de datos de Firebase un vez encontrado.

Una vez que has agregado uno o más videos, puedes visualizarlos en la lista que se encuentra debajo del input de búsqueda. Para ver los detalles de un video, solo tienes que hacer clic en su thumbnail y dentro de la informacion del video, al presionar en el video del los detalles te llevara al video en su sitio.

Si deseas eliminar un video de la lista, simplemente presiona el botón "x" que aparece en la esquina superior derecha del thumbnail.

Tecnologías utilizadas
Vue.js 3
Firebase
YouTube Data API v3

Cómo usar

1- veras la pantalla inicial de la plataforma
![2](https://raw.githubusercontent.com/SoulOfKarma/AfexTestAlbum/main/src/Readme/PantallaInicial.PNG)

2- En el input puedes ingresar tu link del video de youtube y presionar añadir
![2](https://raw.githubusercontent.com/SoulOfKarma/AfexTestAlbum/main/src/Readme/AddLinkVideo.PNG)

2.1- Si fue todo correcto veras el mensaje de "Video Agregado Correctamente"
![2](https://raw.githubusercontent.com/SoulOfKarma/AfexTestAlbum/main/src/Readme/ConfirmAddUp.PNG)

2.2- En caso contrario veras el mensaje de video ya ingresado o con un ID erroneo
![2](https://github.com/SoulOfKarma/AfexTestAlbum/blob/main/src/Readme/ValidacionRepetidos.PNG)

3- Podras ver el listado de los videos abajo del input donde guardaste el video
![2](https://raw.githubusercontent.com/SoulOfKarma/AfexTestAlbum/main/src/Readme/VerificacionVisual.PNG)

4- Si presionas en la imagen del video podras ver su informacion general
![2](https://raw.githubusercontent.com/SoulOfKarma/AfexTestAlbum/main/src/Readme/DescripcionVideo.PNG)

5- Si presionas en la X de la imagen del video te solicitara eliminar el video
![2](https://raw.githubusercontent.com/SoulOfKarma/AfexTestAlbum/main/src/Readme/ConfirmacionEliminacion.PNG)

5.1 - Si presionas Eliminar, si borrara definitivamente, en caso contrario solo cancela
![2](https://raw.githubusercontent.com/SoulOfKarma/AfexTestAlbum/main/src/Readme/PantallaInicial.PNG)

5.2 - Si presionaste eliminar, veras el siguiente mensaje en pantalla.
![2](https://raw.githubusercontent.com/SoulOfKarma/AfexTestAlbum/main/src/Readme/VideoEliminado.PNG)

6- Veras la pantalla con el listado actual.
![2](https://raw.githubusercontent.com/SoulOfKarma/AfexTestAlbum/main/src/Readme/PantallaOriginal.PNG)
