"use client";

import { format } from "date-fns";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetOrderHistories } from "@/hooks/useGetOrderHistories";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--foreground))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--foreground))",
  },
} satisfies ChartConfig;

const OrderHistoryChart = (params: { filterby: "date" | "month" | "year" }) => {
  const { data, isSuccess } = useGetOrderHistories(params);

  if (isSuccess && data.data.data.length <= 0) {
    return (
      <AspectRatio ratio={9 / 5} className="flex items-center justify-center">
        <span className="text-2xl font-medium">Belum ada pesanan</span>
      </AspectRatio>
    );
  }

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={data?.data.data ?? []}
        margin={{
          left: 50,
          right: 50,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            switch (params.filterby) {
              case "date":
                return format(value, "dd-MM");
              case "month":
                return format(value, "MMM yyyy");
              case "year":
                return format(value, "yyyy");
            }
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          dataKey="total"
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-desktop)",
          }}
          activeDot={{
            r: 6,
          }}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
};

export default OrderHistoryChart;
