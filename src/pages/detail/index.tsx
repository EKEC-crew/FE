import Header from "../../components/detail/header";
import Notice from "../../components/detail/notice";
import Tabs from "../../components/detail/tabs";
import AboutSection from "../../components/detail/about";

function Detail() {
  return (
    <div className = "bg-gray-100">
      <div className="py-6 space-y-6 pt-12"> 
      <div>
      <Header />
      <Tabs />
      </div>
      <div className="px-6 py-6 space-y-3 pt-0"> 
      <Notice />
      <div className = "pt-3">
      <AboutSection />
      </div>
      </div>
    </div>
    </div>
  );
}

export default Detail;
