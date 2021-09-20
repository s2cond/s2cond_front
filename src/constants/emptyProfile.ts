import {
  jobVacanciesType,
  participationMethodType,
  profileType,
} from './profileTypes';

export const emptyProfile: profileType = {
  jobVacancies: jobVacanciesType.unselected,
  participationMethod: participationMethodType.unselected,
  displayName: '',
  description: '',
  picture: '',
  emoji: '',
  socialServices: [],
};
