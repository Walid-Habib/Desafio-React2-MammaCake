import {
  Box,
  Card,
  CardMedia,
  Divider,
  IconButton,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default () => {
  const globalState = useContext(Context);
  const params = useParams();
  const [pokecake, setPokecake] = useState();

  const getPokecake = async () => {
    const pokeCakeEncontrado = globalState.fotos.find(
      (foto) => foto.id == params.cakeId
    );
    setPokecake(pokeCakeEncontrado);
  };
  useEffect(() => {
    getPokecake();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Card sx={{ width: "250px", height: "70vh" }}>
        <IconButton>
          <Link to={"/"}>
            <ArrowBackIcon />
          </Link>
        </IconButton>
        {pokecake && (
          <Box>
            <Box
              sx={{
                fontFamily: "fantasy",
                color: "cornflowerblue",
                fontSize: "20px",
                m: "1px",
              }}
            >
              {pokecake.name}
            </Box>
            <CardMedia
              image={pokecake.photo}
              sx={{
                height: "150px",
                m: "5px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Box
              sx={{
                fontFamily: "Franklin Gothic",
                fontSize: "14px",
                m: "5px",
              }}
            >
              {pokecake.desc}
            </Box>
            <Divider />
            <Box
              sx={{
                fontFamily: "Franklin Gothic",
                fontSize: "14px",
                lineHeight: "15px",
              }}
            >
              <ul style={{margin:1}}>
                Ingredientes:
                {pokecake.ingredients.map((ingrediente, i) => (
                  <li key={i}>{ingrediente}</li>
                ))}
              </ul>
            </Box>
            <Divider/>
            <Box textAlign="center" fontSize="18px" mb={0}>
              Precio: $ <strong>{pokecake.price}</strong>
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
};
