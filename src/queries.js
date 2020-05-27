import gql from "graphql-tag";

export const GET_NOTES = gql`
  {
    notes {
      id
      title
      content
    }
  }
`;
