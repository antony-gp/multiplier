import { CATEGORIAS_REPOSITORY } from "src/constants.class";
import { Categorias } from "./categorias.entity";

export const categoriasProviders = [
  {
    provide: CATEGORIAS_REPOSITORY,
    useValue: Categorias,
  },
];