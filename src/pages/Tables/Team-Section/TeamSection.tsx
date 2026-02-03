import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import LeadershipTableOne from "../../../components/tables/Leadership-Section/LeadershipTableOne";

export default function TeamSection() {
  return (
    <>
      <PageMeta
        title="VenTexa Admin Panel"
        description="Leadership / Team Members management dashboard"
      />

      <PageBreadcrumb pageTitle="Team Section" />

      <div className="space-y-6">
        <ComponentCard title="Leadership / Team Table">
          <LeadershipTableOne />
        </ComponentCard>
      </div>
    </>
  );
}

