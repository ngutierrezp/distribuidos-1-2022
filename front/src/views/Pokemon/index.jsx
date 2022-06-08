import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";

import db from "../../firebase";
import "./tableStyle.scss";
import { collection, onSnapshot } from "firebase/firestore";

function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchInfo, setFetchInfo] = useState(null);
  const [pokeStats, setPokeStats] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);
  const pokeTypeColors = {
    bug: { background: "#A8B820", color: "#FFFFFF" },
    dark: { background: "#705848", color: "#FFFFFF" },
    dragon: { background: "#7038F8", color: "#FFFFFF" },
    electric: { background: "#F8D030", color: "#000" },
    fairy: { background: "#EE99AC", color: "#000" },
    fighting: { background: "#C03028", color: "#FFFFFF" },
    fire: { background: "#F08030", color: "#FFFFFF" },
    flying: { background: "#A890F0", color: "#000" },
    ghost: { background: "#705898", color: "#FFFFFF" },
    grass: { background: "#78C850", color: "#000" },
    ground: { background: "#E0C068", color: "#000" },
    ice: { background: "#98D8D8", color: "#000" },
    normal: { background: "#A8A878", color: "#000" },
    poison: { background: "#A040A0", color: "#FFFFFF" },
    psychic: { background: "#F85888", color: "#000" },
    rock: { background: "#B8A038", color: "#000" },
    steel: { background: "#B8B8D0", color: "#000" },
    water: { background: "#6890F0", color: "#FFFFFF" },
  };
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  const handleFetchInfo = (state) => {
    setFetchInfo(state);
    // set timeout 2seg
    setTimeout(() => {
      setFetchInfo(null);
    }, 2000);
  };

  const sendPost = (data) => {
    setLoading(true);
    fetch("http://20.197.232.133:8000/producer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setLoading(false);
        handleFetchInfo("success");
        return response.json();
      })
      .catch((error) => {
        setLoading(false);
        handleFetchInfo("error");
        console.log(error);
      });
  };

  const handleInput = (e: React.SyntheticEvent, value: string[]) => {
    setPokemon(value);
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  useEffect(() => {
    onSnapshot(collection(db, "poke_stats"), (snapshot) => {
      const poke_stats = [];
      snapshot.docs.forEach((doc) => {
        poke_stats.push(doc.data());
      });
      setPokeStats(poke_stats);
    });
    onSnapshot(collection(db, "poke_type"), (snapshot) => {
      const poke_type = [];
      snapshot.docs.forEach((doc) => {
        poke_type.push(doc.data());
      });
      setPokeTypes(poke_type);
    });
  }, []);

  useEffect(() => {
    if (pokemons.length === 0) {
      setLoading(true);
      fetch("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0")
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setPokemons(
            data.results.map((pokemon) => {
              return {
                name: pokemon.name,
                id: parseInt(pokemon.url.split("/").slice(-2)[0]),
                url: pokemon.url,
              };
            })
          );
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [pokemons]);

  useEffect(() => {
    if (pokemon !== {}) {
      setLoading(true);
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setPokemonInfo(data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [pokemon]);
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div className="home-container">
        <h1>Poke Api Kafka</h1>
        <Card
          className="p-3"
          sx={{ maxWidth: 800, borderRadius: 5, backgroundColor: "white" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Productor
            </Typography>
            <Card
              className="p-3"
              sx={{
                borderRadius: 5,
                color: "white",
                backgroundColor: "#353742",
              }}
            >
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                A continuación escoge un pokemon (el que tu quieras) para enviar
                los datos a los consumidores. Los consumidores ya están
                escuchando las peticiones y se encargarán de mostrar los datos.
              </Typography>
            </Card>

            <Autocomplete
              id="country-select-demo"
              className="mt-3"
              onChange={handleInput}
              options={pokemons}
              loading={loading}
              autoHighlight
              disableClearable
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="40"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${option.id}.png`}
                    alt=""
                  />
                  ({option.id}) {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Escoge un pokemon"
                  variant="filled"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "No pokemons", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </CardContent>
          {pokemonInfo && (
            <div className="d-flex justify-content-center">
              <Card sx={{ maxWidth: 300, borderRadius: "20px" }} elevation={8}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14, textAlign: "center" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Pokemon seleccionado
                  </Typography>
                  <Avatar
                    alt={pokemonInfo.species.name}
                    src={
                      pokemonInfo.sprites.other["official-artwork"]
                        .front_default
                    }
                    sx={{ width: 90, height: 90, margin: "auto" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center" }}
                  >
                    {pokemonInfo.species.name}
                  </Typography>

                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    {pokemonInfo.types.map((type, index) => {
                      return (
                        <span key={type.type.name}>
                          {type.type.name}
                          {pokemonInfo.types.length > 1 && index === 0
                            ? bull
                            : null}
                        </span>
                      );
                    })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Valores Base
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    <span className="px-1">
                      <b>HP:</b> {pokemonInfo.stats[0].base_stat} |
                    </span>
                    <span className="px-1">
                      <b>Attack:</b> {pokemonInfo.stats[1].base_stat} |
                    </span>
                    <span className="px-1">
                      <b>Defense:</b> {pokemonInfo.stats[2].base_stat} |
                    </span>
                    <span className="px-1">
                      <b>Sp. Attack:</b> {pokemonInfo.stats[3].base_stat} |
                    </span>
                    <span className="px-1">
                      <b>Sp. Defense:</b> {pokemonInfo.stats[4].base_stat} |
                    </span>
                    <span className="px-1">
                      <b>Speed:</b> {pokemonInfo.stats[5].base_stat}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}
          <div className="d-flex justify-content-center py-3 mt-3">
            <LoadingButton
              disabled={pokemonInfo === null}
              color="primary"
              variant="outlined"
              size="large"
              loading={loading || fetchInfo !== null}
              onClick={() => {
                sendPost({
                  id: pokemonInfo.id,
                  name: pokemonInfo.species.name,
                  pokemon: pokemonInfo,
                });
              }}
            >
              Producir pokemon
            </LoadingButton>
          </div>
          {fetchInfo !== null && fetchInfo === "success" && (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "green" }}
            >
              Pokemon Producido ✅
            </Typography>
          )}
          {fetchInfo !== null && fetchInfo === "error" && (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "red" }}
            >
              Pokemon no producido ❌
            </Typography>
          )}
        </Card>
        <Card
          className="p-3 mt-5"
          sx={{ maxWidth: 800, borderRadius: 5, backgroundColor: "white" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Consumidor Poke_stats
            </Typography>
            <Card
              className="p-3"
              sx={{
                borderRadius: 5,
                color: "white",
                backgroundColor: "#353742",
              }}
            >
              {pokeStats.length === 0 && (
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  No hay pokemons consumidos.
                </Typography>
              )}
              {windowDimenion.winWidth > 700 && (
                <Paper className="container-poke-table">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sprite</TableCell>
                        <TableCell align="center">Pokedex</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Stats</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pokeStats.map((row, index) => (
                        <TableRow
                          key={`${row.name}-${index}`}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <img
                              loading="lazy"
                              width="50%"
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${row.id}.png`}
                              alt=""
                            />
                          </TableCell>
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">
                            <Stack
                              className="justify-content-center py-3"
                              spacing={1}
                            >
                              {Object.entries(row.stats).map(([key, value]) => (
                                <Chip
                                  key={`${key}-${value}`}
                                  label={`${key}: ${parseFloat(value).toFixed(
                                    2
                                  )}`}
                                  color="secondary"
                                  size="small"
                                />
                              ))}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              )}
              {windowDimenion.winWidth <= 700 && (
                <List
                  sx={{
                    borderRadius: 5,
                    width: "100%",
                    bgcolor: "#353742",
                  }}
                >
                  {pokeStats.map((row, index) => (
                    <div key={`${row.name}-${index}`}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <img
                              loading="lazy"
                              width="100%"
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${row.id}.png`}
                              alt=""
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${row.name} (${row.id})`}
                          sx={{ color: "White" }}
                        />
                        <Stack
                          className="justify-content-center py-3"
                          spacing={1}
                        >
                          {Object.entries(row.stats).map(([key, value]) => (
                            <Chip
                              key={`${key}-${value}`}
                              label={`${key}: ${parseFloat(value).toFixed(2)}`}
                              sx={{ backgroundColor: "White" }}
                              size="small"
                            />
                          ))}
                        </Stack>
                      </ListItem>

                      <Divider
                        variant="inset"
                        component="li"
                        sx={{ borderColor: "white" }}
                      />
                    </div>
                  ))}
                </List>
              )}
            </Card>
          </CardContent>
        </Card>
        <Card
          className="p-3 mt-5"
          sx={{ maxWidth: 800, borderRadius: 5, backgroundColor: "white" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Consumidor Poke_type
            </Typography>
            <Card
              className="p-3"
              sx={{
                borderRadius: 5,
                color: "white",
                backgroundColor: "#353742",
              }}
            >
              {pokeTypes.length === 0 && (
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  No hay pokemons consumidos.
                </Typography>
              )}
              {windowDimenion.winWidth > 700 && (
                <Paper className="container-poke-table">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sprite</TableCell>
                        <TableCell align="center">Pokedex</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Tipos</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pokeTypes.map((row, index) => (
                        <TableRow
                          key={`${row.name}-${index}`}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <img
                              loading="lazy"
                              width="50%"
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${row.id}.png`}
                              alt=""
                            />
                          </TableCell>
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">
                            <Stack
                              direction="row"
                              className="justify-content-center"
                              spacing={1}
                            >
                              {row.types.map((type, index) => (
                                <Chip
                                  key={`poke-${type}-${index}`}
                                  label={type}
                                  sx={{
                                    backgroundColor:
                                      pokeTypeColors[type].background,
                                    color: pokeTypeColors[type].color,
                                  }}
                                />
                              ))}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              )}
              {windowDimenion.winWidth <= 700 && (
                <List
                  sx={{
                    borderRadius: 5,
                    width: "100%",
                    bgcolor: "#353742",
                  }}
                >
                  {pokeTypes.map((row, index) => (
                    <div key={`${row.name}-${index}`}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <img
                              loading="lazy"
                              width="40"
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${row.id}.png`}
                              alt=""
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${row.name} (${row.id})`}
                          sx={{ color: "White" }}
                        />
                        <Stack
                          className="justify-content-start py-3"
                          spacing={1}
                        >
                          {row.types.map((type, index) => (
                            <Chip
                              key={`poke-${type}-${index}`}
                              label={type}
                              sx={{
                                backgroundColor:
                                  pokeTypeColors[type].background,
                                color: pokeTypeColors[type].color,
                              }}
                            />
                          ))}
                        </Stack>
                      </ListItem>

                      <Divider
                        variant="inset"
                        component="li"
                        sx={{ borderColor: "white" }}
                      />
                    </div>
                  ))}
                </List>
              )}
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Pokemon;
