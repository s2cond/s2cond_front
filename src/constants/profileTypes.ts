export enum jobVacanciesType {
  lookingJob = '구인중',
  preparingMove = '이직 준비중',
  proNjob = '프로 N잡러',
  unselected = '해당 사항 없음',
}
export enum partitionMethodType {
  remote = '원격 근무',
  fullTime = '풀타임',
  partTime = '파트타임',
  selfCommuting = '자율 출퇴근',
  unselected = '상관 없음',
}


export type profileType = {
  jobVacancies: jobVacanciesType;
  partitionMethod: partitionMethodType;
  displayName: string | undefined;
  description: string | undefined;
  picture: string | undefined;
  emoji: string | undefined;
  socialServices: string[];
};
