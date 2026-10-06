import { CogIcon, DocumentIcon, HomeIcon } from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Home')
        .child(S.document().schemaType('homePage').documentId('homePage'))
        .icon(HomeIcon),
      S.listItem()
        .title('Services')
        .child(
          S.list()
            .title('Services')
            .items([
              S.listItem()
                .title('Services Landing Page')
                .child(
                  S.document()
                    .schemaType('aestheticTreatmentsPage')
                    .documentId('aestheticTreatmentsPage')
                )
                .icon(DocumentIcon),
              S.listItem()
                .title('Service Pages')
                .child(S.documentTypeList('servicePage').title('Service Pages'))
                .icon(DocumentIcon),
            ])
        )
        .icon(DocumentIcon),
      S.listItem()
        .title('Pricing')
        .child(S.document().schemaType('pricingPage').documentId('pricingPage'))
        .icon(DocumentIcon),
      S.listItem()
        .title('Reviews')
        .child(
          S.list()
            .title('Reviews')
            .items([
              S.listItem()
                .title('Reviews Page')
                .child(
                  S.document()
                    .schemaType('reviewsPage')
                    .documentId('reviewsPage')
                )
                .icon(DocumentIcon),
              S.documentTypeListItem('reviewCategory').title(
                'Review Categories'
              ),
              S.listItem()
                .title('Review Items')
                .child(
                  S.list()
                    .title('Review Items')
                    .items([
                      S.listItem()
                        .title('By Review Category')
                        .child(
                          S.documentTypeList('reviewCategory')
                            .title('Choose Review Category')
                            .filter(
                              '_type == "reviewCategory" && defined(slug.current) && coalesce(isActive, true) == true'
                            )
                            .defaultOrdering([
                              { field: 'order', direction: 'asc' },
                              { field: 'title', direction: 'asc' },
                            ])
                            .child((reviewCategoryId) =>
                              S.documentTypeList('review')
                                .title('Review Items')
                                .filter(
                                  '_type == "review" && category._ref == $reviewCategoryId'
                                )
                                .params({ reviewCategoryId })
                                .defaultOrdering([
                                  { field: 'order', direction: 'asc' },
                                  { field: 'publishedAt', direction: 'desc' },
                                  { field: 'title', direction: 'asc' },
                                ])
                            )
                        )
                        .icon(DocumentIcon),
                      S.documentTypeListItem('review').title(
                        'All Review Items'
                      ),
                    ])
                )
                .icon(DocumentIcon),
            ])
        )
        .icon(DocumentIcon),
      S.listItem()
        .title('Promotions')
        .child(
          S.list()
            .title('Promotions')
            .items([
              S.listItem()
                .title('Promotions Page')
                .child(
                  S.document()
                    .schemaType('promotionsPage')
                    .documentId('promotionsPage')
                )
                .icon(DocumentIcon),
              S.documentTypeListItem('promotionItem').title('Promotion Items'),
            ])
        )
        .icon(DocumentIcon),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Blog Landing Page')
                .child(S.document().schemaType('blogPage').documentId('blogPage'))
                .icon(DocumentIcon),
              S.listItem()
                .title('Blog Pages')
                .child(
                  S.list()
                    .title('Blog Pages')
                    .items([
                      S.listItem()
                        .title('By Main Category')
                        .child(
                          S.documentTypeList('category')
                            .title('Choose Main Category')
                            .filter(
                              '_type == "category" && !defined(parentCategory)'
                            )
                            .defaultOrdering([
                              { field: 'title', direction: 'asc' },
                            ])
                            .child((parentCategoryId) =>
                              S.list()
                                .title('Blog Pages')
                                .items([
                                  S.listItem()
                                    .title('All in This Main Category')
                                    .child(
                                      S.documentTypeList('post')
                                        .title('All Blog Pages')
                                        .filter(
                                          '_type == "post" && (categories[0]._ref == $parentCategoryId || categories[0]->parentCategory._ref == $parentCategoryId)'
                                        )
                                        .params({ parentCategoryId })
                                        .defaultOrdering([
                                          { field: 'date', direction: 'desc' },
                                          { field: 'title', direction: 'asc' },
                                        ])
                                    )
                                    .icon(DocumentIcon),
                                  S.listItem()
                                    .title('By Subcategory')
                                    .child(
                                      S.documentTypeList('category')
                                        .title('Choose Subcategory')
                                        .filter(
                                          '_type == "category" && parentCategory._ref == $parentCategoryId'
                                        )
                                        .params({ parentCategoryId })
                                        .defaultOrdering([
                                          { field: 'title', direction: 'asc' },
                                        ])
                                        .child((categoryId) =>
                                          S.documentTypeList('post')
                                            .title('Blog Pages')
                                            .filter(
                                              '_type == "post" && categories[0]._ref == $categoryId'
                                            )
                                            .params({ categoryId })
                                            .defaultOrdering([
                                              {
                                                field: 'date',
                                                direction: 'desc',
                                              },
                                              {
                                                field: 'title',
                                                direction: 'asc',
                                              },
                                            ])
                                        )
                                    )
                                    .icon(DocumentIcon),
                                ])
                            )
                        )
                        .icon(DocumentIcon),
                      S.listItem()
                        .title('By Primary Category')
                        .child(
                          S.documentTypeList('category')
                            .title('Choose Primary Category')
                            .filter(
                              '_type == "category" && defined(slug.current)'
                            )
                            .defaultOrdering([
                              { field: 'title', direction: 'asc' },
                            ])
                            .child((categoryId) =>
                              S.documentTypeList('post')
                                .title('Blog Pages')
                                .filter(
                                  '_type == "post" && categories[0]._ref == $categoryId'
                                )
                                .params({ categoryId })
                                .defaultOrdering([
                                  { field: 'date', direction: 'desc' },
                                  { field: 'title', direction: 'asc' },
                                ])
                            )
                        )
                        .icon(DocumentIcon),
                      S.listItem()
                        .title('Uncategorized')
                        .child(
                          S.documentTypeList('post')
                            .title('Uncategorized Blog Pages')
                            .filter(
                              '_type == "post" && (!defined(categories) || count(categories) == 0)'
                            )
                            .defaultOrdering([
                              { field: 'date', direction: 'desc' },
                              { field: 'title', direction: 'asc' },
                            ])
                        )
                        .icon(DocumentIcon),
                      S.documentTypeListItem('post').title('All Blog Pages'),
                    ])
                )
                .icon(DocumentIcon),
              S.listItem()
                .title('Categories')
                .child(
                  S.list()
                    .title('Categories')
                    .items([
                      S.listItem()
                        .title('Main Categories')
                        .child(
                          S.documentTypeList('category')
                            .title('Main Categories')
                            .filter(
                              '_type == "category" && !defined(parentCategory)'
                            )
                            .defaultOrdering([
                              { field: 'title', direction: 'asc' },
                            ])
                        )
                        .icon(DocumentIcon),
                      S.listItem()
                        .title('Subcategories')
                        .child(
                          S.documentTypeList('category')
                            .title('Subcategories')
                            .filter(
                              '_type == "category" && defined(parentCategory)'
                            )
                            .defaultOrdering([
                              { field: 'title', direction: 'asc' },
                            ])
                        )
                        .icon(DocumentIcon),
                      S.listItem()
                        .title('Subcategories by Main Category')
                        .child(
                          S.documentTypeList('category')
                            .title('Choose Main Category')
                            .filter(
                              '_type == "category" && !defined(parentCategory)'
                            )
                            .defaultOrdering([
                              { field: 'title', direction: 'asc' },
                            ])
                            .child((parentCategoryId) =>
                              S.documentTypeList('category')
                                .title('Subcategories')
                                .filter(
                                  '_type == "category" && parentCategory._ref == $parentCategoryId'
                                )
                                .params({ parentCategoryId })
                                .defaultOrdering([
                                  { field: 'title', direction: 'asc' },
                                ])
                            )
                        )
                        .icon(DocumentIcon),
                      S.documentTypeListItem('category').title(
                        'All Categories'
                      ),
                    ])
                )
                .icon(DocumentIcon),
            ])
        )
        .icon(DocumentIcon),
      S.listItem()
        .title('About')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage'))
        .icon(DocumentIcon),
      S.listItem()
        .title('Contact')
        .child(
          S.documentTypeList('page')
            .title('Contact Page')
            .filter('_type == "page" && slug.current == "contact"')
        )
        .icon(DocumentIcon),
      S.listItem()
        .title('Other Pages')
        .child(
          S.documentTypeList('page')
            .title('Other Pages')
            .filter('_type == "page" && slug.current != "contact"')
        )
        .icon(DocumentIcon),
      // Filter out "AI Assist Context" and content already placed above.
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId();
        return typeof id !== 'undefined'
          ? ![
              'settings',
              'homePage',
              'aboutPage',
              'assist.instruction.context',
              'blogPage',
              'aestheticTreatmentsPage',
              'pricingPage',
              'promotionsPage',
              'reviewsPage',
              'promotionItem',
              'reviewCategory',
              'review',
              'servicePage',
              'category',
              'post',
              'page',
            ].includes(id)
          : false;
      }),
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ]);
