import { useRemovePointsMutation } from "@/redux/api/userApi.ts";
import { useEffect, useRef } from "react";

const usePointDeduction = (userId: string, points: number) => {
  const [removePoints] = useRemovePointsMutation();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Start the interval when the component is mounted
    intervalRef.current = setInterval(() => {
      removePoints({ id: userId, points: points });
      console.log(10, "Points deducted successfully>>", userId);
    }, 60000); // 60000 ms = 1 minute

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [userId, removePoints, points]);
};

export default usePointDeduction;
