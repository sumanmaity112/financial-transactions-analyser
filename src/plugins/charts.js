import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";

export default () =>
  ChartJS.register(
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    ArcElement,
    LineElement,
    PointElement,
    RadialLinearScale,
    Filler,
  );
