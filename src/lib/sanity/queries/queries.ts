import { defineQuery } from 'next-sanity';
import {
  categoryFragment,
  imageFragment,
  linkFragment,
  megaMenuSectionFragment,
  menuFragment,
  pageFragment,
  personFragment,
  postCardFragment,
  postFragment,
  reviewCardFragment,
  reviewCategoryFragment,
} from './fragments/fragments';

export const settingsQuery =
  defineQuery(`*[_type == "settings" && _id in ["siteSettings", "drafts.siteSettings"]] | order(_updatedAt desc)[0]{
  title,
  logo {
    alt,
    ${imageFragment}
  },
  headerBackgroundImage {
    alt,
    ${imageFragment}
  },
  enableOverlay,
  overlayColor,
  overlayOpacity,
  description,
  socialLinks[]{
    _key,
    platform,
    label,
    logo{
      alt,
      ${imageFragment}
    },
    url
  },
  globalCtaHeadingTh,
  globalCtaHeadingEn,
  globalCtaTextTh,
  globalCtaTextEn,
  globalCtaButtonTextTh,
  globalCtaButtonTextEn,
  globalCtaButtonLink{
    ${linkFragment}
  },
  globalCtaBackgroundImage{
    alt,
    ${imageFragment}
  },
  ogImage{
    alt,
    metadataBase,
    ${imageFragment}
  },
  footerLocationsHeadingTh,
  footerLocationsHeadingEn,
  footerLocations[] {
    _key,
    nameTh,
    nameEn,
    addressTh,
    addressEn,
    hoursTh,
    hoursEn,
    phone,
    mapLabelTh,
    mapLabelEn,
    mapUrl
  },
  ${menuFragment},
  blogMegaMenuSections[] {
    ${megaMenuSectionFragment}
  },
  blogArticleHeroBackgroundImage{
    alt,
    ${imageFragment}
  }
}`);

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  _id,
  _type,
  name,
  philosophyLabelTh,
  philosophyLabelEn,
  philosophyHeadingTh,
  philosophyHeadingEn,
  philosophyTextTh,
  philosophyTextEn,
  philosophyImage {
    alt,
    ${imageFragment}
  },
  philosophyBackgroundImage {
    alt,
    ${imageFragment}
  },
  philosophyItems[] {
    _key,
    titleTh,
    titleEn,
    descriptionTh,
    descriptionEn
  },
  treatmentsLabelTh,
  treatmentsLabelEn,
  treatmentsHeadingTh,
  treatmentsHeadingEn,
  treatmentsTextTh,
  treatmentsTextEn,
  treatmentsButtonTextTh,
  treatmentsButtonTextEn,
  treatmentsBackgroundImage {
    alt,
    ${imageFragment}
  },
  technologyLabelTh,
  technologyLabelEn,
  technologyHeadingTh,
  technologyHeadingEn,
  technologyTextTh,
  technologyTextEn,
  technologyBackgroundImage {
    alt,
    ${imageFragment}
  },
  technologyItems[] {
    _key,
    textTh,
    textEn
  },
  technologyButtonTextTh,
  technologyButtonTextEn,
  technologyButtonLink {
    ${linkFragment}
  },
  "featuredServices": *[_type == "servicePage" && defined(slug.current)] | order(_createdAt asc) [0...4] {
    _id,
    name,
    "slug": slug.current,
    heroHeadingTh,
    heroHeadingEn,
    heroDescriptionTh,
    heroDescriptionEn,
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
    }
  },
  ${pageFragment}
}`);

export const aboutPageQuery = defineQuery(`*[_type == "aboutPage"][0]{
  _id,
  _type,
  name,
  heroEyebrowTh,
  heroEyebrowEn,
  heroHeadingTh,
  heroHeadingEn,
  heroDescriptionTh,
  heroDescriptionEn,
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
  heroPrimaryTextTh,
  heroPrimaryTextEn,
  heroPrimaryLink{
    ${linkFragment}
  },
  heroSecondaryTextTh,
  heroSecondaryTextEn,
  heroSecondaryLink{
    ${linkFragment}
  },
  summaryLabelTh,
  summaryLabelEn,
  summaryHeadingTh,
  summaryHeadingEn,
  summaryTh,
  summaryEn,
  doctorSectionLabelTh,
  doctorSectionLabelEn,
  doctorSectionHeadingTh,
  doctorSectionHeadingEn,
  doctorSectionIntroTh,
  doctorSectionIntroEn,
  featuredDoctor->{
    ${personFragment}
  },
  "doctors": *[_type == "person" && defined(slug.current)] | order(firstName asc, lastName asc) {
    ${personFragment}
  },
  trustSectionLabelTh,
  trustSectionLabelEn,
  trustSectionHeadingTh,
  trustSectionHeadingEn,
  trustSectionIntroTh,
  trustSectionIntroEn,
  trustPoints[] {
    _key,
    titleTh,
    titleEn,
    descriptionTh,
    descriptionEn
  },
  faqHeadingTh,
  faqHeadingEn,
  faqIntroTh,
  faqIntroEn,
  faqItems[] {
    _key,
    questionTh,
    questionEn,
    answerTh,
    answerEn
  },
  citationSummaryLabelTh,
  citationSummaryLabelEn,
  citationSummaryTh,
  citationSummaryEn,
  seo
}`);

export const blogPageQuery = defineQuery(`*[_type == "blogPage"][0]{
  _id,
  _type,
  ...,
  featuredPost->{
    ${postCardFragment}
  },
  featuredArticleTagTh,
  featuredArticleTagEn,
  latestStoriesTitleTh,
  latestStoriesTitleEn,
  latestStoriesSubtitleTh,
  latestStoriesSubtitleEn,
  readMoreTextTh,
  readMoreTextEn,
  doctorTipsTagTh,
  doctorTipsTagEn,
  doctorTipsTitleTh,
  doctorTipsTitleEn,
  doctorTipsIntroTh,
  doctorTipsIntroEn,
  doctorTipsIntroFollowupTh,
  doctorTipsIntroFollowupEn,
  doctorTipsSubheadingTh,
  doctorTipsSubheadingEn,
  doctorTip1TitleTh,
  doctorTip1TitleEn,
  doctorTip1Th,
  doctorTip1En,
  doctorTip2TitleTh,
  doctorTip2TitleEn,
  doctorTip2Th,
  doctorTip2En,
  doctorTip3TitleTh,
  doctorTip3TitleEn,
  doctorTip3Th,
  doctorTip3En,
  doctorTipsCtaTextTh,
  doctorTipsCtaTextEn,
  doctorTipsCtaLink {
    ${linkFragment}
  },
  quickCategoriesLabelTh,
  quickCategoriesLabelEn,
  featuredCategoriesHeadingTh,
  featuredCategoriesHeadingEn,
  featuredCategoriesSubtitleTh,
  featuredCategoriesSubtitleEn,
  featuredCategoriesCtaTh,
  featuredCategoriesCtaEn,
  featuredCategories[] {
    _key,
    titleTh,
    titleEn,
    descriptionTh,
    descriptionEn,
    "category": category->{
      ${categoryFragment}
    }
  },
  ${pageFragment}
}`);

export const aestheticTreatmentsPageQuery =
  defineQuery(`*[_type == "aestheticTreatmentsPage"][0]{
  _id,
  _type,
  name,
  heroHeadingTh,
  heroHeadingEn,
  heroDescriptionTh,
  heroDescriptionEn,
  heroImage{
    alt,
    ${imageFragment}
  },
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
  heroPrimaryCtaTextTh,
  heroPrimaryCtaTextEn,
  heroPrimaryCtaLink{
    ${linkFragment}
  },
  heroSecondaryCtaTextTh,
  heroSecondaryCtaTextEn,
  heroSecondaryCtaLink{
    ${linkFragment}
  },
  servicesHubComparisonRows[]{
    _key,
    service,
    imageTh{
      alt,
      ${imageFragment}
    },
    imageEn{
      alt,
      ${imageFragment}
    },
    suitableForTh,
    suitableForEn,
    highlightTh,
    highlightEn,
    timelineTh,
    timelineEn
  },
  servicesHubProcessSteps[]{
    _key,
    textTh,
    textEn,
    imageTh{
      alt,
      ${imageFragment}
    },
    imageEn{
      alt,
      ${imageFragment}
    }
  },
  featuredTreatmentsHeadingTh,
  featuredTreatmentsHeadingEn,
  featuredTreatmentsBackgroundImage{
    alt,
    ${imageFragment}
  },
  featuredTreatmentsItems[]{
    _key,
    titleTh,
    titleEn,
    summaryTh,
    summaryEn,
    imageTh{
      alt,
      ${imageFragment}
    },
    imageEn{
      alt,
      ${imageFragment}
    },
    link{
      ${linkFragment}
    }
  },
  whyChooseHeadingTh,
  whyChooseHeadingEn,
  whyChooseIntroTh,
  whyChooseIntroEn,
  whyChooseImage{
    alt,
    ${imageFragment}
  },
  whyChooseBackgroundImage{
    alt,
    ${imageFragment}
  },
  whyChoosePoints[]{
    _key,
    textTh,
    textEn
  },
  byConcernHeadingTh,
  byConcernHeadingEn,
  byConcernIntroTh,
  byConcernIntroEn,
  byConcernBackgroundImage{
    alt,
    ${imageFragment}
  },
  byConcernItems[]{
    _key,
    concernTh,
    concernEn,
    image{
      alt,
      ${imageFragment}
    },
    treatmentsTh,
    treatmentsEn
  },
  processBackgroundImage{
    alt,
    ${imageFragment}
  },
  comparisonBackgroundImage{
    alt,
    ${imageFragment}
  },
  ctaHeadingTh,
  ctaHeadingEn,
  ctaTextTh,
  ctaTextEn,
  ctaBackgroundImage{
    alt,
    ${imageFragment}
  },
  ctaPrimaryTextTh,
  ctaPrimaryTextEn,
  ctaPrimaryLink{
    ${linkFragment}
  },
  citationSummaryTh,
  citationSummaryEn,
  seo
  }`);

export const pricingPageQuery = defineQuery(`*[_type == "pricingPage"][0]{
  _id,
  _type,
  name,
  heroEyebrowTh,
  heroEyebrowEn,
  heroHeadingTh,
  heroHeadingEn,
  heroDescriptionTh,
  heroDescriptionEn,
  heroImage{
    alt,
    ${imageFragment}
  },
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
  heroPrimaryCtaTextTh,
  heroPrimaryCtaTextEn,
  heroPrimaryCtaLink{
    ${linkFragment}
  },
  heroSecondaryCtaTextTh,
  heroSecondaryCtaTextEn,
  heroSecondaryCtaLink{
    ${linkFragment}
  },
  anchorNavHeadingTh,
  anchorNavHeadingEn,
  pricingSections[]{
    _key,
    anchorId,
    titleTh,
    titleEn,
    descriptionTh,
    descriptionEn,
    columnsTh,
    columnsEn,
    rows[]{
      _key,
      menuTh,
      menuEn,
      packageTh,
      packageEn,
      promoPrice,
      quantityTh,
      quantityEn,
      regularPrice,
      noteTh,
      noteEn
    }
  },
  pricingNotesHeadingTh,
  pricingNotesHeadingEn,
  pricingNotesItems[]{
    _key,
    textTh,
    textEn
  },
  citationSummaryTh,
  citationSummaryEn,
  seo
}`);

export const promotionsPageQuery = defineQuery(`{
  "page": *[_type == "promotionsPage"][0]{
    _id,
    _type,
    name,
    heroEyebrowTh,
    heroEyebrowEn,
    heroHeadingTh,
    heroHeadingEn,
    heroDescriptionTh,
    heroDescriptionEn,
    heroImage{
      alt,
      ${imageFragment}
    },
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
    heroPrimaryCtaTextTh,
    heroPrimaryCtaTextEn,
    heroPrimaryCtaLink{
      ${linkFragment}
    },
    heroSecondaryCtaTextTh,
    heroSecondaryCtaTextEn,
    heroSecondaryCtaLink{
      ${linkFragment}
    },
    featuredLabelTh,
    featuredLabelEn,
    allPromotionsHeadingTh,
    allPromotionsHeadingEn,
    allPromotionsDescriptionTh,
    allPromotionsDescriptionEn,
    trustHeadingTh,
    trustHeadingEn,
    trustPoints[]{
      _key,
      titleTh,
      titleEn,
      descriptionTh,
      descriptionEn
    },
    faqHeadingTh,
    faqHeadingEn,
    faqItems[]{
      _key,
      questionTh,
      questionEn,
      answerTh,
      answerEn
    },
    citationSummaryTh,
    citationSummaryEn,
    citationSummaryLabelTh,
    citationSummaryLabelEn,
    seo
  },
  "settings": *[_type == "settings" && _id in ["siteSettings", "drafts.siteSettings"]] | order(_updatedAt desc)[0]{
    socialLinks[]{
      _key,
      platform,
      label,
      logo{
        alt,
        ${imageFragment}
      },
      url
    },
    globalCtaHeadingTh,
    globalCtaHeadingEn,
    globalCtaTextTh,
    globalCtaTextEn,
    globalCtaButtonTextTh,
    globalCtaButtonTextEn,
    globalCtaButtonLink{
      ${linkFragment}
    },
    globalCtaBackgroundImage{
      alt,
      ${imageFragment}
    }
  },
  "promotions": *[
    _type == "promotionItem"
    && coalesce(isActive, true) == true
    && (!defined(startAt) || startAt <= now())
    && (!defined(endAt) || endAt >= now())
  ] | order(isFeatured desc, coalesce(displayOrder, 999) asc, _updatedAt desc) {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    badge,
    badgeEn,
    summary,
    summaryEn,
    details,
    detailsEn,
    image{
      alt,
      ${imageFragment}
    },
    priceLabel,
    priceLabelEn,
    originalPrice,
    originalPriceEn,
    promoPrice,
    promoPriceEn,
    priceOptions[]{
      _key,
      label,
      labelEn,
      promoPrice,
      promoPriceEn,
      originalPrice,
      originalPriceEn
    },
    lineDestination,
    ctaText,
    ctaTextEn,
    ctaLink{
      ${linkFragment}
    },
    terms,
    termsEn,
    doctorNote,
    doctorNoteEn,
    displayOrder,
    isFeatured,
    startAt,
    endAt
  }
}`);

export const blogMegaMenuSectionsQuery = defineQuery(`
  *[_type == "settings" && _id in ["siteSettings", "drafts.siteSettings"]]
  | order(_updatedAt desc)[0]{
    blogMegaMenuSections[] {
      ${megaMenuSectionFragment}
    }
  }
