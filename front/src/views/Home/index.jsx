import * as React from "react";
import "./home.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


const stackCards = [
  {
    name: "React",
    image: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
  },
  {
    name: "Kafka",
    image: "https://cdn.worldvectorlogo.com/logos/kafka.svg",
  },
  {
    name: "Zookeeper",
    image:
      "https://www.adictosaltrabajo.com/wp-content/uploads/2016/05/zookeeper_logo.png",
  },
  {
    name: "Python",
    image: "https://cdn.worldvectorlogo.com/logos/python-5.svg",
  },
  {
    name: "Docker",
    image: "https://cdn.worldvectorlogo.com/logos/docker-3.svg",
  },
  {
    name: "Azure",
    image: "https://cdn.worldvectorlogo.com/logos/azure-2.svg",
  },
  {
    name: "Kafdrop",
    image:
      "https://raw.githubusercontent.com/wiki/obsidiandynamics/kafdrop/images/kafdrop-logo.png",
  },
  {
    name: "Nginx",
    image: "https://cdn.worldvectorlogo.com/logos/nginx-1.svg",
  },
];

function Home() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div className="home-container">
        <h1>Distribuidos 1-2022</h1>
        <h4 className="py-2">Una poke api distribuida</h4>
        <Card
          className="p-3"
          sx={{ maxWidth: 800, borderRadius: 5, backgroundColor: "#353742" }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{ color: "white" }}
            >
              Descripción
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Esta aplicación fue desarrollada con el siguiente stack de
              tecnologías:
            </Typography>
            <div className="row flex-wrap">
              {stackCards.map((card, index) => {
                return (
                  <div
                    className="col-12 col-md-4 col-sm-4 py-2"
                    key={`${index}-div`}
                  >
                    <Card
                      key={`${index}-card`}
                      className="m-2 py-2"
                      sx={{ height: "200px", borderRadius: "50px" }}
                    >
                      <CardMedia
                        className="p-2"
                        component="img"
                        image={card.image}
                        title={card.name}
                        sx={{
                          maxWidth: "90%",
                          height: "120px",
                          width: "auto",
                          margin: "auto",
                        }}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ textAlign: "center" }}
                        >
                          {card.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
            <Typography
              className="py-2"
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "white" }}
            >
              La aplicación distribuida está construida bajo la siguiente
              arquitectura:
            </Typography>
            <Card className="m-2 py-2" sx={{ borderRadius: "20px" }}>
              <CardMedia
                className="p-2"
                component="img"
                src="Distribuidos_1-2022.png"
                sx={{
                  maxWidth: "100%",
                  height: "400px",
                  width: "auto",
                  margin: "auto",
                }}
              />
            </Card>
            <Typography
              className="py-2"
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "white" }}
            >
              El flujo que existe entre el cliente y el servidor es el
              siguiente:
            </Typography>
            <Card className="m-2 py-2" sx={{ borderRadius: "20px" }}>
              <CardMedia
                className="p-2"
                component="img"
                src="flujo.png"
                sx={{
                  maxWidth: "100%",
                  height: "300px",
                  width: "auto",
                  margin: "auto",
                }}
              />
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
