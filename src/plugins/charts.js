import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";

export default () => ChartJS.register( Tooltip, Legend,CategoryScale,
    LinearScale, ArcElement, LineElement, PointElement);
