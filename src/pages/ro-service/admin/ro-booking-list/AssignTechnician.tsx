("");
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFSelectField,
} from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import EditDialogBox from "@/components/edit-dialog-box";
import {
  useApi,
  usePostMutation,
  usePutMutation,
} from "@/hooks/useCustomQuery";
import { roApi } from "@/lib";
import { I_BOOKING_TYPE } from "./type";

const schema = yup.object().shape({
  technicianId: yup.string().required("Role name is required"),
  assignDate: yup.string().required().label("Assign Date"),
  assignTime: yup.string().required().label("Assign Time"),
});
type FormData = yup.InferType<typeof schema>;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  id?: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: () => void;
  techId?: string;
};

export default function AssignTechnician({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetch,
  techId,
}: Readonly<Props>) {
  const postMutation = usePostMutation({});
  const putMutation = usePutMutation({});

  const methods = useForm<FormData>({
    defaultValues: {
      technicianId: "",
    },
    resolver: yupResolver(schema),
  });

  const tecnicianListData = useApi<any>({
    api: roApi?.getAllTechnicianOnly,
    options: {
      enabled: true,
    },
  });

  const getBookingByIdData = useApi<{
    data: I_BOOKING_TYPE;
  }>({
    api: `${roApi?.findBookingRoService}/${id}`,
    value: [id],
    options: {
      enabled: !!id,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (edit) {
        const res = await putMutation.mutateAsync({
          api: `${roApi.updateBookingRoService}/${id}`,
          data: data,
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("Booking not updated successfully");
        }
      }
      setOpen(false);
      setEdit!(false);
      refetch!();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
    if (getBookingByIdData?.data) {
      methods?.setValue(
        "technicianId",
        getBookingByIdData?.data?.data?.technicianId!
      );
      methods?.setValue(
        "assignDate",
        getBookingByIdData?.data?.data?.assignDate
      );
      methods?.setValue(
        "assignTime",
        getBookingByIdData?.data?.data?.aasigntime
      );
    }
  }, [getBookingByIdData?.data]);

  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title}
      setEdit={setEdit}
      edit={edit}
      isLoading={false}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <div className="col-span-2">
            <RHFSelectField
              name="technicianId"
              data={tecnicianListData?.data?.data?.map((item: any) => ({
                label: item.fullName,
                value: item._id,
              }))}
            />
          </div>
          <div>
            <RHFTextField
              type="date"
              name="assignDate"
              placeholder="Assign Date"
            />
          </div>
          <div>
            <RHFTextField
              type="time"
              name="assignTime"
              placeholder="Assign Time"
            />
          </div>

          <Separator className="col-span-2" />
          <div className="col-span-2">
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type="submit"
              className="h-11 w-full rounded-xl"
            >
              Submit
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  );
}