`);

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    ${pageFragment}
  }
`);

export const getSitemapQuery = defineQuery(`
  *[
    (
      _type in [
        "homePage",
        "aboutPage",
        "aestheticTreatmentsPage",
        "pricingPage",
        "promotionsPage",
        "blogPage",
        "reviewsPage"
      ]
      || (_type == "page" && slug.current in ["contact"])
      || (_type == "post" && defined(slug.current))
      || (
        _type == "category"
        && defined(slug.current)
        && !(slug.current in ["uncategorized", "review", "reviews"])
      )
      || (
        _type == "reviewCategory"
        && defined(slug.current)
        && coalesce(isActive, true) == true
      )
      || (_type == "servicePage" && defined(slug.current))
      || (_type == "person" && defined(slug.current))
    )
    && coalesce(seo.noIndex, false) != true
  ]{
    "href": select(
      _type == "homePage" => "/",
      _type == "aboutPage" => "/about",
      _type == "aestheticTreatmentsPage" => "/services",
      _type == "pricingPage" => "/pricing",
      _type == "promotionsPage" => "/promotions",
      _type == "blogPage" => "/blog",
      _type == "reviewsPage" => "/reviews",
      _type == "page" && slug.current == "contact" => "/contact",
      _type == "post" => "/blog/" + slug.current,
      _type == "category" => "/category/" + slug.current,
      _type == "reviewCategory" => "/reviews/" + slug.current,
      _type == "servicePage" => "/services/" + slug.current,
      _type == "person" => "/author/" + slug.current,
      slug.current
    ),
    _updatedAt
  }
`);

