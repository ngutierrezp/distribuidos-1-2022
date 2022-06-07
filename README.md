# Distribuidos-1-2022
_Repositorio para ayudantia de Sistemas Distribuidos 1-2022 (USACH)_

Con ❤️ por [ngutierrezp](https://github.com/ngutierrezp) 🤓

## Resumen

En este proyecto crearemos una Poke app distribuida con el siguiente stack de tecnologias:
  - Kafka
  - Docker
  - Zookeeper
  - Kafdrop
  - React
  - Nginx
  - FastApi
  - Python
  - Azure
 
La aplicación distribuida posee a siguiente arquitectura: 

![Distribuidos 1-2022](https://user-images.githubusercontent.com/19491901/172295460-2320c732-114c-4384-9fb2-c87aae7914a8.png)

Sin embargo el flujo que datos sigue el siguiente esquema:

![Diagrama en blanco](https://user-images.githubusercontent.com/19491901/172295595-17be9030-3ec9-4f6f-90d6-f8b146537b04.png)

**UPDATE:** En la ultima actualización del proyecto se agregó un nuevo tópico y un nuevo consumidor del tópico.

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

# En mi caso es:
ssh ngutierrezp@20.226.41.118 -i ngutierrezp.pem
```

Con estos pasos ya pude entrar a mi VM creada: 

<img width="588" alt="image" src="https://user-images.githubusercontent.com/19491901/171329259-36c089c7-0332-4993-9e64-1bed191d7efc.png">

LISTO!! Ya podemos comenzar a trabajar en nuestra maquina!

## Preparando el ambiente ⚙️

_Como ya tenemos la base que tendrá nuestra aplicación, es decir, donde estará alojada, lo siguiente es configurar el ambiente._

Para comenzar a configurar el ambiente existen distintas maneras de hacerlo, dependiendo del enfoque que se quiera tomar. Para este caso iremos por el camino facil de implementación y toda la configurarción de ambiente se la dejaremos a [Docker](https://docs.docker.com/engine/install/ubuntu/). Por lo que debemos instalar Docker en nuestra VM.

### Instalando Docker en la VM

Para instalar Docker debemos siguir el paso a paso que nos dejan en su [pagina oficial](https://docs.docker.com/engine/install/ubuntu/). Cada comando se debe copiar y pegar en la consola de la maquina virtual.

- Update the apt package index and install packages to allow apt to use a repository over HTTPS:

  ```bash
  sudo apt-get update
  sudo apt-get install \
      ca-certificates \
      curl \
      gnupg \
      lsb-release
  ```
- Add Docker’s official GPG key:
  ```bash
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  ```
- Use the following command to set up the repository:
  ```bash
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  ```
- Install Docker: 
  ```bash
  sudo apt-get update 
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
  ```
- Intall Docker-compose
  ```bash
  sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  docker-compose --version
  ```
  
Con estos pasos ya tenemos docker instalado en nuestra VM 🤜

<img width="376" alt="image" src="https://user-images.githubusercontent.com/19491901/171331254-f568bd94-476b-4016-bae4-4a4b85e9f59f.png">

_Si no pudista instalar docker, no dudes en consultarme._

---------------

## Levantando el proyecto ...

Ya estamos listos para producir y consumir datos: 



El siguiente paso se levantar los contenedores de docker. Este proyecto posee los siguientes contenedores:

- kafka
- zookeeper
- productor
- consumidor1
- consumidor2
- kafdrop

Todos están conectados bajo el mismo network (kafka-bridge)
