import React, { useEffect, useState } from "react";
import "./AddNews.css";

import useFetch from "../../hooks/useFetch";
import Form from "../../components/Forms/Form";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import InputFieldContainer from "../../components/Forms/InputFieldContainer";
import Label from "../../components/Forms/Label";
import Input from "../../components/Forms/Input";
import InputFile from "../../components/Forms/InputFile";
import Select from "../../components/Forms/Select";
import Textarea from "../../components/Forms/TextArea";
import { logInfo } from "../../../../server/src/util/logging";

const AddNews = () => {
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsCategory, setNewsCategory] = useState("");
  const [newsSource, setNewsSource] = useState("");
  const [newsImage, setNewsImage] = useState(null);

  const clearForm = () => {};

  const onSuccess = () => {
    clearForm();
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/news/add",
    onSuccess
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("newsImage", newsImage);
    data.append("newsTitle", newsTitle);
    data.append("newsContent", newsContent);
    data.append("newsCategory", newsCategory);
    data.append("newsSource", newsSource);

    performFetch({
      method: "POST",
      body: data,
    });

    performFetch({
      method: "POST",
      body: data,
    });
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  let statusComponent = null;
  if (error != null) {
    statusComponent = <Error>Error while trying to create user: {error}</Error>;
  } else if (isLoading) {
    statusComponent = <Spinner />;
  }

  return (
    <div className="news-page-container">
      <Form onSubmit={handleSubmit} title="Create News">
        <InputFieldContainer className="news-title-wrapper">
          <Label>News Title</Label>
          <Input
            name="newsTitle"
            value={newsTitle}
            minLength="10"
            maxLength="200"
            title="News Title"
            onChange={(value) => {
              setNewsTitle(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="news-content-wrapper">
          <Label>News Content</Label>
          <Textarea
            name="newsContent"
            value={newsContent}
            title="News Content"
            onChange={(value) => {
              setNewsContent(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="news-category-wrapper">
          <Label>News Category</Label>
          <Select
            value={newsCategory}
            title="News Category"
            onChange={(value) => setNewsCategory(value)}
            options={[
              { value: "refugees", text: "Refugees" },
              { value: "politics", text: "Politics" },
              { value: "finance", text: "Finance" },
              { value: "society", text: "Society" },
            ]}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="news-source-wrapper">
          <Label>News Source</Label>
          <Input
            name="newsSource"
            value={newsSource}
            title="News Title"
            onChange={(value) => {
              setNewsSource(value);
            }}
          />
        </InputFieldContainer>
        <InputFieldContainer className="news-image-wrapper">
          <Label for="newsImage">News Image</Label>
          <InputFile
            name="newsImage"
            accept="image/*"
            id="newsImage"
            onChange={(e) => {
              logInfo(e.target.value);
              setNewsImage(e.target.files[0]);
            }}
          />
        </InputFieldContainer>
        <Button className="btn-block" type="submit">
          Create News
        </Button>
      </Form>
      {statusComponent && statusComponent}
    </div>
  );
};

export default AddNews;
