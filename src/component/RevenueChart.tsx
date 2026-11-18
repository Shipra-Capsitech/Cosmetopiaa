import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface MonthlyRevenue {
  month: string;
  revenue: number;
}

function RevenueChart() {
  const [data, setData] = useState<MonthlyRevenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await API.get("/Revenue");

        setData(response.data.monthlyRevenue || []);
      } catch (error) {
        console.error("Revenue Chart Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  if (loading) {
    return <p>Loading revenue chart...</p>;
  }

  const formatPrice = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`;

  return (
    <div className="w-full h-[220px]">

      {data.length === 0 ? (
        <p className="text-center text-gray-500 pt-16">
          No revenue data available
        </p>
      ) : (

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 0,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <YAxis
              tickFormatter={formatPrice}
              tick={{ fontSize: 12, fill: "black" }}
              axisLine={false}
              tickLine={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 13,
                fill: "black",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [
                formatPrice(Number(value)),
                "Revenue",
              ]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="black"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>
      )}

    </div>
  );
}

export default RevenueChart;