import category from './documents/category';
import page from './documents/page';
import person from './documents/person';
import post from './documents/post';
import promotionItem from './documents/promotionItem';
import review from './documents/review';
import reviewCategory from './documents/reviewCategory';
import servicePage from './documents/servicePage';
import blockContent from './objects/blockContent';
import button from './objects/button';
import link from './objects/link';
import megaMenuGroup from './objects/megaMenuGroup';
import megaMenuLinkItem from './objects/megaMenuLinkItem';
import megaMenuSection from './objects/megaMenuSection';
import menuItem from './objects/menuItem';
import aboutDoctor from './objects/sections/aboutDoctor';
import benefits from './objects/sections/benefits';
import card from './objects/sections/card';
import cardGrid from './objects/sections/cardGrid';
import contact from './objects/sections/contact';
import cta from './objects/sections/cta';
import divider from './objects/sections/divider';
import faq from './objects/sections/faq';
import gallery from './objects/sections/gallery';
import hero from './objects/sections/hero';
import introduction from './objects/sections/introduction';
import mediaText from './objects/sections/mediaText';
import postList from './objects/sections/postList';
import pricing from './objects/sections/pricing';
import reviewsByCategory from './objects/sections/reviewsByCategory';
import sectionEffects from './objects/sections/sectionEffects';
import services from './objects/sections/services';
import subscribe from './objects/sections/subscribe';
import technologyShowcase from './objects/sections/technologyShowcase';
import testimonials from './objects/sections/testimonials';
import seoTypes from './objects/seo';
import aboutPage from './singletons/aboutPage';
import aestheticTreatmentsPage from './singletons/aestheticTreatmentsPage';
import blogPage from './singletons/blogPage';
import homePage from './singletons/homePage';
import pricingPage from './singletons/pricingPage';
import promotionsPage from './singletons/promotionsPage';
import reviewsPage from './singletons/reviewsPage';
import settings from './singletons/settings';

export const schemaTypes = [
  settings,
  homePage,
  aboutPage,
  blogPage,
  aestheticTreatmentsPage,
  pricingPage,
  promotionsPage,
  reviewsPage,
  page,
  post,
  promotionItem,
  review,
  reviewCategory,
  person,
  category,
  servicePage,
  cta,
  hero,
  introduction,
  services,
  technologyShowcase,
  sectionEffects,
  gallery,
  benefits,
  aboutDoctor,
  testimonials,
  pricing,
  faq,
  contact,
  mediaText,
  postList,
  card,
  cardGrid,
  reviewsByCategory,
  divider,
  subscribe,
  blockContent,
  link,
  megaMenuLinkItem,
  megaMenuGroup,
  megaMenuSection,
  button,
  menuItem,
  ...seoTypes,
];
