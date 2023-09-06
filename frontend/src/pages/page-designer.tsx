// pages/page-designer.tsx
import PageDesigner from "@/components/project/PageDesigner";
import React from "react";
import Layout from "../components/Layout";

const PageDesignerPage: React.FC = () => {
  return (
    <Layout>
      <h2>Page Designer</h2>

      <PageDesigner />
    </Layout>
  );
};

export default PageDesignerPage;
