import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import FaqsTable from "../../../../src/components/tables/Faq-Table/form/FaqsTableOne";

export default function FaqsTables() {
  return (
    <>
      <PageMeta
        title="VenTexa Admin Panel"
        description="This is React.js FAQ Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="FAQs" />
      <div className="space-y-6">
        <ComponentCard title="FAQs Table">
          <FaqsTable />
        </ComponentCard>
      </div>
    </>
  );
}