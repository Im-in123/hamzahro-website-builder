// components/project/ElementSidebar.tsx
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "@/styles/components/project/ElementSidebar.module.css";

const ElementSidebar: React.FC = () => {
  const elements = [
    { type: "div", label: "Div" },
    { type: "image", label: "Image" },
    { type: "link", label: "Link" },
    { type: "heading", label: "Heading" },
    // Add more elements as needed
  ];

  return (
    <div className={styles.elementSidebar}>
      {elements.map((element, index) => (
        <Draggable key={element.type} draggableId={element.type} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={styles.element}
            >
              {element.label}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default ElementSidebar;
