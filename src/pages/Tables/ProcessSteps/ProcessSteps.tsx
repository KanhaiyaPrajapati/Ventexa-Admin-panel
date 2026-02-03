// pages/ProcessSteps/ProcessSteps.tsx
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import ProcessStepsTableOne from "../../../components/tables/Process-Steps-Table/form/ProcessStepTableOne";

export default function ProcessSteps() {
  return (
    <>
      <PageMeta
        title="VenTexa Admin Panel - Process Steps"
        description="Manage your process steps with full CRUD operations"
      />
      <PageBreadcrumb pageTitle="Process Steps" />
      <div className="space-y-6">
        <ComponentCard title="Process Steps Table">
          <ProcessStepsTableOne />
        </ComponentCard>
      </div>
    </>
  );
}