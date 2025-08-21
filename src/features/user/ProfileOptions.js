export const CATEGORY_OPTIONS = [
  {label: '로고 디자인', value: 'LOGO'},
  {label: '브랜드 디자인', value: 'BRAND'},
  {label: '굿즈 디자인', value: 'GOODS'},
  {label: '포스터/전단지 디자인', value: 'POSTER_FLYER'},
  {label: '배너/광고 디자인', value: 'BANNER_AD'},
  {label: '패키지 디자인', value: 'PACKAGE'},
  {label: '명함/카드/인쇄물 디자인', value: 'CARD'},
];

export const STYLE_OPTIONS = [
  {label: '심플한', value: 'SIMPLE'},
  {label: '따뜻한', value: 'WARM'},
  {label: '화려한', value: 'FANCY'},
  {label: '산뜻한', value: 'NEAT'},
  {label: '차분한', value: 'TRANQUIL'},
  {label: '빈티지', value: 'VINTAGE'},
  {label: '레트로', value: 'RETRO'},
  {label: '귀여운', value: 'CUTE'},
  {label: '러블리', value: 'LOVELY'},
  {label: '청량한', value: 'REFRESHING'},
  {label: '자연스러운', value: 'NATURAL'},
  {label: '고급스러운', value: 'LUXURIOUS'},
  {label: '현대적인', value: 'MODERN'},
  {label: '클래식한', value: 'CLASSIC'},
  {label: '감성적인', value: 'EMOTIONAL'},
];

export const toValueArray = (arr, options) => {
  if (!Array.isArray(arr)) return [];
  const labelToValue = Object.fromEntries(options.map((o) => [o.label, o.value]));
  return arr.map((v) => labelToValue[v] ?? v);
};
