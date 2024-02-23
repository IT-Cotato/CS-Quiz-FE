import { IGeneration } from '@/typing/db';

const generationSort = (generationList: IGeneration[]) => {
  generationList.sort((left, right) => left.generationNumber - right.generationNumber);
  return generationList;
};

export default generationSort;
