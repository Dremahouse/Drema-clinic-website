export const twitterFragment = /* groq */ `
  _type,
  site,
  creator,
  cardType,
  handle,
`;

export const imageFragment = /* groq */ `
  _type,
  crop {
    _type,
    right,
    top,
    left,
    bottom
  },
  hotspot {
    _type,
    x,
    y,
    height,
    width,
  },
  asset->{...},
`;

export const openGraphFragment = /* groq */ `
  _type,
  siteName,
  url,
  description,
  title,
  image {
    ${imageFragment}
  },
`;

export const metaAttributesFragment = /* groq */ `
  _type,
  attributeValueString,
  attributeType,
  attributeKey,
  attributeValueImage {
    ${imageFragment}
  },
`;

export const additionalMetaTagFragment = /* groq */ `
  _key,
  _type,
  metaAttributes[] {
    ${metaAttributesFragment}
  },
`;

export const seoFragment = /* groq */ `
  _type,
  metaTitle,
  noIndex,
  seoKeywords,
  metaDescription,
  metaImage{
    ${imageFragment}
  },
  additionalMetaTags[]{
    ${additionalMetaTagFragment}
  },
  openGraph {
    ${openGraphFragment}
  },
  twitter {
    ${twitterFragment}
  }
`;

export const linkFragment = /* groq */ `
  _type,
  type,
  openInNewTab,
  external,
  href,
  internal->{
    _type,
    _id,
    "slug": slug.current
  },
`;

const customLinkFragment = /* groq */ `
  ...customLink{
    ${linkFragment}
  },
`;

const markDefsFragment = /* groq */ `
  markDefs[]{
    ...,
    ${customLinkFragment}
  },
`;

const contentFragment = /* groq */ `
  content[]{
    ...,
    ${markDefsFragment}
  },
`;

export const buttonFragment = /* groq */ `
  _key,
  _type,
  variant,
  text,
  textEn,
  link {
    ${linkFragment}
  },
`;

export const buttonsFragment = /* groq */ `
  buttons[]{
    ${buttonFragment}
  },
`;

export const sectionEffectsFragment = /* groq */ `
  effects {
    enabled,
    reveal,
    stagger,
    hoverScale,
    parallax
  }
`;

export const heroSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  kickerTh,
  kickerEn,
  headingTh,
  headingEn,
  textTh,
  textEn,
  primaryCtaTextTh,
  primaryCtaTextEn,
  primaryCtaLink {
    ${linkFragment}
  },
  secondaryCtaTextTh,
  secondaryCtaTextEn,
  secondaryCtaLink {
    ${linkFragment}
  },
  heading,
  text,
  image {
    alt,
    ${imageFragment}
  },
  images[] {
    alt,
    ${imageFragment}
  },
  ${buttonsFragment}
`;

export const introductionSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  content,
  image {
    ${imageFragment}
  }
`;

export const servicesSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  intro,
  items[] {
    _key,
    title,
    summary,
    image {
      ${imageFragment}
    },
    link {
      ${linkFragment}
    }
  }
`;

export const gallerySectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  intro,
  images[] {
    _key,
    alt,
    caption,
    ${imageFragment}
  }
`;

export const benefitsSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  intro,
  items[] {
    _key,
    title,
    description
  }
`;

export const aboutDoctorSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  headingTh,
  headingEn,
  intro,
  introTh[]{
    ...,
    ${markDefsFragment}
  },
  introEn[]{
    ...,
    ${markDefsFragment}
  },
  backgroundImage {
    alt,
    ${imageFragment}
  },
  name,
  nameTh,
  nameEn,
  role,
  roleTh,
  roleEn,
  bio,
  bioTh[]{
    ...,
    ${markDefsFragment}
  },
  bioEn[]{
    ...,
    ${markDefsFragment}
  },
  photo {
    ${imageFragment}
  },
  doctors[] {
    _key,
    name,
    nameTh,
    nameEn,
    role,
    roleTh,
    roleEn,
    bio,
    bioTh[]{
      ...,
      ${markDefsFragment}
    },
    bioEn[]{
      ...,
      ${markDefsFragment}
    },
    profileSummaryTh,
    profileSummaryEn,
    profilePanelHeadingTh,
    profilePanelHeadingEn,
    profileHighlights[] {
      _key,
      labelTh,
      labelEn,
      textTh,
      textEn
    },
    photo {
      ${imageFragment}
    }
  },
  ${buttonsFragment}
`;

