import { IGeneration } from '@/typing/db';

const generationSort = (generationList: IGeneration[]) => {
  generationList.sort((left, right) => right.generationNumber - left.generationNumber);
  return generationList;
};

export default generationSort;
