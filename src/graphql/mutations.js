/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReferer = /* GraphQL */ `
  mutation CreateReferer(
    $input: CreateRefererInput!
    $condition: ModelRefererConditionInput
  ) {
    createReferer(input: $input, condition: $condition) {
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
export const updateReferer = /* GraphQL */ `
  mutation UpdateReferer(
    $input: UpdateRefererInput!
    $condition: ModelRefererConditionInput
  ) {
    updateReferer(input: $input, condition: $condition) {
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
export const deleteReferer = /* GraphQL */ `
  mutation DeleteReferer(
    $input: DeleteRefererInput!
    $condition: ModelRefererConditionInput
  ) {
    deleteReferer(input: $input, condition: $condition) {
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
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
