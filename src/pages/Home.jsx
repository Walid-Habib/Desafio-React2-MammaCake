import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import { Box, IconButton, Typography } from "@mui/material";
import { Context } from "../context/Context";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

let estadoActualDelCarrito = false;
export default function Home() {
  let favoritosSeleccionados = 0;
  const { fotos, setFotos, agregarCake } = useContext(Context);
  const navigate = useNavigate();

  const clicAgregarCarrito = (id) => {
    const foto = fotos.find((foto) => foto.id == id);
    agregarCake(foto);
    navigate("/carrito");
    estadoActualDelCarrito = false;
    if (estadoActualDelCarrito) estadoActualDelCarrito = false;
    else estadoActualDelCarrito = true;
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "25px",
      }}
    >
      {fotos.map((photo, i) => {
        return (
          <Box
            key={i}
            sx={{
              backgroundImage: `url("${photo.src}")`,
              height: "150px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "120px 5px 5px 5px",
              border: 2,
              cursor: "default",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{ display: "flex", flexWrap: "wrap", width: "3rem", m: 0 }}
            >
              <IconButton
                sx={{ color: "red", padding: "0px" }}
                onClick={() => {
                  const foto = fotos[i];
                  const estadoActualDelLike = foto.liked;
                  if (estadoActualDelLike) {
                    foto.liked = false;
                    favoritosSeleccionados--;
                  } else foto.liked = true;
                  favoritosSeleccionados++;
                  setFotos([...fotos]);
                }}
              >
                {photo.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton sx={{ padding: "0px" }}>
                <Link to={`/pokecake/${photo.id}`}>
                  <InfoIcon sx={{ color: "green" }} />
                </Link>
              </IconButton>
              <IconButton
                sx={{ color: "orange", padding: "0px" }}
                onClick={() => clicAgregarCarrito(photo.id)}
              >
                {estadoActualDelCarrito ? (
                  <ShoppingCartIcon />
                ) : (
                  <ShoppingCartOutlinedIcon />
                )}
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                fontSize: "12px",
                fontWeight: "bold",
                color: "yellow",
                lineHeight: "1",
                textShadow:
                  "0px 2px 3px green, 0px -2px 3px gray, 0px -2px 3px black",
              }}
            >
              <Typography lineHeight="inherit">{photo.price}</Typography>
              <Typography lineHeight="inherit">{photo.name}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
