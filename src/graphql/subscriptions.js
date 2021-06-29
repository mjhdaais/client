/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReferer = /* GraphQL */ `
  subscription OnCreateReferer {
    onCreateReferer {
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
export const onUpdateReferer = /* GraphQL */ `
  subscription OnUpdateReferer {
    onUpdateReferer {
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
export const onDeleteReferer = /* GraphQL */ `
  subscription OnDeleteReferer {
    onDeleteReferer {
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
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
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
