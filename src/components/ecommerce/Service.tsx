import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServiceFeatures } from "../../store/api/service-features-api";
import { ServiceFeature } from "../../store/types/types";
import Button from "../ui/button/Button";

const ServiceFeaturesTable: React.FC = () => {
  const [features, setFeatures] = useState<ServiceFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFeatures = async () => {
    try {
      const data = await getAllServiceFeatures();
      setFeatures(data);
    } catch (error) {
      console.error("Failed to fetch features", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const limitedFeatures = features.slice(0, 5);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="h-32 animate-pulse bg-gray-100 dark:bg-white/5 rounded-xl" />
        <div className="h-32 animate-pulse bg-black/20 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-6xl mx-auto">
      {/* LEFT SIDE → TABLE */}
      <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111827] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Service Features Table
          </h2>
          <Button
            variant="outline"
            className="
              text-xs h-8 gap-1
              bg-white text-black
              dark:bg-black dark:text-white
              border border-gray-300 dark:border-white/10
              hover:bg-gray-100 dark:hover:bg-white/10
              transition-colors duration-300
            "
            onClick={() => navigate("/service-features")}
          >
            View More
          </Button>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-white/5">
          {limitedFeatures.length > 0 ? (
            limitedFeatures.map((feature) => (
              <div
                key={feature.id}
                className="px-6 py-4 text-gray-800 dark:text-white text-sm font-medium"
              >
                {feature.feature_title}
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-400 text-xs">
              No features available
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE → BLACK PANEL */}
      <div
        className="
  rounded-xl p-6 shadow-sm flex items-center justify-center
  bg-white text-black
  dark:bg-[#111827] dark:text-white
"
      >
        <span className="text-sm opacity-70">Right Side Table</span>
      </div>
    </div>
  );
};

export default ServiceFeaturesTable;
