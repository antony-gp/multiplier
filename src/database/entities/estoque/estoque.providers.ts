import { ESTOQUE_REPOSITORY } from "src/constants.class";
import { Estoque } from "./estoque.entity";

export const estoqueProviders = [
  {
    provide: ESTOQUE_REPOSITORY,
    useValue: Estoque,
  },
];