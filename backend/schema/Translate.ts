export const TranslateType = `
  type Translate {
    id: String!
    PL: String!
    EN: String!
    GER: String!
    RU: String!
    ES: String!
    created_at: String
    updated_at: String
  }

  input TranslateInput{
    id: String
    PL: String
    EN: String
    GER: String
    RU: String
    ES: String
  }
`;
