import { useLocation } from "react-router-dom";
function Payments() {
  const {
    state: { apiResult, userInput },
  } = useLocation();
  return <div>Payments</div>;
}

export default Payments;
