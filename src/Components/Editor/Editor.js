import React, { useState } from "react";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";

const TitleInput = styled(TextareaAutosize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  height: 100%;
  &::placeholder {
    font-weight: 600;
    font-size: inherit;
  }
`;

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  margin-top: 15px;
  &::placeholder {
    font-size: inherit;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button``;

const Editor = ({ id, title, content, onSave }) => {
  const [titleS, setTitle] = useState(title || "");
  const [contentS, setContent] = useState(content || "");
  const [idS, setId] = useState(id || null);

  const _onInputChange = (event) => {
    const {
      target: { value, name },
    } = event;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "content":
        setContent(value);
        break;
      default:
        break;
    }
  };
  const _onSave = () => {
    onSave(titleS, contentS, idS);
  };
  return (
    <>
      <TitleContainer>
        <TitleInput
          value={titleS}
          onChange={_onInputChange}
          placeholder={"Untitled..."}
          name={"title"}
        />
        <Button onClick={_onSave}>Save</Button>
      </TitleContainer>
      <ContentPreview>
        <ContentInput
          value={contentS}
          onChange={_onInputChange}
          placeholder={"# This supports markdown!"}
          name={"content"}
        />
        <MarkdownRenderer markdown={contentS} className={"markdown"} />
      </ContentPreview>
    </>
  );
};

export default Editor;
