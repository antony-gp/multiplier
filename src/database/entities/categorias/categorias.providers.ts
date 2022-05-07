import { CATEGORIES_REPOSITORY } from "src/constants.class";
import { Categorias } from "./categorias.entity";

export const categoriasProviders = [
  {
    provide: CATEGORIES_REPOSITORY,
    useValue: Categorias,
  },
];