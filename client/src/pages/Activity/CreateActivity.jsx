import React, { useState, useEffect } from "react";
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
import TextAreaInput from "../../components/Forms/TextAreaInput";
import DateTime from "../../components/Forms/DateTime";
import Check from "../../components/Check/Check";
import { useLocation } from "react-router-dom";
import "./CreateActivity.css";

const CreateActivity = () => {
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [startAt, setStartAt] = useState(null);
  const [endAt, setEndAt] = useState(null);
  const [description, setDescription] = useState(null);
  const [maxPeople, setMaxPeople] = useState(null);
  const [image, setImage] = useState(null);
  const [activityData, setActivityData] = useState(null);

  const location = useLocation();
  const userId = location.state?.userId;

  const clearForm = () => {
    setTitle(null);
    setCategory(null);
    setStartAt(null);
    setEndAt(null);
    setDescription(null);
    setMaxPeople(null);
    setImage(null);
    setActivityData(null);
  };

  const onSuccess = (response) => {
    setActivityData(response.result);
    clearForm();
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/activitiyes/create",
    onSuccess
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", image);
    data.append("title", title);
    data.append("category", category);
    data.append("createdBy", userId);
    data.append("startAt", startAt);
    data.append("endAt", endAt);
    data.append("description", description);
    data.append("maxPeople", maxPeople);

    performFetch({
      method: "POST",
      credentials: "include",
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
    <div className="create-activity-page-container">
      <Form onSubmit={handleSubmit} title="Create Activity">
        <InputFieldContainer className="activity-title-wrapper">
          <Label>Activity Title</Label>
          <Input
            name="activityTitle"
            value={title}
            title="Activity Title"
            onChange={(value) => {
              setTitle(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-category-wrapper">
          <Label>Activity Category</Label>
          <Select
            value={category}
            title="Activity Category"
            onChange={(value) => setCategory(value)}
            options={[
              { value: "all", text: "Choose a category" },
              { value: "sport", text: "Sport" },
              { value: "language", text: "Language" },
              { value: "city tour", text: "City Tour" },
              { value: "museum", text: "Museum" },
              { value: "food", text: "Food" },
              { value: "training", text: "Training" },
              { value: "music", text: "Music" },
              { value: "volunteer work", text: "Volunteer Work" },
            ]}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-start-wrapper">
          <Label>Activity Start At:</Label>
          <DateTime
            name="activityStart"
            value={startAt}
            title="Activity Start"
            onChange={(value) => {
              setStartAt([value]);
            }}
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-end-wrapper">
          <Label>Activity End At:</Label>
          <DateTime
            name="activityEnd"
            value={endAt}
            title="Activity End"
            onChange={(value) => {
              setEndAt([value]);
            }}
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-description-wrapper">
          <Label>Activity Description</Label>
          <TextAreaInput
            name="activityDescription"
            value={description}
            title="Activity Description"
            onChange={(value) => {
              setDescription(value);
            }}
            required
          />
        </InputFieldContainer>

        <InputFieldContainer className="activity-max-people-wrapper">
          <Label>Activity Max People</Label>
          <Input
            name="activityMaxPeople"
            value={maxPeople}
            title="Max People"
            onChange={(value) => {
              setMaxPeople([value]);
            }}
            type="number"
          />
        </InputFieldContainer>

        <InputFieldContainer className="news-image-wrapper">
          <Label for="newsImage">News Image</Label>
          <InputFile
            name="newsImage"
            accept="image/*"
            id="newsImage"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </InputFieldContainer>
        <Button className="btn-block" type="submit">
          Create Activity
        </Button>
      </Form>
      {statusComponent && statusComponent}
      {activityData && (
        <Check>
          {" "}
          <div className="created-news-details-wrapper">
            <h2>Activity Created</h2>
            <h4>{activityData.title}</h4>
            {/* <p>{newsData.content}</p>
            <p>{newsData.image}</p>
            <p>{newsData.sources[0]}</p>
            <p>{newsData.category}</p> */}
          </div>
        </Check>
      )}
    </div>
  );
};

export default CreateActivity;
