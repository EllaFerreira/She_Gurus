import { useState } from "react";
import { Form } from "react-bootstrap";
import { uploadFile } from "react-s3";

const S3_BUCKET = process.env.REACT_APP_HEROKU_AWS_BUCKET;
const REGION = process.env.REACT_APP_HEROKU_AWS_DEFAULT_REGION;
const ACCESS_KEY = process.env.REACT_APP_HEROKU_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_HEROKU_AWS_SECRET_ACCESS_KEY;

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

export default function PhotoHolder({ handleAWS }) {
  const [selectphoto, setSelectPhoto] = useState("");

  const handleFileInput = (event) => {
    const newPhoto = event.target.files[0];
    setSelectPhoto(newPhoto);

    if (newPhoto) {
      uploadPhoto(newPhoto, config)
        .then((data) => {
          if (data) {
            handleAWS({ photo: data.location });
          }
        }) //returns obj with aws bucket, key(image name) and location (link for image in cloud)
        .catch((err) => console.error(err));
    }
  };
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload your profile image:</Form.Label>
        <Form.Control type="photo" name="picture" onChange={handleFileInput} />
      </Form.Group>
    </>
  );
}
