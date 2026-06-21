import LeadsScreen from "../src/screens/LeadsScreen";
import { LeadsProvider } from "../src/context/LeadsContext";

export default function Index() {
  return (
    <LeadsProvider>
      <LeadsScreen />
    </LeadsProvider>
  );
}