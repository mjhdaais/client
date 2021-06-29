/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReferer = /* GraphQL */ `
  query GetReferer($id: ID!) {
    getReferer(id: $id) {
      id
      code
      referents {
        items {
          id
          referalCode
          accountNumber
          accountName
          bankName
          phoneNumber
          status
          rule
          contribution
          referalBonus
          createdAt
          updatedAt
        }
        nextToken
      }
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
        referents {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      referer {
        id
        code
        referents {
          nextToken
        }
        createdAt
        updatedAt
      }
      referalCode
      accountNumber
      accountName
      bankName
      phoneNumber
      status
      rule
      contribution
      referalBonus
      createdAt
      updatedAt
    }
  }
`;
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        referer {
          id
          code
          createdAt
          updatedAt
        }
        referalCode
        accountNumber
        accountName
        bankName
        phoneNumber
        status
        rule
        contribution
        referalBonus
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
        referents {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const clientByReferalCode = /* GraphQL */ `
  query ClientByReferalCode(
    $referalCode: String
    $sortDirection: ModelSortDirection
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    clientByReferalCode(
      referalCode: $referalCode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        referer {
          id
          code
          createdAt
          updatedAt
        }
        referalCode
        accountNumber
        accountName
        bankName
        phoneNumber
        status
        rule
        contribution
        referalBonus
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