export const servicePageQuery = defineQuery(`
  *[_type == "servicePage" && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heroHeadingTh,
    heroHeadingEn,
    heroDescriptionTh,
    heroDescriptionEn,
    heroImage{
      alt,
      ${imageFragment}
    },
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
    heroPrimaryCtaTextTh,
    heroPrimaryCtaTextEn,
    heroPrimaryCtaLink{
      ${linkFragment}
    },
    heroSecondaryCtaTextTh,
    heroSecondaryCtaTextEn,
    heroSecondaryCtaLink{
      ${linkFragment}
    },
    quickAnswerTitleTh,
    quickAnswerTitleEn,
    keyFactsItems[]{
      _key,
      textTh,
      textEn
    },
    whatIsHeadingTh,
    whatIsHeadingEn,
    whatIsEyebrowTh,
    whatIsEyebrowEn,
    whatIsSubtitleTh,
    whatIsSubtitleEn,
    whatIsBodyTh,
    whatIsBodyEn,
    whatIsBackgroundImage{
      alt,
      ${imageFragment}
    },
    whatIsBackgroundPositionX,
    whatIsBackgroundPositionY,
    whatIsSectionBackgroundImage{
      alt,
      ${imageFragment}
    },
    whatIsSectionBackgroundPositionX,
    whatIsSectionBackgroundPositionY,
    whatIsSuitableHeadingTh,
    whatIsSuitableHeadingEn,
    whatIsSuitableItems[]{
      _key,
      textTh,
      textEn
    },
    concernsHeadingTh,
    concernsHeadingEn,
    concernsEyebrowTh,
    concernsEyebrowEn,
    concernsSubtitleTh,
    concernsSubtitleEn,
    concernsItems[]{
      _key,
      textTh,
      textEn,
      descriptionTh,
      descriptionEn,
      image{
        alt,
        ${imageFragment}
      }
    },
    injectionAreasHeadingTh,
    injectionAreasHeadingEn,
    injectionAreasEyebrowTh,
    injectionAreasEyebrowEn,
    injectionAreasSubtitleTh,
    injectionAreasSubtitleEn,
    injectionAreasItems[]{
      _key,
      textTh,
      textEn,
      image{
        alt,
        ${imageFragment}
      },
      iconImage{
        alt,
        ${imageFragment}
      },
      startingPriceTh,
      startingPriceEn,
      startingPriceTextColor,
      link{
        ${linkFragment}
      }
    },
    highlightsHeadingTh,
    highlightsHeadingEn,
    highlightsItems[]{
      _key,
      textTh,
      textEn
    },
    brandsHeadingTh,
    brandsHeadingEn,
    brandsIntroTh,
    brandsIntroEn,
    brandsItems[]{
      _key,
      textTh,
      textEn,
      logoImage{
        alt,
        ${imageFragment}
      }
    },
    stepsHeadingTh,
    stepsHeadingEn,
    stepsItems[]{
      _key,
      textTh,
      textEn
    },
    aftercareHeadingTh,
    aftercareHeadingEn,
    aftercareItems[]{
      _key,
      textTh,
      textEn
    },
    whyDremaHeadingTh,
    whyDremaHeadingEn,
    whyDremaItems[]{
      _key,
      textTh,
      textEn
    },
    faqItems[]{
      _key,
      questionTh,
      questionEn,
      answerTh,
      answerEn
    },
    keyFactsBackgroundImage{
      alt,
      ${imageFragment}
    },
    keyFactsBackgroundPositionX,
    keyFactsBackgroundPositionY,
    definitionProblemsBackgroundImage{
      alt,
      ${imageFragment}
    },
    definitionProblemsBackgroundPositionX,
    definitionProblemsBackgroundPositionY,
    injectionAreasBackgroundImage{
      alt,
      ${imageFragment}
    },
    injectionAreasBackgroundPositionX,
    injectionAreasBackgroundPositionY,
    highlightsBrandsBackgroundImage{
      alt,
      ${imageFragment}
    },
    highlightsBrandsBackgroundPositionX,
    highlightsBrandsBackgroundPositionY,
    processAftercareBackgroundImage{
      alt,
      ${imageFragment}
    },
    processAftercareBackgroundPositionX,
    processAftercareBackgroundPositionY,
    suitableWhyBackgroundImage{
      alt,
      ${imageFragment}
    },
    suitableWhyBackgroundPositionX,
    suitableWhyBackgroundPositionY,
    faqBackgroundImage{
      alt,
      ${imageFragment}
    },
    faqBackgroundPositionX,
    faqBackgroundPositionY,
    relatedLinksBackgroundImage{
      alt,
      ${imageFragment}
    },
    relatedLinksBackgroundPositionX,
    relatedLinksBackgroundPositionY,
    citationSummaryTh,
    citationSummaryEn,
    seo
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    ${postFragment}
  }
`);

