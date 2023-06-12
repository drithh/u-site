"use client";
import { DataTable } from "~/ui/data-table";

import type { ColumnDef } from "@tanstack/react-table";
import type { Achievement } from "@prisma/client";

import { Button } from "~/ui/button";
import dayjs from "dayjs";

import { Edit, Trash } from "lucide-react";

export const columns: ColumnDef<Achievement>[] = [
  {
    accessorKey: "title",
    header: "Peringkat dan Kegiatan",
  },
  {
    accessorKey: "date",
    header: "Waktu Kegiatan",
    cell: ({ row }) => {
      return dayjs(row.original.date).format("DD MMMM YYYY");
    },
  },
  {
    id: "actions",
    header: () => {
      return <div className="flex justify-center">Aksi</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex place-content-center gap-4">
          <EditAchievement data={row.original} />
          <DeleteAchievement id={row.original.id} />
        </div>
      );
    },
  },
];

interface AchievementProps {
  id: string;
  data: Achievement[];
}

export default function Achievement({ id, data }: AchievementProps) {
  return (
    <div className="achievement border-2 border-solid border-stone-200 p-8">
      <h2 className="mb-12 text-center text-5xl font-bold uppercase">
        Prestasi
      </h2>
      <div className="my-6 font-sans ">
        <DataTable columns={columns} data={data} />
      </div>
      <CreateAchievement id={id} />
    </div>
  );
}

import { Input } from "~/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "~/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Peringkat dan Kegiatan harus lebih dari 2 karakter",
  }),
  date: z.string().min(2, {
    message: "Waktu Kegiatan harus lebih dari 2 karakter",
  }),
});

interface CreateAchievementProps {
  id: string;
}

export function CreateAchievement({ id }: CreateAchievementProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const achievementDate = dayjs(values.date).toDate();
      await api.achievement.createAchievement.mutate({
        organizationId: id,
        date: achievementDate,
        title: values.title,
      });
      toast({
        title: "Berhasil menambah prestasi",
      });
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menambah prestasi",
      });
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-full bg-stone-500 text-justify text-lg  font-medium text-white hover:bg-stone-600"
          type="submit"
        >
          Tambah Prestasi
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm" className="font-sans">
        <SheetHeader>
          <SheetTitle>Tambah Prestasi</SheetTitle>
          <SheetDescription>
            Buat prestasi yang pernah organisasi kamu ikuti
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peringkat dan Kegiatan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Peringkat dan Kegiatan"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ini nama peringkat dan kegiatan yang pernah kamu ikuti
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Kegiatan</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Waktu Kegiatan"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ini waktu kegiatan yang pernah kamu ikuti
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-stone-500 text-justify text-lg font-medium text-white hover:bg-stone-600"
                type="submit"
              >
                Tambah Prestasi
              </Button>
            </form>
          </Form>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface EditAchievementProps {
  data: Achievement;
}
export function EditAchievement({ data }: EditAchievementProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      date: dayjs(data.date).format("YYYY-MM-DD"),
    },
  });
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const achievementDate = dayjs(values.date).toDate();
      await api.achievement.updateAchievement.mutate({
        id: data.id,
        date: achievementDate,
        title: values.title,
      });
      toast({
        title: "Berhasil mengubah prestasi",
      });
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal mengubah prestasi",
      });
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Edit className="w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm" className="font-sans">
        <SheetHeader>
          <SheetTitle>Edit Prestasi</SheetTitle>
          <SheetDescription>
            Buat perubahan pada prestasi yang pernah organisasi kamu ikuti
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peringkat dan Kegiatan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Peringkat dan Kegiatan"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ini nama peringkat dan kegiatan yang pernah kamu ikuti
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Kegiatan</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Waktu Kegiatan"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ini waktu kegiatan yang pernah kamu ikuti
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-stone-500 text-justify text-lg font-medium text-white hover:bg-stone-600"
                type="submit"
              >
                Simpan
              </Button>
            </form>
          </Form>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/ui/alert-dialog";
import { api } from "~/trpc/client";
import { useToast } from "~/ui/use-toast";

interface DeleteAchievementProps {
  id: string;
}

export function DeleteAchievement({ id }: DeleteAchievementProps) {
  const { toast } = useToast();
  const deleteAchievement = async () => {
    try {
      await api.achievement.deleteAchievement.mutate({
        id,
      });
      toast({
        title: "Berhasil menghapus prestasi",
      });
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menghapus prestasi",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Trash className="w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-sans">
        <AlertDialogHeader>
          <AlertDialogTitle>Apa kamu yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini tidak dapat diurungkan. Ini akan menghapus prestasi
            organisasi kamu dari server kami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-stone-500 text-justify   text-white hover:bg-stone-600"
            onClick={deleteAchievement}
          >
            Yakin
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
