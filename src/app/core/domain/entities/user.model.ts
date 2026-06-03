export interface User {
  id: string;
  document: string;
  name: string;
  phone: string;
  address: string;
  email: string;
}

/*
¿La cantidad de préstamos debería estar en el modelo?
Yo diría que no.
Porque eso no es un dato.
Es un resultado.
*/