export const postsInSameCategoriesQuery = defineQuery(`
  *[
    _type == "post"
    && _id != $currentId
    && count(categories[@._ref in $categoryIds]) > 0
  ] | order(coalesce(date, _updatedAt) desc, _id desc) {
    ${postCardFragment}
  }
`);

export const categoryQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug] [0] {
    ${categoryFragment}
    "parentCategory": parentCategory->{
      _id,
      _type,
      title,
      "slug": slug.current
    },
    subtitleTh,
    subtitleEn,
    featuredSectionTitleTh,
    featuredSectionTitleEn,
    featuredItems[]->{
      _id,
      _type,
      title,
      titleEn,
      "slug": slug.current,
      description,
      descriptionTh,
      descriptionEn,
      "excerpt": coalesce(excerpt, description),
      excerptEn,
      "image": coalesce(
        coverImage {
          alt,
          ${imageFragment}
        },
        image {
          alt,
          ${imageFragment}
        }
      ),
      "categories": categories[]->{
        _id,
        _type,
        title,
        "slug": slug.current
      }
    },
    reasonHeadingTh,
    reasonHeadingEn,
    reasonPoints[] {
      _key,
      textTh,
      textEn
    },
    compareHeadingTh,
    compareHeadingEn,
    compareRows[] {
      _key,
      topicTh,
      topicEn,
      bestForTh,
      bestForEn,
      typeTh,
      typeEn
    },
    faqHeadingTh,
    faqHeadingEn,
    faqItems[] {
      _key,
      questionTh,
      questionEn,
      answerTh,
      answerEn
    }
  }
