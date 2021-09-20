export enum jobVacanciesType {
  lookingJob = '구인중',
  preparingMove = '이직 준비중',
  proNjob = '프로 N잡러',
  unselected = '해당 사항 없음',
}
export enum participationMethodType {
  remote = '원격 근무',
  fullTime = '풀타임',
  partTime = '파트타임',
  selfCommuting = '자율 출퇴근',
  unselected = '상관 없음',
}

export const jobVacanciesConv = (key: jobVacanciesType) => {
  switch (key) {
    case jobVacanciesType.lookingJob:
      return '구인중';
    case jobVacanciesType.preparingMove:
      return '이직 준비중';
    case jobVacanciesType.proNjob:
      return '프로 N잡러';
    default:
      return '해당 사항 없음';
  }
};
export const participationMethodConv = (key: participationMethodType) => {
  switch (key) {
    case participationMethodType.remote:
      return '원격 근무';
    case participationMethodType.fullTime:
      return '풀타임';
    case participationMethodType.partTime:
      return '파트타임';
    case participationMethodType.selfCommuting:
      return '자율 출퇴근';
    default:
      return '상관없음';
  }
};
export type profileType = {
  jobVacancies: jobVacanciesType;
  participationMethod: participationMethodType;
  displayName: string | undefined;
  description: string | undefined;
  picture: string | undefined;
  emoji: string | undefined;
  socialServices: string[];
};
