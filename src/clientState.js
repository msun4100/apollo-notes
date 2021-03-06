import { NOTE_FRAGMENT } from "./fragments";
import { GET_NOTES } from "./queries";
import { saveNotes, restoreNotes } from "./offline";

export const defaults = {
  // notes: [
  // {
  //   __typename: "Note",
  //   id: 1,
  //   title: "First node Title",
  //   content: "- content here",
  // },
  // ],
  notes: restoreNotes(),
};
export const typeDefs = [
  `
  schema {
    query: Query
    mutation: Mutation
  }
  
  # the schema allows the following query:
  type Query {
    notes: [Note]!
    note(id: Int!): Note
  }

  # this schema allows the following mutation:
  type Mutation {
    createNote(title: String!, content: String!): Note
    editNote(id: Int!, title: String!, content:String): Note
  }
  type Note {
    id: Int!
    title: String!
    content: String!
  }
    `,
];

export const resolvers = {
  Query: {
    note: (_, variables, { cache, getCacheKey }) => {
      console.log(variables);
      // cache에서 정보가져오기
      // const id = getCacheKey({ __typename: "Note", id: variables.id, });
      const id = cache.config.dataIdFromObject({
        __typename: "Note",
        id: variables.id,
      });
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id });
      return note;
    },
  },
  Mutation: {
    createNote: (_, variables, { cache }) => {
      const { notes } = cache.readQuery({ query: GET_NOTES });
      const { title, content } = variables;
      const newNote = {
        __typename: "Note",
        title: title,
        content: content,
        id: notes.length + 1,
      };
      cache.writeData({
        data: {
          notes: [newNote, ...notes],
        },
      });
      saveNotes(cache);
      return newNote;
    },
    editNote: (_, { id, title, content }, { cache }) => {
      const noteId = cache.config.dataIdFromObject({
        __typename: "Note",
        id,
      });
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });
      const updatedNote = {
        ...note,
        title,
        content,
      };
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updatedNote,
      });
      saveNotes(cache);
      return updatedNote;
    },
  },
};
