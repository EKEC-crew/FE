import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useCompleteModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    if (searchParams.get("showCompleteModal") === "true") {
      setShowCompleteModal(true);
      // URL에서 파라미터 제거
      searchParams.delete("showCompleteModal");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleCloseModal = () => {
    setShowCompleteModal(false);
  };

  return {
    showCompleteModal,
    handleCloseModal,
  };
};
