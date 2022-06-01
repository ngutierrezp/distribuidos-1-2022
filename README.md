# Distribuidos-1-2022
_Repositorio para ayudantia de Sistemas Distribuidos 1-2022 (USACH)_

Con ❤️ por [ngutierrezp](https://github.com/ngutierrezp) 🤓

## Comenzando 🚀

Para esta ayudantia, utilizaremos la plataforma Cloud de [Azure](https://azure.microsoft.com/es-es/free/students/) la cual provee $100 en Creditos para utilizar dentro de sus aplicaciones. Sin embargo es posible utilizar cualquier otra plataforma Cloud como : 

- [Google](https://cloud.google.com/free?hl=es) 
- [AWS](https://aws.amazon.com/es/education/awseducate/)
- [Oracle](https://www.oracle.com/cl/cloud/)
- etc.

En en [panel de Azure](https://portal.azure.com/#home), crearemos una nueva nueva maquina virtual :

<img width="242" alt="image" src="https://user-images.githubusercontent.com/19491901/171325037-9195aa63-9969-4839-a55f-fa93ce7524fe.png">

<img width="799" alt="image" src="https://user-images.githubusercontent.com/19491901/171324985-c2a8841f-38db-416c-a8a5-d74f2d529bee.png">

Establecemos nuestras la configuración para nuestras keys.

**¡¡IMPORTANTE!!** : Deben recordar cual es la contraseña que colocan en este paso.

<img width="807" alt="image" src="https://user-images.githubusercontent.com/19491901/171325436-5263c26c-9feb-429f-933f-3538c247dc8f.png">

En los siguientes pasos se debe selecionar el tipo de disco (se puede escoger un HDD para probar) y lo demás se deja en valores por defecto a menos que se quiera habilitar algun tipo de puerto especifico para la conexión.

En la ultima pestaña de la creación, aparecerá un resumen de como se creará la maquina virtual, y al momento de crear aparecerá un popup informando que se debe guardar las key privada:

<img width="501" alt="image" src="https://user-images.githubusercontent.com/19491901/171326710-f39103f6-e972-4d40-b6dc-e52eb03a2b34.png">

Es importante hacerlo ya que luego no podremos entrar a nuestra maquina virtual.

Con estos pasos ya estamos listos para comenzar a utilizar nuestra VM.

### Conexión con la VM

_Para este punto tenemos nuestra VM creada y nuestra key descargada por lo que lo siguiente es conectarse a la VM._

Para conectarnos a la VM primeramente debemos cambiar los permisos de nuestra key descargada. Para ello vamos a la dirección de donde se ecnuentra y ejecutamos :

```
sudo chmod 600 <key.pem>
```
Luego, para conectarnos a nuestra VM necesitamos saber cual fué la IP que se le asignó. Para ello vamos a [nuestro panel](https://portal.azure.com/#home) donde veremos que elementos tenemos: 

<img width="1035" alt="image" src="https://user-images.githubusercontent.com/19491901/171328135-e6a7193f-53f5-4b56-975d-fa15127bb991.png">

Para este caso, hacemos click en la **maquina virtual** lo que nos llevará a su panel de administración. Dentro podremos ver en la pestaña de `propiedades`, el item de `redes`: 

<img width="1094" alt="Screen Shot 2022-06-01 at 00 35 42" src="https://user-images.githubusercontent.com/19491901/171328604-fd3da69f-552f-40e5-9ceb-83b6bb51d93e.png">

Copiamos la ip pública de nuestra VM y vamos a nuestro terminal favorito a ejecutar el siguiente comando:


```bash
ssh <nombre>@<ip> -i <key.pem>
# nombre : es el nombre que le dimos al momento de crear las keys
# ip : es la ip publica de nuestra VM
# key.pem : es la key que descargamos. Tambien puede ser su path
# ----

# En mi caso eso 
ssh ngutierrezp@20.226.41.118 -i ngutierrezp.pem
```

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

```
Da un ejemplo
```

### Instalación 🔧

_Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose_

_Dí cómo será ese paso_

```
Da un ejemplo
```

_Y repite_

```
hasta finalizar
```

_Finaliza con un ejemplo de cómo obtener datos del sistema o como usarlos para una pequeña demo_

## Ejecutando las pruebas ⚙️

_Explica como ejecutar las pruebas automatizadas para este sistema_

### Analice las pruebas end-to-end 🔩

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

### Y las pruebas de estilo de codificación ⌨️

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

## Despliegue 📦

_Agrega notas adicionales sobre como hacer deploy_

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - El framework web usado
* [Maven](https://maven.apache.org/) - Manejador de dependencias
* [ROME](https://rometools.github.io/rome/) - Usado para generar RSS

## Contribuyendo 🖇️

Por favor lee el [CONTRIBUTING.md](https://gist.github.com/villanuevand/xxxxxx) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/tu/proyecto/wiki)

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

* **Andrés Villanueva** - *Trabajo Inicial* - [villanuevand](https://github.com/villanuevand)
* **Fulanito Detal** - *Documentación* - [fulanitodetal](#fulanito-de-tal)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto. 

## Licencia 📄

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* Dona con cripto a esta dirección: `0xf253fc233333078436d111175e5a76a649890000`
* etc.



---
⌨️ con ❤️ por [Villanuevand](https://github.com/Villanuevand) 😊
