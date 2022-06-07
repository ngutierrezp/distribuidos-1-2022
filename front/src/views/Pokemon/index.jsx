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

function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchInfo, setFetchInfo] = useState(null);

  const handleFetchInfo = (state) => {
    setFetchInfo(state);
    // set timeout 2seg
    setTimeout(() => {
      setFetchInfo(null);
    }, 2000);
  };

  const sendPost = (data) => {
    setLoading(true);
    fetch("http://10.1.0.5:8000/producer", {
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
            <Typography variant="body1">
              Esta aplicación fue desarrollada con el siguiente stack de
              tecnologías:
            </Typography>
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
              <p className="px-1">Pokemon Producido ✅</p>
            </Typography>
          )}
          {fetchInfo !== null && fetchInfo === "error" && (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "red" }}
            >
              <p className="px-1">Pokemon no producido ❌</p>
            </Typography>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Pokemon;
