// components/Workspace.tsx
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styles from "@/styles/components/project/Workspace.module.css";

const Workspace = ({ elements }) => {
  return (
    <Droppable droppableId="workspace">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ flex: 1, minHeight: "400px", border: "1px dashed #ccc" }}
        >
          <h2>Workspace</h2>
          {elements.map((element, index) => (
            <div key={element.id}>{element.content}</div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Workspace;
