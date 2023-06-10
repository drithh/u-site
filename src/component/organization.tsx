"use client";

import { api } from "~/trpc/client";
import CloudinaryImage from "~/component/image";
import Link from "next/link";
import type { Organization as OrganizationType } from "@prisma/client";
import { Input } from "~/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Search, ArrowUpRight } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Skeleton } from "~/ui/skeleton";

export default function Organizations() {
  const [parent] = useAutoAnimate();
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const allOrganizations = useRef<OrganizationType[]>([]);
  const queryOrganization = useQuery(
    ["organization"],
    () => api.organization.getOrganizations.query({}),
    {
      onSuccess: (data) => {
        setOrganizations(data);
        allOrganizations.current = data;
      },
    }
  );

  const [field, setField] = useState("Semua");

  const filterField = (filter: string) => {
    setText("");
    if (filter === "Semua") {
      setOrganizations(allOrganizations.current);
      return;
    }

    const filtered = allOrganizations.current.filter((organization) => {
      return organization.field.toLowerCase().includes(filter.toLowerCase());
    });
    setOrganizations(filtered);
  };

  const [text, setText] = useState("");

  const filterName = (filter: string) => {
    setField("Semua");
    if (filter === "") {
      setOrganizations(allOrganizations.current);
      return;
    }
    const filtered = allOrganizations.current.filter((organization) => {
      return organization.name.toLowerCase().includes(filter.toLowerCase());
    });
    setOrganizations(filtered);
  };

  return (
    <div className="my-4">
      <div className="my-4 flex place-items-center gap-4">
        <div className="flex h-10 w-full place-items-center rounded-md border border-input border-stone-300 bg-transparent px-3 text-sm ring-offset-background">
          <Search className="text-stone-500" size={16} />
          <Input
            type="email"
            className="border-0 bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Cari UKM..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              filterName(e.target.value);
            }}
          />
        </div>
        <div className=" w-[180px]">
          <Select
            onValueChange={(e) => {
              filterField(e);
              setField(e);
            }}
            value={field}
          >
            <SelectTrigger className="w-[180px] rounded-md border-stone-300 font-sans">
              <SelectValue placeholder="Bidang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-sans" value="Semua">
                Semua
              </SelectItem>
              <SelectItem className="font-sans" value="Kepemimpinan">
                Kepemimpinan
              </SelectItem>
              <SelectItem className="font-sans" value="Kesenian">
                Kesenian
              </SelectItem>
              <SelectItem className="font-sans" value="Kewirausahaan">
                Kewirausahaan
              </SelectItem>
              <SelectItem className="font-sans" value="Kemanusiaan">
                Kemanusiaan
              </SelectItem>
              <SelectItem className="font-sans" value="Keagamaan">
                Keagamaan
              </SelectItem>
              <SelectItem className="font-sans" value="Keilmuan">
                Keilmuan
              </SelectItem>
              <SelectItem className="font-sans" value="Olahraga">
                Olahraga
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        className="flex flex-col place-content-center gap-4 border-t-2 border-solid border-stone-200"
        ref={parent}
      >
        {queryOrganization.isLoading ? (
          <>
            <OrganizationSkeleton />
            <OrganizationSkeleton />
            <OrganizationSkeleton />
            <OrganizationSkeleton />
            <OrganizationSkeleton />
          </>
        ) : (
          organizations.map((organization) => (
            <Organization key={organization.id} organization={organization} />
          ))
        )}
      </div>
    </div>
  );
}

function OrganizationSkeleton() {
  return (
    <div className="border-b-2 border-solid border-stone-200 p-6">
      <div className="flex gap-4">
        <div className="h-48 w-48">
          <Skeleton className="h-full w-full rounded-xl bg-stone-600" />
        </div>
        <div className="flex h-48 flex-1 flex-col place-content-between gap-3">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-8 w-full  bg-stone-700" />
            <Skeleton className="h-4 w-full  bg-stone-500" />
            <Skeleton className="h-4 w-full  bg-stone-500" />
            <Skeleton className="h-4 w-full  bg-stone-500" />
            <Skeleton className="h-4 w-full  bg-stone-500" />
            <Skeleton className="h-4 w-full  bg-stone-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Organization({ organization }: { organization: OrganizationType }) {
  return (
    <div
      key={organization.id}
      className="border-b-2 border-solid border-stone-200 p-6"
    >
      <div className="flex gap-4">
        <div className="h-48 w-48">
          <CloudinaryImage imagePath={organization.image ?? undefined} />
        </div>
        <div className="flex h-48 flex-1 flex-col place-content-between gap-3">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold text-stone-700">
              {organization.name}
            </h3>
            <p className="line-clamp-3  text-justify text-lg text-stone-500">
              {organization.description}
            </p>
          </div>
          <div className="flex place-content-end">
            <Link
              href={`/organizations/${organization.id}`}
              className="group flex place-items-center  gap-1 text-lg font-bold text-stone-500 transition-colors duration-300 hover:text-stone-700"
            >
              Detail
              <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
