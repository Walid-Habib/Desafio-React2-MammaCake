import { useContext } from "react";
import { Context } from "../context/Context";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function Carrito() {
  const { carrito, sumaTotalDelCarrito, incrementar, decrementar } =
    useContext(Context);
  if (carrito.length == 0)
    return (
      <Stack alignItems="center" mt="3rem">
        <ErrorOutlineIcon color="error" sx={{ fontSize: "10rem" }} />
        <Typography variant="h6" color="error">
          Debe agregar al carrito alguno de los productos que ofrecemos en el
          menú HOME
        </Typography>
      </Stack>
    );
  else
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper} sx={{ width: "55%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <IconButton>
              <Link to={"/"}>
                <ArrowBackIcon />
              </Link>
            </IconButton>{" "}
            <TableBody>
              {carrito.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar sx={{ ml: 2 }} srcSet={item.photo}></Avatar>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">
                    $ {item.cantidad * item.price}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      onClick={() => decrementar(item.id)}
                    >
                      -
                    </Button>
                  </TableCell>
                  <TableCell align="right">{item.cantidad}</TableCell>
                  <TableCell align="left">
                    <Button
                      color="primary"
                      onClick={() => incrementar(item.id)}
                    >
                      +
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ textAlign: "right" }}>
                Total $: <strong>{sumaTotalDelCarrito}</strong>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
}
