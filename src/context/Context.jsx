import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export default function Provider({ children }) {
  let favoritosSeleccionados = 0;
  const [fotos, setFotos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  const getFotos = async () => {
    const res = await fetch("../public/fotos.json");
    const data = await res.json();
    const photos = data.map((photo) => {
      return { ...photo, src: photo.photo, liked: false };
    });
    setFotos(photos);
  };

  useEffect(() => {
    getFotos();
  }, []);

  const agregarCake = (foto) => {
    const buscarID = carrito.find((item) => fotos.id == item.id);

    if (buscarID) {
      const nuevaCakes = carrito.map((item) =>
        item.id == buscarID.id
          ? { ...fotos, cantidad: buscarID.cantidad + 1 }
          : item
      );
      return setCarrito(nuevaCakes);
    }
    setCarrito([...carrito, { ...foto, cantidad: 1 }]);
  };

  const sumaTotalDelCarrito = carrito.reduce(
    (acc, item) => item.price * item.cantidad + acc,
    0
  );

  const incrementar = (id) => {
    const foto = carrito.find((foto) => foto.id == id);
    foto.cantidad++;
    setCarrito([...carrito]);
  };

  const decrementar = (id) => {
    const foto = carrito.find((foto) => foto.id == id);
    foto.cantidad--;
    if (foto.cantidad == 0) {
      const fotoIndex = carrito.findIndex((foto) => foto.id == id);
      carrito.splice(fotoIndex, 1)
    }
    setCarrito([...carrito]);
  };

  const estadoGlobal = {
    favoritosSeleccionados,
    carrito,
    agregarCake,
    sumaTotalDelCarrito,
    incrementar,
    decrementar,
    fotos,
    setFotos,
  };

  return <Context.Provider value={estadoGlobal}> {children} </Context.Provider>;
}