export const testimonialsSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  intro,
  sourceBadgeLabel,
  viewAllLabel,
  viewAllUrl,
  backgroundImage {
    alt,
    ${imageFragment}
  },
  items[] {
    _key,
    quote,
    quoteTh,
    quoteEn,
    sourceLabel,
    rating,
    reviewDate,
    name,
    tag,
    sourceUrl,
    avatar {
      ${imageFragment}
    }
  }
`;

export const pricingSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  note,
  plans[] {
    _key,
    title,
    price,
    highlight,
    features,
    cta {
      ${buttonFragment}
    }
  }
`;

export const faqSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  headingEn,
  backgroundImage {
    alt,
    ${imageFragment}
  },
  items[] {
    _key,
    question,
    questionEn,
    answer,
    answerEn
  }
`;

export const contactSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heroImage {
    alt,
    ${imageFragment}
  },
  heroImageDesktop {
    alt,
    ${imageFragment}
  },
  heroImageMobile {
    alt,
    ${imageFragment}
  },
  heroBackgroundDesktop {
    alt,
    ${imageFragment}
  },
  heroBackgroundMobile {
    alt,
    ${imageFragment}
  },
  heroKicker,
  heroKickerEn,
  heading,
  headingEn,
  description,
  descriptionEn,
  heroButton {
    ${buttonFragment}
  },
  mapBranches[] {
    _key,
    name,
    nameEn,
    embedUrl,
    address,
    addressEn,
    phone,
    lineId,
    lineUrl,
    transitInfo,
    transitInfoEn,
    parkingInfo,
    parkingInfoEn,
    ctaHeading,
    ctaHeadingEn,
    ctaDescription,
    ctaDescriptionEn,
    ctaButtons[] {
      ${buttonFragment}
    }
  },
  mapSectionHeading,
  mapSectionHeadingEn,
  clinicName,
  openingHoursHeading,
  openingHoursHeadingEn,
  openingHours[] {
    _key,
    label,
    labelEn,
    hours
  },
  bookingHeading,
  bookingHeadingEn,
  bookingDescription,
  bookingDescriptionEn,
  bookingButtons[] {
    ${buttonFragment}
  },
  citationSummaryTh,
  citationSummaryEn,
  faqHeading,
  faqHeadingEn,
  faqItems[] {
    _key,
    question,
    questionEn,
    answer,
    answerEn
  },
  galleryHeading,
  galleryHeadingEn,
  galleryImages[] {
    alt,
    ${imageFragment}
  }
  `;

export const mediaTextSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  content,
  imagePosition,
  image {
    ${imageFragment}
  },
`;

export const technologyShowcaseSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  intro,
  featured {
    label,
    title,
    subtitle,
    image {
      alt,
      ${imageFragment}
    },
    mobileImage {
      alt,
      ${imageFragment}
    }
  },
  sideItems[] {
    _key,
    title,
    subtitle,
    image {
      alt,
      ${imageFragment}
    },
    mobileImage {
      alt,
      ${imageFragment}
    }
  },
  ctaText,
  ctaLink {
    ${linkFragment}
  }
`;

export const categoryFragment = /* groq */ `
  _id,
  _type,
  title,
  "slug": slug.current,
  description,
  descriptionTh,
  descriptionEn,
  coverImage {
    alt,
    ${imageFragment}
  },
`;

