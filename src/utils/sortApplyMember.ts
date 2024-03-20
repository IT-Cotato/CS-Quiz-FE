import { IApplyMember } from '@/typing/db';

const sortApplyMember = (members?: IApplyMember[]): IApplyMember[] | undefined => {
  members?.sort((left, right) => left.name.localeCompare(right.name));
  return members;
};

export default sortApplyMember;