`);

export const categoryChildrenByParentSlugQuery = defineQuery(`
  *[_type == "category" && defined(parentCategory->slug.current) && parentCategory->slug.current == $parentSlug]
  | order(title asc) {
    ${categoryFragment}
  }
`);

export const personQuery = defineQuery(`
  *[_type == "person" && slug.current == $slug] [0] {
    ${personFragment}
  }
`);

export const postsByAuthorQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && author._ref == $personId] | order(date desc) [0..10] {
    ${postCardFragment}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
    && !(slug.current match "*/*")
  ][0..$limit].slug.current
`);

export const underEyeFillerPostNestedSlugs = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
    && slug.current match "filler/under-eye/*"
  ][0..$limit].slug.current
`);

export const categorySlugs = defineQuery(`
  *[_type == "category" && defined(slug.current)][0..$limit].slug.current
`);

export const categoriesForMenuQuery = defineQuery(`
  *[_type == "category" && defined(slug.current) && !defined(parentCategory) && slug.current != "uncategorized"]
  | order(title asc) {
    _id,
    title,
    description,
    "slug": slug.current,
    "coverImage": coalesce(
      coverImage{
        alt,
        ${imageFragment}
      },
      *[_type == "post" && references(^._id) && defined(image.asset)][0].image{
        alt,
        ${imageFragment}
      }
    ),
    "children": *[_type == "category" && defined(slug.current) && parentCategory._ref == ^._id]
      | order(title asc) {
        _id,
        title,
        "slug": slug.current
      }
  }