export const reviewCategoryFragment = /* groq */ `
  _id,
  _type,
  title,
  titleTh,
  titleEn,
  "slug": slug.current,
  descriptionTh,
  descriptionEn,
  citationIntroTh,
  citationIntroEn,
  citationKeyPointsTh,
  citationKeyPointsEn,
  citationKeyPoints,
  citationDisclaimerTh,
  citationDisclaimerEn,
  order,
  isActive,
  coverImage {
    alt,
    ${imageFragment}
  },
  heroBackgroundDesktop {
    alt,
    ${imageFragment}
  },
  heroBackgroundMobile {
    alt,
    ${imageFragment}
  },
`;

export const reviewCardFragment = /* groq */ `
  _id,
  _type,
  title,
  "slug": slug.current,
  featured,
  order,
  publishedAt,
  coverImage {
    alt,
    ${imageFragment}
  },
  "category": *[
    _type == "reviewCategory"
    && (
      _id == ^.category._ref
      || "drafts." + _id == ^.category._ref
    )
  ][0]{
    ${reviewCategoryFragment}
  },
`;

export const personFragment = /* groq */ `
  _id,
  _type,
  firstName,
  lastName,
  firstNameEn,
  lastNameEn,
  image,
  heroImageDesktop{
    alt,
    ${imageFragment}
  },
  heroImageMobile{
    alt,
    ${imageFragment}
  },
  heroBackgroundDesktop{
    alt,
    ${imageFragment}
  },
  heroBackgroundMobile{
    alt,
    ${imageFragment}
  },
  role,
  roleEn,
  heroProfileLabelTh,
  heroProfileLabelEn,
  heroKickerTh,
  heroKickerEn,
  heroIntroTh,
  heroIntroEn,
  heroPrimaryCtaTextTh,
  heroPrimaryCtaTextEn,
  heroPrimaryCtaLink {
    ${linkFragment}
  },
  heroSecondaryCtaTextTh,
  heroSecondaryCtaTextEn,
  heroSecondaryCtaLink {
    ${linkFragment}
  },
  heroInfoCards[] {
    _key,
    titleTh,
    titleEn,
    descriptionTh,
    descriptionEn
  },
  heroCredentialCards[] {
    _key,
    titleTh,
    titleEn,
    descriptionTh,
    descriptionEn
  },
  heroTrustItems[] {
    _key,
    titleTh,
    titleEn,
    descriptionTh,
    descriptionEn
  },
  citationSummaryTh,
  citationSummaryEn,
  keyHighlightsTh,
  keyHighlightsEn,
  biography,
  biographyEn,
  professionalProfileSections[] {
    _key,
    titleTh,
    titleEn,
    itemsTh,
    itemsEn
  },
  certifications[] {
    _key,
    titleTh,
    titleEn,
    issuerTh,
    issuerEn,
    year,
    image {
      alt,
      ${imageFragment}
    }
  },
  "slug": slug.current,
`;

export const postCardFragment = /* groq */ `
  _type,
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  titleEn,
  "slug": slug.current,
  excerpt,
  excerptEn,
  highlightQuote,
  highlightQuoteEn,
  quickFacts,
  quickFactsEn,
  image,
  "categories": categories[]->{${categoryFragment}},
  "date": coalesce(date, _updatedAt),
  "author": author->{${personFragment}},
  "wordCount": count(string::split(coalesce(pt::text(content), ''), " ")),
`;

export const postFragment = /* groq */ `
  ${postCardFragment}
  ${contentFragment}
  contentEn[]{
    ...,
    ${markDefsFragment}
  },
  faqItems[]{
    _key,
    questionTh,
    questionEn,
    shortAnswerTh,
    shortAnswerEn,
    detailTh,
    detailEn
  },
  sourceReferences,
  sourceReferencesEn,
  references[] {
    _key,
    titleTh,
    titleEn,
    authors,
    source,
    year,
    url,
    doi,
    pmid,
    volume,
    issue,
    pages
  },
  "medicalReviewer": medicalReviewer->{
    ${personFragment}
  },
  restylaneTableRows[]{
    _key,
    model,
    profileTh,
    profileEn,
    areasTh,
    areasEn,
    durationTh,
    durationEn
  },
  seo {
    ${seoFragment}
  },
`;

