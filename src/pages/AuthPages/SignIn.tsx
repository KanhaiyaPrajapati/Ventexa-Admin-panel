import PageMeta from "../../components/common/PageMeta";
// import SignInForm from "../../components/auth/SignInForm";
import VentexaAuth from "./AuthPageLayout";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="VenTexa Admin Panel"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <VentexaAuth />
    </>
  );
}
