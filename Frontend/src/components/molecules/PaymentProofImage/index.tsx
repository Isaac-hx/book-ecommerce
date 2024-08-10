import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

const PaymentProofImage = ({ src }: { src: string }) => {
  if (!src)
    return (
      <AspectRatio
        ratio={2 / 3}
        className="flex w-full items-center justify-center bg-muted"
      >
        <span className="text-2xl font-bold text-gray-500">Kosong</span>
      </AspectRatio>
    );

  return (
    <Image
      src={src}
      alt="payment_proof"
      width={200}
      height={300}
      className="w-full object-contain"
    />
  );
};

export default PaymentProofImage;
