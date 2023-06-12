"use client";
import { DataTable } from "~/ui/data-table";

import type { ColumnDef } from "@tanstack/react-table";
import type { Member } from "@prisma/client";

import { Button } from "~/ui/button";

import { Edit, Trash } from "lucide-react";

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "position",
    header: "Jabatan",
  },
  {
    accessorKey: "studentId",
    header: "NIM",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: () => {
      return <div className="flex justify-center">Aksi</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex place-content-center gap-4">
          <EditMember data={row.original} />
          <DeleteMember id={row.original.id} />
        </div>
      );
    },
  },
];

interface MemberProps {
  id: string;
  data: Member[];
}

export default function Member({ id, data }: MemberProps) {
  return (
    <div className="member border-2 border-solid border-stone-200 p-8">
      <h2 className="mb-12 text-center text-5xl font-bold uppercase">
        Anggota
      </h2>
      <div className="my-6 font-sans ">
        <DataTable columns={columns} data={data} />
      </div>
      <CreateMember id={id} />
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
  name: z.string().min(2, {
    message: "Nama anggota harus lebih dari 2 karakter",
  }),
  position: z.string().min(2, {
    message: "Jabatan harus lebih dari 2 karakter",
  }),
  studentId: z.string().min(2, {
    message: "NIM harus lebih dari 2 karakter",
  }),
  email: z.string().email({
    message: "Email tidak valid",
  }),
});

interface CreateMemberProps {
  id: string;
}

export function CreateMember({ id }: CreateMemberProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await api.member.createMember.mutate({
        organizationId: id,
        ...values,
      });
      toast({
        title: "Berhasil menambah anggota",
      });
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menambah anggota",
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
          Tambah Anggota
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm" className="font-sans">
        <SheetHeader>
          <SheetTitle>Tambah Anggota</SheetTitle>
          <SheetDescription>
            Buat anggota yang pernah organisasi kamu ikuti
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Anggota</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama anggota" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini nama anggota organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <FormControl>
                      <Input placeholder="Ketua" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini jabatan anggota organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIM</FormLabel>
                    <FormControl>
                      <Input placeholder="NIM" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini NIM anggota organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini email anggota organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-stone-500 text-justify text-lg font-medium text-white hover:bg-stone-600"
                type="submit"
              >
                Tambah Anggota
              </Button>
            </form>
          </Form>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface EditMemberProps {
  data: Member;
}
export function EditMember({ data }: EditMemberProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      position: data.position,
      studentId: data.studentId,
      email: data.email,
    },
  });
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await api.member.updateMember.mutate({
        id: data.id,
        ...values,
      });
      toast({
        title: "Berhasil mengubah anggota",
      });
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal mengubah anggota",
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
          <SheetTitle>Edit Anggota</SheetTitle>
          <SheetDescription>
            Buat perubahan pada anggota yang pernah organisasi kamu ikuti
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Anggota</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama anggota" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini nama anggota organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <FormControl>
                      <Input placeholder="Ketua" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini jabatan anggota organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIM</FormLabel>
                    <FormControl>
                      <Input placeholder="NIM" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini NIM anggota organisasi kamu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini email anggota organisasi kamu
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

interface DeleteMemberProps {
  id: string;
}

export function DeleteMember({ id }: DeleteMemberProps) {
  const { toast } = useToast();
  const deleteMember = async () => {
    try {
      await api.member.deleteMember.mutate({
        id,
      });
      toast({
        title: "Berhasil menghapus anggota",
      });
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menghapus anggota",
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
            Aksi ini tidak dapat diurungkan. Ini akan menghapus anggota
            organisasi kamu dari server kami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-stone-500 text-justify   text-white hover:bg-stone-600"
            onClick={deleteMember}
          >
            Yakin
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
