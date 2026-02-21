import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Building2, MapPin, ArrowRight, Briefcase } from "lucide-react";
import { getAllServiceFeatures } from "../../store/api/service-features-api";
import { getAllcompanies, AboutCompany } from "../../store/api/Aboutcompany-api";
import { ServiceFeature } from "../../store/types/types";
import Loader from "../ui/Loader/Loader";

const ServiceFeaturesTable: React.FC = () => {
  const [features, setFeatures] = useState<ServiceFeature[]>([]);
  const [companies, setCompanies] = useState<AboutCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [featuresData, companiesData] = await Promise.all([
        getAllServiceFeatures(),
        getAllcompanies(),
      ]);
      setFeatures(featuresData);
      setCompanies(Array.isArray(companiesData) ? companiesData : []);
    } catch (error) {
      console.error("Data Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-80"><Loader /></div>;

  const containerStyle = "grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 max-w-7xl mx-auto px-4";
  const cardBase = "relative group overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F172A] shadow-lg shadow-gray-200/50 dark:shadow-none transition-all duration-300 hover:shadow-xl";
  const headerStyle = "flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]";

  return (
    <div className={containerStyle}>
      
      <div className={cardBase}>
        <div className={headerStyle}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
              <Sparkles size={20} />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Service Features</h2>
          </div>
          <button 
            onClick={() => navigate("/service-features")}
            className="group flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Manage <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="p-2 divide-y divide-gray-50 dark:divide-white/5">
          {features.slice(0, 5).map((feature) => (
            <div key={feature.id} className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-white/[0.03] rounded-xl transition-colors">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                <Briefcase size={14} />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 line-clamp-1">
                {feature.feature_title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={cardBase}>
        <div className={headerStyle}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400">
              <Building2 size={20} />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Corporate Profiles</h2>
          </div>
          <button 
            onClick={() => navigate("/about-company")}
            className="group flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="p-2 divide-y divide-gray-50 dark:divide-white/5">
          {companies.slice(0, 5).map((company) => (
            <div key={company.id || company._id} className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-white/[0.03] rounded-xl transition-colors">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800 dark:text-white line-clamp-1">
                  {company.headquarters || "Global Headquarters"}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                  <MapPin size={10} />
                  <span>Established {company.founded_year || "N/A"}</span>
                </div>
              </div>
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                Active
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ServiceFeaturesTable;