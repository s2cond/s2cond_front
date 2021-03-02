export type interestType = {
  kr: string;
  en: string;
};
// type Keys =
//   | 'name'
//   | 'traveling'
//   | 'outdoor'
//   | 'healthNutrition'
//   | 'pet'
//   | 'chillVibes'
//   | 'stock'
//   | 'foodDrink'
//   | 'veganism'
//   | 'readingMovie'
//   | 'shopping'
//   | 'entrepreneurship'
//   | 'networking'
//   | 'realEstate'
//   | 'wedding'
//   | 'dating'
//   | 'parenting';
// export type interestsType2 = {
//   [K in Keys]: interestType;
// };
export type interestsType = {
  [k: string]: interestType;
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
export const identity: interestsType = {
  name: { kr: '아이덴티티', en: 'Identity' },
  babyBoomer: { kr: '베이비부머', en: 'Baby boomer' },
  genX: { kr: 'X세대', en: 'Generation X' },
  millennials: { kr: '밀레니얼', en: 'millennials' },
  genZ: { kr: 'Z세대', en: 'Generation Z' },
  disabled: { kr: '장애인', en: 'Disabled' },
  lgbtq: { kr: 'LGBTQ', en: 'LGBTQ' },
};
export const arts: interestsType = {
  name: { kr: '예술', en: 'Arts' },
  art: { kr: '미술', en: 'Art' },
  architecture: { kr: '건축', en: 'Architecture' },
  fashion: { kr: '패션', en: 'Fashion' },
  craft: { kr: '공예', en: 'Craft' },
  design: { kr: '디자인', en: 'Design' },
  writing: { kr: '글', en: 'Writing' },
  photography: { kr: '사진', en: 'Photography' },
  danceFun: { kr: '춤바람', en: 'Dance & Fun' },
  theater: { kr: '연극', en: 'Theater' },
  film: { kr: '영상', en: 'Film' },
  music: { kr: '음악', en: 'Music' },
  streaming: { kr: '스트리밍', en: 'Streaming' },
  animation: { kr: '애니메이션', en: 'Animation' },
};
export const industry: interestsType = {
  name: { kr: '산업', en: 'Industry' },
  ai: { kr: '인공지능', en: 'AI' },
  saas: { kr: 'SaaS', en: 'SaaS' },
  blockchain: { kr: '블록체인', en: 'Blockchain' },
  vrAr: { kr: 'VR/AR', en: 'VR/Ar' },
  healthcare: { kr: '헬스케어', en: 'Healthcare' },
  mobility: { kr: '모빌리티', en: 'Mobility' },
  entertainment: { kr: '엔터테인먼트', en: 'Entertainment' },
  startup: { kr: '스타트업', en: 'Startup' },
  ventureAngel: { kr: '벤처/엔젤', en: 'Venture & Angel' },
  marketing: { kr: '마케팅', en: 'Marketing' },
  eCommerce: { kr: 'e커머스', en: 'e-Commerce' },
  food: { kr: '푸드', en: 'Food' },
  hr: { kr: 'HR', en: 'HR' },
  robotics: { kr: '로보틱스', en: 'Robotics' },
  finance: { kr: '금융', en: 'Finance' },
};
export const knowledge: interestsType = {
  name: { kr: '지식', en: 'Knowledge' },
  space: { kr: '우주', en: 'Space' },
  theFuture: { kr: '미래', en: 'Future' },
  physics: { kr: '물리', en: 'Physics' },
  biology: { kr: '바이오', en: 'Biology' },
  math: { kr: '수학', en: 'Math' },
  history: { kr: '역사', en: 'History' },
  philosophy: { kr: '철학', en: 'Philosophy' },
  psychology: { kr: '심리학', en: 'Psychology' },
  economics: { kr: '경제학', en: 'Economics' },
  politics: { kr: '정치', en: 'Politics' },
};
export const sports: interestsType = {
  name: { kr: '스포츠', en: 'Sports' },
  soccer: { kr: '축구', en: 'Soccer' },
  baseball: { kr: '야구', en: 'Baseball' },
  basketball: { kr: '농구', en: 'Basketball' },
  golf: { kr: '골프', en: 'golf' },
  fitness: { kr: '피트니스', en: 'fitness' },
  cycling: { kr: '사이클', en: 'Cycling' },
  tennis: { kr: '테니스', en: 'Tennis' },
  running: { kr: '러닝', en: 'running' },
  swim: { kr: '수영', en: 'Swim' },
  game: { kr: '게임', en: 'Game' },
};
export const languages: interestsType = {
  name: { kr: '언어', en: 'Languages' },
  english: { kr: '영어', en: 'English' },
  chinese: { kr: ' 중국어', en: 'Chinese' },
  japanese: { kr: '일본어', en: 'Japanese' },
  french: { kr: '프랑스어', en: 'French' },
  spanish: { kr: '스페인어', en: 'Spanish' },
  german: { kr: '독일어', en: 'German' },
  indonesian: { kr: '인도네시아어', en: 'Indonesian' },
};

export const interest: interestsType[] = [
  life,
  identity,
  arts,
  industry,
  knowledge,
  sports,
  languages,
];
