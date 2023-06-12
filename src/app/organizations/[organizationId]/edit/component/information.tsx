"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import type { Organization } from "@prisma/client";
// init dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Input } from "~/ui/input";
import { Textarea } from "~/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "~/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/client";
import { useToast } from "~/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama organisasi harus lebih dari 2 karakter.",
  }),
  description: z.string().min(2, {
    message: "Deskripsi organisasi harus lebih dari 2 karakter.",
  }),
  field: z.string().min(2, {
    message: "Bidang organisasi harus lebih dari 2 karakter.",
  }),
  image: z
    .object({
      image: z.any().refine((file) => {
        if (file instanceof File) {
          return file.type.startsWith("image/");
        }

        return false;
      }),
    })
    .optional(),
  establishedAt: z.string().optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
});

export default function ProfileForm({
  organization,
  id,
}: {
  organization: Organization | null;
  id: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organization?.name ?? "",
      description: organization?.description ?? "",
      field: organization?.field ?? "",
      establishedAt:
        dayjs(organization?.establishedAt ?? "2021-01-01", "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        ) ?? undefined,

      vision: organization?.vision ?? undefined,
      mission: organization?.mission ?? undefined,
    },
  });
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const image = values.image?.image as File | undefined;
    const establishedAt = values.establishedAt
      ? new Date(values.establishedAt)
      : undefined;

    try {
      await api.organization.updateOrganization.mutate({
        id,
        name: values.name,
        description: values.description,
        field: values.field,
        image,
        establishedAt,
        vision: values.vision,
        mission: values.mission,
      });
      toast({
        title: "Berhasil mengubah informasi organisasi.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal mengubah informasi organisasi.",
      });
    }
  }

  return (
    <div className="information border-2 border-solid border-stone-200 p-8 font-sans">
      <h2 className="mb-12 text-center font-serif text-5xl font-bold uppercase">
        Informasi
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Organisasi</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama organisasi" {...field} />
                </FormControl>
                <FormDescription>
                  Ini nama organisasi yang akan muncul.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Organisasi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan deskripsi organisasi"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ini deskripsi organisasi yang akan muncul.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bidang Organisasi</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full rounded-md border-stone-300 font-sans">
                      <SelectValue placeholder="Bidang" />
                    </SelectTrigger>
                    <SelectContent>
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
                </FormControl>
                <FormDescription>
                  Ini bidang organisasi yang akan muncul.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo Organisasi</FormLabel>
                <FormControl>
                  <Input type="file" {...field} value={undefined} />
                </FormControl>
                <FormDescription>
                  Ini logo organisasi yang akan muncul.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="establishedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Berdiri</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Ini tanggal berdiri organisasi yang akan muncul.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vision"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visi</FormLabel>
                <FormControl>
                  <Textarea placeholder="Masukkan visi" {...field} />
                </FormControl>
                <FormDescription>
                  Ini visi organisasi yang akan muncul.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Misi</FormLabel>
                <FormControl>
                  <Textarea placeholder="Masukkan misi" {...field} />
                </FormControl>
                <FormDescription>
                  Ini misi organisasi yang akan muncul.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-stone-500 text-justify text-lg font-bold text-white hover:bg-stone-600"
            type="submit"
          >
            Simpan Perubahan
          </Button>
        </form>
      </Form>
    </div>
  );
}
