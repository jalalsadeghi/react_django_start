import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Files = () => {
  const axiosPrivate = useAxiosPrivate();

  const directUploadStart = ({ fileName, fileType }) => {
    return axiosPrivate.post(
      "/api/files/upload/direct/start/",
      { file_name: fileName, file_type: fileType }
      // getConfig()
    );
  };

  const directUploadDo = ({ data, file }) => {
    const postData = new FormData();

    for (const key in data?.fields) {
      postData.append(key, data.fields[key]);
    }

    postData.append("file", file);

    console.log("file: ", file.name);

    return axiosPrivate.post(
      data.url,
      postData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
      //   .post(data.url, { file: file.name })
      //   .then(() => Promise.resolve({ fileId: data.id }));
    );
  };

  const directUploadFinish = ({ data }) => {
    return axiosPrivate.post(
      "/api/files/upload/direct/finish/",
      { file_id: data.id }
      // getConfig()
    );
  };

  const [message, setMessage] = useState();

  const onInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      directUploadStart({
        fileName: file.name,
        fileType: file.type,
      })
        .then((response) =>
          directUploadDo({ data: response.data, file })
            .then(() =>
              directUploadFinish(
                { data: response.data },
                setMessage("directUploadFinish!")
              )
            )
            .then(() => {
              setMessage("File upload completed!");
            })
        )
        .catch((error) => {
          setMessage("File upload failed!");
        });
    }
  };

  return (
    <div>
      <h1>Direct upload</h1>
      <div>Select files to upload:</div>

      <input id="input" type="file" onChange={onInputChange} />

      <div>{message}</div>
    </div>
  );
};

export default Files;
