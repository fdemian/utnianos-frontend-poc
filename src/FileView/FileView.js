import React from 'react';
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";

// get Class material file.
export const GET_FILE = gql`
  query GetContributions {
    classMaterials {
      id
      name
      filePath
      contribTypes
      course {
        id
        name
      }
    }
  }
`;

const FileView = ({}) => {
  const params = useParams();
  const { id } = params;
  
  return (
  <div>
    {id}
  </div>
  );
}

export default FileView;
