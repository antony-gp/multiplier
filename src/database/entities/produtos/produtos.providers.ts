import { PRODUTOS_REPOSITORY } from "src/constants.class";
import { Produtos } from "./produtos.entity";

export const produtosProviders = [
  {
    provide: PRODUTOS_REPOSITORY,
    useValue: Produtos,
  },
];