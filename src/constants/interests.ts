export type interestType = {
  kr: string;
  en: string;
};
type Keys =
  | 'name'
  | 'traveling'
  | 'outdoor'
  | 'healthNutrition'
  | 'pet'
  | 'chillVibes'
  | 'stock'
  | 'foodDrink'
  | 'veganism'
  | 'readingMovie'
  | 'shopping'
  | 'entrepreneurship'
  | 'networking'
  | 'realEstate'
  | 'wedding'
  | 'dating'
  | 'parenting';
export type interestsType = {
  [K in Keys]: interestType;
};
export const life: interestsType = {
  name: { kr: '삶', en: 'Life' },
  traveling: { kr: '여행', en: 'Traveling' },
  outdoor: { kr: '아웃도어', en: 'Outdoor' },
  healthNutrition: { kr: '건강', en: 'Health & Nutrition' },
  pet: { kr: '반려동물', en: 'Pet' },
  chillVibes: { kr: '여유', en: 'Chill Vibes' },
  stock: { kr: '주식', en: 'Stock' },
  foodDrink: { kr: '음식&술', en: 'Food & Drinks' },
  veganism: { kr: '채식', en: 'Veganism' },
  readingMovie: { kr: '독서&영화', en: 'Reading & Movie' },
  shopping: { kr: '쇼핑', en: 'shopping' },
  entrepreneurship: { kr: '사업', en: 'entrepreneurship' },
  networking: { kr: '네트워킹', en: 'Networking' },
  realEstate: { kr: '부동산', en: 'Real Estate' },
  wedding: { kr: '결혼', en: 'Wedding' },
  dating: { kr: '연애', en: 'Dating' },
  parenting: { kr: '육아', en: 'Parenting' },
};
export const arts = {};
export const industry = {};
export const knowledge = {};
export const sports = {};
export const languages = {};

export const interest = [life, arts, industry, knowledge, sports, languages];
