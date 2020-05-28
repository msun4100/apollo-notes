import React from "react";
import { GET_NOTE } from "../../queries";
import Editor from "../../Components/Editor";
import Loader from "../../Components/Loader";
import { useQuery, useMutation } from "react-apollo";
import styled from "styled-components";
import gql from "graphql-tag";

export const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) @client {
    editNote(id: $id, title: $title, content: $content) {
      id
    }
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
`;

export default ({
  match: {
    params: { id },
  },
  history: { push },
}) => {
  const { loading, data } = useQuery(GET_NOTE, {
    variables: {
      id,
    },
  });

  const [editNoteMutation] = useMutation(EDIT_NOTE);

  const onSave = async (title, content, id) => {
    if (title !== "" && content !== "" && id) {
      console.log("update note");
      const updatedId = await editNoteMutation({
        variables: {
          id,
          title,
          content,
        },
      });
      if (updatedId) {
        console.log("EDIT_NOTE Success");
        push("/note/" + id);
      } else {
        console.log("EDIT_NOTE Failure");
      }
    }
  };

  if (loading === true) {
    return (
      <Wrapper>
        <Loader size={72} />
      </Wrapper>
    );
  } else if (!loading && data && data.note) {
    return data?.note ? (
      <Editor
        title={data.note.title}
        content={data.note.content}
        id={data.note.id}
        onSave={onSave}
      />
    ) : null;
  } else {
    return null;
  }
};
