import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";
import Button from "../components/generic/Button";
import Input from "../components/generic/Input";
import Timer from "../components/generic/Timer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Timer component "
          component={<Timer time="10000000" />}
          propDocs={[
            {
              prop: "time",
              description:
                "Time in MS, parsed by the component into HH:MM:SS format",
              type: "string",
              defaultValue: "none",
            },
          ]}
        />
        <DocumentComponent
          title="Button component "
          component={<Button name="Example" />}
          propDocs={[
            {
              prop: "name",
              description: "Changes the name of the button",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "method",
              description: "Passes the method triggered by the button click",
              type: "function",
              defaultValue: "none",
            },
          ]}
        />

        <DocumentComponent
          title="Input component "
          component={<Input />}
          propDocs={[
            {
              prop: "name",
              description: "Changes the name of the input",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "value",
              description: "Changes the value stored by the input",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "onChange",
              description: "The method triggered by an update to the input",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "disabled",
              description: "Changes the disabled status of the input field",
              type: "boolean",
              defaultValue: "false",
            },
          ]}
        />
        <DocumentComponent
          title="Loading spinner "
          component={<Loading />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            },
          ]}
        />
      </div>
    </Container>
  );
};

export default Documentation;
