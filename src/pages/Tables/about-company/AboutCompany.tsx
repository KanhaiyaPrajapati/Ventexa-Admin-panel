import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import AboutCompanyTableOne from "../../../components/tables/Aboutcompany-Table/AboutompanyTableOne";

export default function AboutCompany() {
  return (
    <>
      <PageMeta
        title="VenTexa Admin Panel"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="About Company" />
      <div className="space-y-6">
        <ComponentCard title=" About Company Table">
            <AboutCompanyTableOne />
        </ComponentCard>
      </div>
    </>
  );
}


