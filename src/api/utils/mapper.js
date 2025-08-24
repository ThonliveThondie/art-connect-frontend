export const DESIGN_CATEGORIES = {
  LOGO: '로고 디자인',
  BRAND: '브랜드 디자인',
  GOODS: '굿즈 디자인',
  POSTER_FLYER: '포스터 · 전단지 디자인',
  BANNER_AD: '배너 · 광고 디자인',
  PACKAGE: '패키지 디자인',
  CARD: '명함 카드 · 인쇄물 디자인',
};

export const mapCategoryToLabel = (category) => {
  return DESIGN_CATEGORIES[category] || category;
};

export const mapLabelToCategory = (label) => {
  const entry = Object.entries(DESIGN_CATEGORIES).find(([key, value]) => value === label);
  return entry ? entry[0] : label;
};

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

export const DESIGN_STYLES = {
  SIMPLE: '심플한',
  WARM: '따뜻한',
  FANCY: '화려한',
  NEAT: '산뜻한',
  TRANQUIL: '차분한',
  VINTAGE: '빈티지',
  RETRO: '레트로',
  CUTE: '귀여운',
  LOVELY: '러블리',
  REFRESHING: '청량한',
  NATURAL: '자연스러운',
  LUXURIOUS: '고급스러운',
  MODERN: '현대적인',
  CLASSIC: '클래식한',
  EMOTIONAL: '감성적인',
};

export const mapStyleToLabel = (style) => {
  return DESIGN_STYLES[style] || style;
};

export const mapLabelToStyle = (label) => {
  const entry = Object.entries(DESIGN_STYLES).find(([key, value]) => value === label);
  return entry ? entry[0] : label;
};

export const toValueArray = (arr, options) => {
  if (!Array.isArray(arr)) return [];
  const labelToValue = Object.fromEntries(options.map((o) => [o.label, o.value]));
  return arr.map((v) => labelToValue[v] ?? v);
};

export const toLabelArray = (arr, options) => {
  if (!Array.isArray(arr)) return [];
  const valueToLabel = Object.fromEntries(options.map((o) => [o.value, o.label]));
  return arr.map((v) => valueToLabel[v] ?? v);
};

export const getCategoryOptions = () => CATEGORY_OPTIONS;

export const getStyleOptions = () => STYLE_OPTIONS;

export const mapCategoriesToLabels = (categories) => {
  if (!Array.isArray(categories)) return [];
  const categoryMap = Object.fromEntries(CATEGORY_OPTIONS.map((option) => [option.value, option.label]));
  return categories.map((category) => categoryMap[category] || category);
};

export const mapStylesToLabels = (styles) => {
  if (!Array.isArray(styles)) return [];
  const styleMap = Object.fromEntries(STYLE_OPTIONS.map((option) => [option.value, option.label]));
  return styles.map((style) => styleMap[style] || style);
};

export const mapLabelsToCategories = (labels) => {
  if (!Array.isArray(labels)) return [];
  const labelMap = Object.fromEntries(CATEGORY_OPTIONS.map((option) => [option.label, option.value]));
  return labels.map((label) => labelMap[label] || label);
};

export const mapLabelsToStyles = (labels) => {
  if (!Array.isArray(labels)) return [];
  const labelMap = Object.fromEntries(STYLE_OPTIONS.map((option) => [option.label, option.value]));
  return labels.map((label) => labelMap[label] || label);
};
