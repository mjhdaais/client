/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReferer = /* GraphQL */ `
  query GetReferer($id: ID!) {
    getReferer(id: $id) {
      id
      code
      createdAt
      updatedAt
    }
  }
`;
export const listReferers = /* GraphQL */ `
  query ListReferers(
    $filter: ModelRefererFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReferers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const refererByCode = /* GraphQL */ `
  query RefererByCode(
    $code: String
    $sortDirection: ModelSortDirection
    $filter: ModelRefererFilterInput
    $limit: Int
    $nextToken: String
  ) {
    refererByCode(
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        code
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
