import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    LineElement, PointElement
} from 'chart.js'

export default () => ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement);
