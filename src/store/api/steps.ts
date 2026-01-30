import { useEffect, useState } from "react";
import axios from "axios";
import { Step } from "../../components/tables/ProcessSteps/ProcessStepsForm";

const API_URL = "https://69784290cd4fe130e3d84c74.mockapi.io/steps-api";


export default function useSteps() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSteps = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<Step[]>(API_URL);
     
      const converted = data.map(step => ({ ...step, id: String(step.id) }));
      setSteps(converted);
    } catch (error) {
      console.error("Failed to fetch steps:", error);
    } finally {
      setLoading(false);
    }
  };

  const addStep = async (step: Step) => {
    try {
      const { data } = await axios.post<Step>(API_URL, step, {
        headers: { "Content-Type": "application/json" },
      });
      setSteps(prev => [...prev, { ...data, id: String(data.id) }]);
    } catch (error) {
      console.error("Failed to add step:", error);
    }
  };

  const updateStep = async (step: Step) => {
    if (!step.id) return;
    try {
      const { data } = await axios.put<Step>(`${API_URL}/${step.id}`, step, {
        headers: { "Content-Type": "application/json" },
      });
      setSteps(prev => prev.map(s => (s.id === step.id ? { ...data, id: String(data.id) } : s)));
    } catch (error) {
      console.error("Failed to update step:", error);
    }
  };

  const deleteStep = async (id?: string) => {
    try {
      console.log("=======" ,  id)
      await axios.delete(`${API_URL}/${id}`);
      setSteps(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error("Failed to delete step:", error);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  return { steps, loading, addStep, updateStep, deleteStep };
}
