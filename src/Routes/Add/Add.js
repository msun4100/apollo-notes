import React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import Editor from "../../Components/Editor";

const ADD_NOTE = gql`
  mutation createNote($title: String!, $content: String!) @client {
    createNote(title: $title, content: $content) {
      id
    }
  }
`;

export default ({ history }) => {
  const [createNoteMutation] = useMutation(ADD_NOTE);

  const onSave = async (title, content) => {
    if (title !== "" && content !== "") {
      try {
        await createNoteMutation({
          variables: {
            content,
            title,
          },
        });
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return <Editor onSave={onSave} />;
};
