import Link from "next/link";

import {
  Breadcrumb as ShadCnBreadcrumb,
  BreadcrumbItem as ShadCnBreadcrumbItem,
  BreadcrumbLink as ShadCnBreadcrumbLink,
  BreadcrumbList as ShadCnBreadcrumbList,
  BreadcrumbPage as ShadCnBreadcrumbPage,
  BreadcrumbSeparator as ShadCnBreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import type { IProps } from "./types";

const Breadcrumb = ({ data }: IProps) => {
  return (
    <ShadCnBreadcrumb>
      <ShadCnBreadcrumbList>
        {data.map((datum) => {
          const isLink = !!datum.href;
          return (
            <>
              <ShadCnBreadcrumbItem key={datum.label}>
                {!isLink && (
                  <ShadCnBreadcrumbPage>{datum.label}</ShadCnBreadcrumbPage>
                )}
                {isLink && (
                  <ShadCnBreadcrumbLink asChild>
                    <Link href={datum.href!}>{datum.label}</Link>
                  </ShadCnBreadcrumbLink>
                )}
              </ShadCnBreadcrumbItem>
              {isLink && <ShadCnBreadcrumbSeparator />}
            </>
          );
        })}
      </ShadCnBreadcrumbList>
    </ShadCnBreadcrumb>
  );
};

export default Breadcrumb;
