import React, { useState } from "react";
import PortpolioPresenter from "./PortpolioPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { DEATIL_PORTPOLIO, MODIFY_PORTPOLIO } from "./PortpolioQueries";
import { useInput } from "rooks";

const PortpolioContainer = ({
  match: {
    params: { portpolioId }
  },
  logged
}) => {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const title = useInput(titleValue);
  const description = useInput(descriptionValue);
  const tag = useInput("");

  const { data, loading } = useQuery(DEATIL_PORTPOLIO, {
    variables: { id: portpolioId },
    skip: !portpolioId
  });
  const [modifyPortpolioMutation] = useMutation(MODIFY_PORTPOLIO, {
    variables: {
      id: portpolioId,
      title: title.value,
      description: description.value
    }
  });

  const handlePortpolioModify = async () => {
    const {
      data: { modifyPortpolio }
    } = await modifyPortpolioMutation();
    if (modifyPortpolio) {
      window.location.reload();
    }
  };

  const handlePortpolioUpload = () => {
    console.log("upload");
  };

  return (
    <PortpolioPresenter
      data={data}
      loading={loading}
      logged={logged}
      title={title}
      description={description}
      tag={tag}
      setTitleValue={setTitleValue}
      setDescriptionValue={setDescriptionValue}
      handlePortpolioModify={handlePortpolioModify}
      handlePortpolioUpload={handlePortpolioUpload}
    />
  );
};

export default PortpolioContainer;
