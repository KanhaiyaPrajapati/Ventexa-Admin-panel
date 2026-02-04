import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import TestimonialTableOne from "../../../components/tables/Testimonials-Table/form/TestimonialTableOne";

export default function Testimonials() {
  return (
    <>
      <PageMeta
        title="VenTexa Admin Panel - Testimonials"
        description="Manage your testimonials with full CRUD operations"
      />
      <PageBreadcrumb pageTitle="Testimonials" />
      <div className="space-y-6">
        <ComponentCard title="Testimonials Table">
          <TestimonialTableOne />
        </ComponentCard>
      </div>
    </>
  );
}