`);

export const personSlugs = defineQuery(`
  *[_type == "person" && defined(slug.current)][0..$limit].slug.current
`);

export const reviewCategorySlugs = defineQuery(`
  *[_type == "reviewCategory" && defined(slug.current) && coalesce(isActive, true) == true][0..$limit].slug.current
`);

export const reviewsMenuCategoriesQuery = defineQuery(`
  *[_type == "reviewCategory" && defined(slug.current) && coalesce(isActive, true) == true]
  | order(coalesce(order, 999) asc, title asc) {
    ${reviewCategoryFragment}
  }
`);

export const reviewsLandingQuery = defineQuery(`
  {
    "page": *[_type == "reviewsPage"][0]{
      _id,
      _type,
      name,
      heroEyebrowTh,
      heroEyebrowEn,
      heroHeadingTh,
      heroHeadingEn,
      heroDescriptionTh,
      heroDescriptionEn,
      heroBackgroundDesktop{
        alt,
        ${imageFragment}
      },
      heroBackgroundMobile{
        alt,
        ${imageFragment}
      },
      heroPrimaryCtaTextTh,
      heroPrimaryCtaTextEn,
      categoriesSectionBackgroundImage{
        alt,
        ${imageFragment}
      },
      referenceSectionBackgroundImage{
        alt,
        ${imageFragment}
      },
      featuredSectionBackgroundImage{
        alt,
        ${imageFragment}
      },
      seo
    },
    "categories": *[_type == "reviewCategory" && defined(slug.current) && coalesce(isActive, true) == true]
      | order(coalesce(order, 999) asc, title asc) {
        ${reviewCategoryFragment}
      },
    "featuredReviews": *[
      _type == "review"
      && (
        category._ref in *[
          _type == "reviewCategory" && defined(slug.current) && coalesce(isActive, true) == true
        ]._id
        || category._ref in *[
          _type == "reviewCategory" && defined(slug.current) && coalesce(isActive, true) == true
        ]{
          "draftId": "drafts." + _id
        }.draftId
      )
    ]
      | order(featured desc, coalesce(order, 999) asc, coalesce(publishedAt, _createdAt) desc) {
        ${reviewCardFragment}
      }
  }
