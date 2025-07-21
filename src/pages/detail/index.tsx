import Header from "../../components/detail/header";
import Notice from "../../components/detail/notice";
import Tabs from "../../components/detail/tabs";
import AboutSection from "../../components/detail/about";

function Detail() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mt-12">
        <Header />
        <Tabs />
      </div>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 pt-6 space-y-6">
        <Notice />
        <AboutSection />
      </div>
    </div>
  );
}

export default Detail;
