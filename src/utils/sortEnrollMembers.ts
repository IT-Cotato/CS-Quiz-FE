import { IEnrollMember } from '@/typing/db';

const sortMembers = (members?: IEnrollMember[]): IEnrollMember[] | undefined => {
  members?.sort((left, right) => {
    if (left.generationNumber !== right.generationNumber) {
      return left.generationNumber - right.generationNumber;
    }
    return left.memberName.localeCompare(right.memberName);
  });
  return members;
};

export default sortMembers;