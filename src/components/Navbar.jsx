import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import Imagen from "../assets/img/KingCake.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";

export default function Navbar() {
  const { fotos, sumaTotalDelCarrito } = useContext(Context);
  const cantidadDeFavoritos = fotos.filter( (foto) => foto.liked == true ).length

  return (
    <AppBar position="static" color="secondary" style={{ width: "95vw" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "default",
        }}
        maxWidth="md"
      >
        <Box display="flex" alignItems="center">
          <Avatar sx={{ height: 40, width: 40, m: 0 }} srcSet={Imagen} />
          <Box ml={1}>
            <Typography sx={{ mt: 2, mb: -0.5, p: 0, fontSize: "12" }}>
              Grupo KingCake
            </Typography>
            <Typography
              fontSize={10}
              fontFamily={"sans-serif"}
              color={"lightgray"}
            >
              La Serena - Chile
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            color="inherit"
            endIcon={<HomeIcon />}
            component={NavLink}
            to="/"
            sx={{
              p: 2,
              "&.active": {
                color: "burlywood",
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            endIcon={
              <Badge badgeContent={cantidadDeFavoritos} color="primary">
                <FavoriteIcon />
              </Badge>
            }
            component={NavLink}
            to="/favoritos"
            sx={{
              p: 2,
              "&.active": {
                color: "burlywood",
              },
            }}
          >
            Favoritos
          </Button>

          <Button
            color="inherit"
            endIcon={<ContactMailIcon />}
            component={NavLink}
            to="/contacto"
            sx={{
              p: 2,
              "&.active": {
                color: "burlywood",
              },
            }}
          >
            Contáctanos
          </Button>
          <Button
            color="inherit"
            endIcon={<InfoIcon />}
            component={NavLink}
            to="/about"
            sx={{
              p: 2,
              "&.active": {
                color: "burlywood",
              },
            }}
          >
            About
          </Button>
          <IconButton
            color = "inherit"
            component={NavLink}
            to="/carrito"
            sx={{p: 2, "&.active": {color:"burlywood" },}}
          >
            <ShoppingCartIcon>`</ShoppingCartIcon>
            <Typography ><strong>$ {sumaTotalDelCarrito}</strong></Typography>
          </IconButton>
        </Box>
      </Container>
    </AppBar>
  );
}
