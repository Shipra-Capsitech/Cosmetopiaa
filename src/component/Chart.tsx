// 1. Import Cell alongside your other elements
import { Pie, PieChart, Tooltip, Cell } from "recharts"; 
import { RechartsDevtools } from '@recharts/devtools';

// 2. Define a clean color theme array matching your app palette
const COLORS = ["#a9d1b0", "#f09c1f", "#8E7C74", "#502611"];

export default function PieChartDefaultIndex({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const data = [
    { name: "Delivered", uv: 4231 },
    { name: "In Progress", uv: 2187 },
    { name: "Shipped", uv: 2081 },
    { name: "Pending", uv: 1524},
  ];

  return (
    <PieChart width={400} height={400}>
      <Pie
        
        data={data}
        dataKey="uv"
        isAnimationActive={isAnimationActive}
      >
        {/* 3. Map over your data and inject a unique colored cell for each entry */}
        {data.map((__, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip defaultIndex={2} />
      <RechartsDevtools />
    </PieChart>
  );
}
