import { defineArrayMember, defineField } from 'sanity';
import aboutDoctor from '../objects/sections/aboutDoctor';
import benefits from '../objects/sections/benefits';
import cardGrid from '../objects/sections/cardGrid';
import contact from '../objects/sections/contact';
import cta from '../objects/sections/cta';
import divider from '../objects/sections/divider';
import faq from '../objects/sections/faq';
import gallery from '../objects/sections/gallery';
import hero from '../objects/sections/hero';
import introduction from '../objects/sections/introduction';
import mediaText from '../objects/sections/mediaText';
import postList from '../objects/sections/postList';
import pricing from '../objects/sections/pricing';
import reviewsByCategory from '../objects/sections/reviewsByCategory';
import services from '../objects/sections/services';
import subscribe from '../objects/sections/subscribe';
import testimonials from '../objects/sections/testimonials';

const pageSectionsObjects = [
  hero,
  introduction,
  services,
  gallery,
  benefits,
  aboutDoctor,
  testimonials,
  pricing,
  faq,
  contact,
  mediaText,
  cardGrid,
  postList,
  cta,
  subscribe,
  reviewsByCategory,
  divider,
];

export default defineField({
  name: 'pageSections',
  title: 'Page Sections',
  type: 'array',
  of: pageSectionsObjects.map(({ name }) => defineArrayMember({ type: name })),
  group: 'content',
});
