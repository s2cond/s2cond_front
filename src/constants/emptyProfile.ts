import {
  jobVacanciesType,
  partitionMethodType,
  profileType,
} from './profileTypes';

export const emptyProfile: profileType = {
  jobVacancies: jobVacanciesType.unselected,
  partitionMethod: partitionMethodType.unselected,
  displayName: '',
  description: '',
  picture: '',
  emoji: '',
  socialServices: [],
};
