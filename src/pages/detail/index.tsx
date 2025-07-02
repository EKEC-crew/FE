import React from "react";
import Header from "../../components/detail/header";
import Notice from "../../components/detail/notice";
import Tabs from "../../components/detail/tabs";
import AboutSection from "../../components/detail/about";
function Detail() {
  return (
    <div className="min-h-screen space-y-4 bg-gray-300">
      <div className="max-w-screen-lg mx-auto space-y-4 pt-8">
        <Header />
        <Tabs />
        <Notice />
        <AboutSection />
      </div>
    </div>
  );
}

export default Detail;
