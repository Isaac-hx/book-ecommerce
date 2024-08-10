import { DataTable } from "@/components/organisms/data-table";
import { OrderDetailItem } from "@/services/order/types";

import { columns } from "./columns";

const OrderDetailDataTable = ({ data }: { data: OrderDetailItem[] }) => {
  return <DataTable data={data} columns={columns} />;
};

export default OrderDetailDataTable;