`);

export const reviewCategoryBySlugQuery = defineQuery(`
  *[_type == "reviewCategory" && slug.current == $slug && coalesce(isActive, true) == true][0]{
    ${reviewCategoryFragment}
  }
`);

export const reviewsByCategorySlugQuery = defineQuery(`
  *[
    _type == "review"
    && (
      category._ref == *[
        _type == "reviewCategory"
        && slug.current == $categorySlug
        && coalesce(isActive, true) == true
      ][0]._id
      || category._ref == "drafts." + *[
        _type == "reviewCategory"
        && slug.current == $categorySlug
        && coalesce(isActive, true) == true
      ][0]._id
    )
  ] | order(featured desc, coalesce(order, 999) asc, coalesce(publishedAt, _createdAt) desc) {
    ${reviewCardFragment}
  }
`);

export const postsArchiveQuery = defineQuery(`
  {
    "allResults": *[
      _type == "post"
      &&
      (
        !defined( $filters.categorySlug ) ||
        references(*[_type == "category" && slug.current == $filters.categorySlug][0]._id) ||
        references(*[_type == "category" && references(*[_type == "category" && slug.current == $filters.categorySlug][0]._id)]._id)
      )
      &&
      (
        !defined( $filters.personSlug ) || references(*[_type == "person" && slug.current == $filters.personSlug]._id)
      )
      //
      // Add more filter here if needed
      //
      // The filter value should be passed as a property of the $filter parameter
      //
      // (
      //   !defined( $filters.anotherFilter ) || fieldname == $filters.anotherFilter)
      // )
    ] | order(_createdAt desc, _id desc)
  }
  {
    "total": count(allResults),
    "results": allResults[$from..$to] {
      ${postCardFragment}
    }
  }
`);
