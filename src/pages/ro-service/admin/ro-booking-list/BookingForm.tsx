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
  RHFTextArea,
} from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import EditDialogBox from "@/components/edit-dialog-box";
import {
  useApi,
  usePostMutation,
  usePutMutation,
} from "@/hooks/useCustomQuery";
import { roApi } from "@/lib";
import { I_BOOKING_VIEW } from "./type";

const schema = yup.object().shape({
  fullName: yup.string().required("Role name is required"),
  address: yup.string().required("address is required"),
  email: yup.string().required("address is required"),
  phoneNumber: yup.string().required("mobile is required"),
  serviceType: yup.string().required("service is required"),
  preferredDate: yup.string().required("date is required"),
  additionalInfo: yup.string().required("message is required"),
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
};

export default function BookingForm({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetch,
}: Readonly<Props>) {
  const postMutation = usePostMutation({});
  const putMutation = usePutMutation({});
  const { data, isFetching } = useApi<I_BOOKING_VIEW>({
    api: `${roApi.getRoleById}/${id}`,
    key: "getBookingById",
    options: {
      enabled: edit,
    },
  });

  const methods = useForm<FormData>({
    defaultValues: {
      fullName: "",
      address: "",
      email: "",
      phoneNumber: "",
      serviceType: "",
      preferredDate: "",
      additionalInfo: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${roApi.updateBookingRoService}/${id}`,
          data: data,
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("Booking not updated successfully");
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: roApi.roBokkingCitizen,
          data: data,
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("Booking not created successfully");
        }
        methods.reset({
          fullName: "",
          address: "",
          email: "",
          phoneNumber: "",
          serviceType: "",
          preferredDate: "",
          additionalInfo: "",
        });
      }
      setOpen(false);
      setEdit!(false);
      refetch!();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (edit && data) {
      methods.reset({
        fullName: data.data.fullName,
        phoneNumber: data.data.phoneNumber,
        address: data.data.phoneNumber,
        serviceType: data.data.serviceType,
        preferredDate: data.data.preferredDate,
        additionalInfo: data.data.additionalInfo,
      });
    } else {
      methods.reset({
        fullName: "",
        address: "",
        email: "",
        phoneNumber: "",
        serviceType: "",
        preferredDate: "",
        additionalInfo: "",
      });
    }
  }, [edit, data]);

  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title}
      setEdit={setEdit}
      edit={edit}
      isLoading={isFetching}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >



        <div className="grid grid-cols-1 gap-x-2 gap-y-4">
          <div>
            <RHFTextField name="fullName" placeholder="Enter your  name" />
          </div>
          <div>
            <RHFTextArea name="address" placeholder="Enter your  address" />
          </div>
          <div>
            <RHFTextField name="phoneNumber" placeholder="Enter your  no" />
          </div>
          <div>
            <RHFTextField name="email" placeholder="Enter your  email" />
          </div>
          <div>
            <RHFTextField name="preferredDate" placeholder="Enter your  preferredDate" />
          </div>
          <div>
            <RHFTextField name="additionalInfo" placeholder="Enter your  additionalInfo" />
          </div>

         
          <Separator />
          <div>
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
