
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import ContactLeadsTableOne from "../../../../src/components/tables/ContactLeads-Features-Table/form/ContactLeadsTableOne";

export default function ContactLeadsTables() {
  return (
    <>
      <PageMeta
        title="VenTexa Admin Panel"
        description="This is React.js Contact Leads Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Contact Leads" />
      <div className="space-y-6">
        <ComponentCard title="Contact Leads Table">
          <ContactLeadsTableOne />
        </ComponentCard>
      </div>
    </>
  );
}