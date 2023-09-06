// pages/projects.tsx
import NewProjectForm from "@/components/project/NewProjectForm";
import React from "react";
import Layout from "../components/Layout";

const Projects: React.FC = () => {
  const userProjects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
    // Add more user projects as needed
  ];

  return (
    <Layout>
      <h2>Projects</h2>
      <NewProjectForm />
      <ul>
        {userProjects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default Projects;
