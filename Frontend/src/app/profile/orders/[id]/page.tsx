"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ErrorMessage } from "@/components/molecules";
import PaymentProofImage from "@/components/molecules/PaymentProofImage";
import OrderDetailDataTable from "@/components/organisms/order-detail-data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { orderStatuses } from "@/configs/constants";
import { requiredfile } from "@/configs/schemas";
import { useGetOrderUserById } from "@/hooks/useGetOrderUserById";
import { useUpdateOrderUserById } from "@/hooks/useUpdateOrderUserById";
import { useUploadImage } from "@/hooks/useUploadImage";
import { formatRupiah, getOrderStatusBadgeVariant } from "@/lib/utils";
import { OrderStatus } from "@/services/order/types";

type OrderDetailPageProps = {
  params: {
    id: string;
  };
};

const UpdateProofPaymentFormSchema = z.object({
  proof_payment: requiredfile,
});

type FormValues = z.infer<typeof UpdateProofPaymentFormSchema>;

export default function OrderDetailPage({
  params: { id },
}: OrderDetailPageProps) {
  const {
    data: order,
    isLoading: isGetOrderUserLoading,
    isError,
    error: getOrderUserError,
  } = useGetOrderUserById(id);
  const { mutateAsync: uploadImage } = useUploadImage();

  const form = useForm<FormValues>({
    resolver: zodResolver(UpdateProofPaymentFormSchema),
  });

  const { mutateAsync, error } = useUpdateOrderUserById();

  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleFormSubmit = async (formValues: FormValues) => {
    try {
      setIsLoading(true);
      const {
        data: { data: url },
      } = await uploadImage(formValues.proof_payment);
      await mutateAsync({ ...formValues, id, proof_payment: url });
      toast.success("Berhasil mengunggah bukti pembayaran");
      router.push("/profile/orders");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isGetOrderUserLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <ErrorMessage
        message={getOrderUserError?.message}
        backTo="/profile/orders"
      />
    );

  return (
    <div className="container mx-auto flex min-h-screen flex-col space-y-8">
      <h1 className="text-3xl font-bold">Data Pesanan</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="col-span-1 space-y-2 md:col-span-3">
          <span className="block">Bukti Pembayaran</span>
          <PaymentProofImage src={order?.data.data.proof_payment || ""} />
        </div>
        <div className="col-span-1 space-y-2 md:col-span-9">
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableCell>
                  <Badge
                    variant={getOrderStatusBadgeVariant(
                      (order?.data.data.status_order as OrderStatus) || "",
                    )}
                  >
                    {orderStatuses[
                      order?.data.data.status_order as OrderStatus
                    ] || "-"}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableCell>{order?.data.data.email_address || "-"}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Nama Depan</TableHead>
                <TableCell>{order?.data.data.first_name || "-"}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Nama Belakang</TableHead>
                <TableCell>{order?.data.data.last_name || "-"}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Metode Pembayaran</TableHead>
                <TableCell className="whitespace-pre-wrap">
                  {order?.data.data.payment_method_name
                    ? `${order.data.data.payment_method_name}\n${order.data.data.payment_holder_name}\n${order.data.data.payment_holder_number}`
                    : "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Jumlah</TableHead>
                <TableCell>
                  {(order?.data.data.total_price &&
                    formatRupiah(order.data.data.total_price)) ||
                    "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Alamat Pengiriman</TableHead>
                <TableCell>{order?.data.data.address || "-"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="col-span-full space-y-2">
          {!order?.data.data.proof_payment && (
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="proof_payment"
                  control={form.control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Unggah Bukti Pembayaran
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          {...field}
                          onChange={(e) =>
                            onChange(e.target.files?.[0] ?? undefined)
                          }
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {error && <FormMessage>{error.message}</FormMessage>}
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    Kirim
                  </Button>
                </div>
              </form>
            </Form>
          )}
          <span className="block">Detail Pesanan</span>
          <OrderDetailDataTable data={order?.data.data.list_order_book || []} />
        </div>
      </div>
    </div>
  );
}
