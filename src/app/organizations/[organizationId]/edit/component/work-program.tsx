"use client";
import { DataTable } from "~/ui/data-table";

import type { ColumnDef } from "@tanstack/react-table";
import type { WorkProgram } from "@prisma/client";

import { Button } from "~/ui/button";
import dayjs from "dayjs";

import { Edit, Trash } from "lucide-react";

export const columns: ColumnDef<WorkProgram>[] = [
  {
    accessorKey: "title",
    header: "Judul Program Kerja",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Tanggal Pelaksanaan",
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
          <EditWorkProgram data={row.original} />
          <DeleteWorkProgram id={row.original.id} />
        </div>
      );
    },
  },
];

interface WorkProgramProps {
  id: string;
  data: WorkProgram[];
}

export default function WorkProgram({ id, data }: WorkProgramProps) {
  return (
    <div className="workProgram border-2 border-solid border-stone-200 p-8">
      <h2 className="mb-12 text-center text-5xl font-bold uppercase">
        Program Kerja
      </h2>
      <div className="my-6 font-sans ">
        <DataTable columns={columns} data={data} />
      </div>
      <CreateWorkProgram id={id} />
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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Judul program kerja harus lebih dari 2 karakter",
  }),
  status: z.string().min(2, {
    message: "Status program kerja harus lebih dari 2 karakter",
  }),
  date: z.string().min(2, {
    message: "Tanggal pelaksanaan program kerja harus lebih dari 2 karakter",
  }),
});

interface CreateWorkProgramProps {
  id: string;
}

export function CreateWorkProgram({ id }: CreateWorkProgramProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      // remove date from values
      const { date, ...rest } = values;
      const workProgramDate = dayjs(date).toDate();

      await api.workProgram.createWorkProgram.mutate({
        organizationId: id,
        date: workProgramDate,
        ...rest,
      });
      toast({
        title: "Berhasil menambah program kerja",
      });
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menambah program kerja",
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
          Tambah Program Kerja
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm" className="font-sans">
        <SheetHeader>
          <SheetTitle>Tambah Program Kerja</SheetTitle>
          <SheetDescription>
            Buat program kerja yang pernah organisasi kamu ikuti
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
                    <FormLabel>Judul Program Kerja</FormLabel>
                    <FormControl>
                      <Input placeholder="Judul program kerja" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini judul program kerja organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Program Kerja</FormLabel>
                    <FormControl>
                      <Input placeholder="Status program kerja" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini status program kerja organisasi kamu
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
                    <FormLabel>Tanggal Pelaksanaan</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Tanggal pelaksanaan"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ini tanggal pelaksanaan program kerja organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-stone-500 text-justify text-lg font-medium text-white hover:bg-stone-600"
                type="submit"
              >
                Tambah Program Kerja
              </Button>
            </form>
          </Form>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface EditWorkProgramProps {
  data: WorkProgram;
}
export function EditWorkProgram({ data }: EditWorkProgramProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      status: data.status,
      date: dayjs(data.date).format("YYYY-MM-DD"),
    },
  });
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      // remove date from values
      const { date, ...rest } = values;
      const workProgramDate = dayjs(date).toDate();

      await api.workProgram.updateWorkProgram.mutate({
        id: data.id,
        date: workProgramDate,
        ...rest,
      });
      toast({
        title: "Berhasil mengubah program kerja",
      });
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal mengubah program kerja",
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
          <SheetTitle>Edit Program Kerja</SheetTitle>
          <SheetDescription>
            Buat perubahan pada program kerja yang pernah organisasi kamu ikuti
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
                    <FormLabel>Judul Program Kerja</FormLabel>
                    <FormControl>
                      <Input placeholder="Judul program kerja" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini judul program kerja organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Program Kerja</FormLabel>
                    <FormControl>
                      <Input placeholder="Status program kerja" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini status program kerja organisasi kamu
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
                    <FormLabel>Tanggal Pelaksanaan</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Tanggal pelaksanaan"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ini tanggal pelaksanaan program kerja organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-stone-500 text-justify text-lg font-medium text-white hover:bg-stone-600"
                type="submit"
              >
                Simpan Perubahan
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

interface DeleteWorkProgramProps {
  id: string;
}

export function DeleteWorkProgram({ id }: DeleteWorkProgramProps) {
  const { toast } = useToast();
  const deleteWorkProgram = async () => {
    try {
      await api.workProgram.deleteWorkProgram.mutate({
        id,
      });
      toast({
        title: "Berhasil menghapus program kerja",
      });
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menghapus program kerja",
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
            Aksi ini tidak dapat diurungkan. Ini akan menghapus program kerja
            organisasi kamu dari server kami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-stone-500 text-justify   text-white hover:bg-stone-600"
            onClick={deleteWorkProgram}
          >
            Yakin
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