export const postListSectionFragment = /* groq */ `
    _type,
  ${sectionEffectsFragment},
    heading,
    numberOfPosts,
    "posts": *[_type == 'post'] | order(_createdAt desc, _id desc) [0...20] {
      ${postFragment}
    }
`;

export const dividerSectionFragment = /* groq */ `
  _type,
  height
`;

export const ctaSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  text,
  ${buttonsFragment}
`;

export const subscribeSectionFragment = /* groq */ `
  _type,
  ${sectionEffectsFragment},
  heading,
  text
`;

export const reviewsByCategorySectionFragment = /* groq */ `
  _type,
  heading,
  description,
  numberOfReviews,
  showViewAll,
  "category": category->{
    ${reviewCategoryFragment}
  },
  "reviews": *[
    _type == "review"
    && (
      category._ref == ^.category._ref
      || category._ref == "drafts." + ^.category._ref
      || "drafts." + category._ref == ^.category._ref
    )
  ] | order(coalesce(order, 999) asc, coalesce(publishedAt, _createdAt) desc) [0...24] {
    ${reviewCardFragment}
  },
`;

export const cardGridFragment = /* groq */ `
  _type,
  heading,
  headingTh,
  headingEn,
  ${contentFragment}
  contentTh[]{
    ...,
    ${markDefsFragment}
  },
  contentEn[]{
    ...,
    ${markDefsFragment}
  },
  backgroundImage{
    alt,
    ${imageFragment}
  },
  image{
    alt,
    ${imageFragment}
  },
  icon,
`;

export const cardGridsSectionFragment = /* groq */ `
  ${cardGridFragment}
  cards[]{
    ${cardGridFragment}
  },
`;

export const pageBuilderFragment = /* groq */ `
  pageSections[]{
    ...,
    _key,
    _type,
    _type == 'hero' => {${heroSectionFragment}},
    _type == 'introduction' => {${introductionSectionFragment}},
    _type == 'services' => {${servicesSectionFragment}},
    _type == 'technologyShowcase' => {${technologyShowcaseSectionFragment}},
    _type == 'gallery' => {${gallerySectionFragment}},
    _type == 'benefits' => {${benefitsSectionFragment}},
    _type == 'aboutDoctor' => {${aboutDoctorSectionFragment}},
    _type == 'testimonials' => {${testimonialsSectionFragment}},
    _type == 'pricing' => {${pricingSectionFragment}},
    _type == 'faq' => {${faqSectionFragment}},
    _type == 'contact' => {${contactSectionFragment}},
    _type == 'cardGrid' => {${cardGridsSectionFragment}},
    _type == 'cta' => {${ctaSectionFragment}},
    _type == 'divider' => {${dividerSectionFragment}},
    _type == 'mediaTextSection' => {${mediaTextSectionFragment}},
    _type == 'postList' => {${postListSectionFragment}},
    _type == 'subscribe' => {${subscribeSectionFragment}},
    _type == 'reviewsByCategory' => {${reviewsByCategorySectionFragment}}
  },
`;

export const menuItemFragment = /* groq */ `
  _type,
  _key,
  text,
  textTh,
  textEn,
  type,
  link {
    ${linkFragment}
  },
`;

export const menuFragment = /* groq */ `
  menu[]{
    ${menuItemFragment}
    childMenu[]{
      ${menuItemFragment}
    }
  }
`;

export const megaMenuLinkItemFragment = /* groq */ `
  _key,
  labelTh,
  labelEn,
  link {
    ${linkFragment}
  }
`;

export const megaMenuGroupFragment = /* groq */ `
  _key,
  titleTh,
  titleEn,
  items[] {
    ${megaMenuLinkItemFragment}
  }
`;

export const megaMenuSectionFragment = /* groq */ `
  _key,
  titleTh,
  titleEn,
  link {
    ${linkFragment}
  },
  groups[] {
    ${megaMenuGroupFragment}
  },
  items[] {
    ${megaMenuLinkItemFragment}
  }
`;

export const pageFragment = /* groq */ `
  ${pageBuilderFragment}
  seo {
    ${seoFragment}
  },
`;
