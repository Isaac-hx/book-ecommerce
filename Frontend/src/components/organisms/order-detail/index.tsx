"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PaymentProofImage from "@/components/molecules/PaymentProofImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { orderStatuses } from "@/configs/constants";
import { useGetOrderById } from "@/hooks/useGetOrderById";
import { useUpdateOrderById } from "@/hooks/useUpdateOrderById";
import { formatRupiah, getOrderStatusBadgeVariant } from "@/lib/utils";
import type { OrderStatus } from "@/services/order/types";

import OrderDetailDataTable from "../order-detail-data-table";

const OrderDetail = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, refetch } = useGetOrderById(id);
  const { mutateAsync, isPending } = useUpdateOrderById();

  const handleProcessOrder = (status_order: OrderStatus) => {
    mutateAsync({ id, status_order })
      .then(() => {
        toast.success(
          status_order === "paid"
            ? "Berhasil menyetujui pesanan"
            : "Berhasil menolak pesanan",
        );
        router.push("/admin/orders");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || err?.message);
        refetch();
      });
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-12">
      <div className="col-span-1 space-y-2 md:col-span-3">
        <span className="block">Bukti Pembayaran</span>
        <PaymentProofImage src={data?.data.data.proof_payment || ""} />
      </div>
      <div className="col-span-1 space-y-2 md:col-span-9">
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableCell>
                <Badge
                  variant={getOrderStatusBadgeVariant(
                    (data?.data.data.status_order as OrderStatus) || "",
                  )}
                >
                  {orderStatuses[data?.data.data.status_order as OrderStatus] ||
                    "-"}
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableCell>{data?.data.data.email_address || "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Nama Awalan</TableHead>
              <TableCell>{data?.data.data.first_name || "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Nama Akhiran</TableHead>
              <TableCell>{data?.data.data.last_name || "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Metode Pembayaran</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {data?.data.data.payment_method_name
                  ? `${data.data.data.payment_method_name}\n${data.data.data.payment_holder_name}\n${data.data.data.payment_holder_number}`
                  : "-"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Jumlah</TableHead>
              <TableCell>
                {(data?.data.data.total_price &&
                  formatRupiah(data.data.data.total_price)) ||
                  "-"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Alamat Pengiriman</TableHead>
              <TableCell>{data?.data.data.address || "-"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {data?.data.data.status_order === "pending" && (
          <div className="space-x-2">
            <Button
              disabled={isPending}
              variant="destructive"
              onClick={() => handleProcessOrder("rejected")}
            >
              Tolak
            </Button>
            <Button
              disabled={isPending}
              variant="default"
              onClick={() => handleProcessOrder("paid")}
            >
              Setujui
            </Button>
          </div>
        )}
      </div>
      <div className="col-span-full space-y-2">
        <span className="block">Detail Pesanan</span>
        <OrderDetailDataTable data={data?.data.data.list_order_book || []} />
      </div>
    </section>
  );
};

export default OrderDetail;
