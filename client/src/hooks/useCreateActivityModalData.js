import { useContext } from "react";
import { CreateActivityModalContext } from "../context/CreateActivityModalContext";

const useCreateActivityModalData = () => {
  return useContext(CreateActivityModalContext);
};

export default useCreateActivityModalData;
