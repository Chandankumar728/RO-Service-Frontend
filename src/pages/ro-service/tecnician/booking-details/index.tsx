import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Trash,
  Phone,
  MessageSquareMore,
  ClipboardList,
  Plus,
  CalculatorIcon,
} from "lucide-react";
import { useApi, usePostMutation } from "@/hooks/useCustomQuery";
import { getErrorMessage, roApi } from "@/lib";
import Page from "@/components/helmet-page";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Confirm } from "@/components/react-confirm-box";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/loaders/Spinner";
import { I_BOOKING_VIEW } from "../../admin/ro-booking-list/type";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { RHFTextField, FormProviders } from "@/components/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  bookingId: yup.string().required("Booking id is required"),
  items: yup.array().of(
    yup.object().shape({
      bookingId: yup.string(),
      itemName: yup.string().required("Item name is required"),
      quantity: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value)) // Transform empty values to undefined
        .positive("Quantity must be greater than 0")
        .typeError("Quantity must be a number")
        .required("Quantity is required"),
      unitPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value)) // Transform empty values to undefined
        .positive("Unit price must be greater than 0")
        .typeError("Unit price must be a number")
        .required("Unit price is required"),
      totalAmount: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value)) // Transform empty values to undefined
        .positive("Total amount must be greater than 0")
        .typeError("Total amount must be a number")
        .required("Total amount is required"),
    })
  ),
});

type FormData = yup.InferType<typeof schema>;

export default function BookingDetails() {
  const navigate = useNavigate();
  const mutate = usePostMutation({});
  const [unitAmount, setUnitAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { id } = useParams();

  const getBookingDetailsData = useApi<I_BOOKING_VIEW>({
    api: `${roApi?.findBookingRoService}/${id}`,
    key: "get-findBookingRoService-detail-view",
    value: [id],
    options: {
      enabled: !!id,
    },
  });

  const methods = useForm<FormData>({
    defaultValues: {
      bookingId: id,
      items: [
        {
          bookingId: id,
          itemName: "Service Charge",
          quantity: 1,
          unitPrice: 500,
          totalAmount: 500,
        },
      ],
    },
    resolver: yupResolver(schema),
  });

  const itemField = useFieldArray({
    control: methods.control,
    name: "items",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await mutate.mutateAsync({
        api: roApi?.payBooking,
        data: {
          bookingId: data?.bookingId,
          items: data?.items,
        },
      });
      if (result?.data?.success) {
        toast.success(result?.data?.message);
      } else {
        toast.error(result?.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Calculate totals whenever any item changes
  useEffect(() => {
    const subscription = methods.watch(() => {
      // Calculate totals whenever any item field changes
      const items = methods.getValues("items");
      let unitSum = 0;
      let totalSum = 0;

      if (items && items.length > 0) {
        items.forEach((item) => {
          totalSum += Number(item.totalAmount) || 0;
          unitSum += Number(item.unitPrice) || 0;
        });
      }

      setTotalAmount(totalSum);
      setUnitAmount(unitSum);
    });

    // Clean up subscription on component unmount
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleUnitPriceChange = (index: number, value: number) => {
    const currentUnit =
      Number(methods.getValues(`items.${index}.quantity`)) || 0;
    const newTotal = value * currentUnit;
    methods.setValue(`items[${index}].totalAmount` as any, newTotal);
  };

  const handleQuantityChange = (index: number, value: number) => {
    const currentPrice =
      Number(methods.getValues(`items.${index}.unitPrice`)) || 0;
    const newTotal = value * currentPrice;
    console.log(newTotal);
    methods.setValue(`items[${index}].totalAmount` as any, newTotal);
  };

  if (getBookingDetailsData.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Page title="Booking Details">
      {/* Customer Info Card */}
      <Card className="mt-4 p-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Customer Details</h2>
          <Badge className="bg-secondary text-primary font-medium">
            {getBookingDetailsData?.data?.data?.status || "Pending"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-muted-foreground">
              Customer name
            </h3>
            <p className="text-sm font-medium">
              {getBookingDetailsData.data?.data?.fullName || "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-muted-foreground">
              Application ID
            </h3>
            <p className="text-sm font-medium">
              {getBookingDetailsData.data?.data?.applicationNo || "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-muted-foreground">
              Mobile
            </h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">
                {getBookingDetailsData.data?.data?.phoneNumber || "N/A"}
              </p>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Phone size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MessageSquareMore size={16} />
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-muted-foreground">
              Assign date & time
            </h3>
            <p className="text-sm font-medium">
              {getBookingDetailsData.data?.data?.assignDate
                ? `${moment(
                    getBookingDetailsData.data?.data?.assignDate
                  ).format("DD-MMM-YYYY")} 
                   ${getBookingDetailsData.data?.data?.aasigntime || ""}`
                : "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-muted-foreground">
              Service type
            </h3>
            <p className="text-sm font-medium">
              {getBookingDetailsData.data?.data?.service?.serviceTypeName ||
                "N/A"}
            </p>
          </div>

          <div className="space-y-1 col-span-full">
            <h3 className="text-xs font-semibold text-muted-foreground">
              Address
            </h3>
            <p className="text-sm font-medium">
              {getBookingDetailsData.data?.data?.address || "N/A"}
            </p>
          </div>
        </div>
      </Card>

      {/* Service Items Form */}
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Card className="mt-4 p-4 shadow-md">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <ClipboardList className="mr-2" size={20} /> Service Items
          </h2>

          {itemField.fields.map((field, index) => (
            <div
              key={field.id}
              className="mb-6 p-3 border rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Item #{index + 1}</h3>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => itemField.remove(index)}
                    size="sm"
                    className="h-8"
                  >
                    <Trash size={16} />
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <RHFTextField
                    name={`items[${index}].itemName`}
                    label="Item Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <RHFTextField
                      name={`items[${index}].unitPrice`}
                      label="Unit Price (₹)"
                      type="number"
                      onInput={(e) =>
                        handleUnitPriceChange(
                          index,
                          Number(e.currentTarget.value)
                        )
                      }
                    />
                  </div>

                  <div>
                    <RHFTextField
                      name={`items[${index}].quantity`}
                      label="Quantity"
                      type="number"
                      onInput={(e) =>
                        handleQuantityChange(
                          index,
                          Number(e.currentTarget.value)
                        )
                      }
                    />
                  </div>
                </div>

                <div>
                  <RHFTextField
                    name={`items[${index}].totalAmount`}
                    label="Total Amount (₹)"
                    type="number"
                    disabled
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            size="sm"
            onClick={() =>
              itemField.append({
                bookingId: id,
                itemName: "",
                quantity: 0,
                unitPrice: 0,
                totalAmount: 0,
              })
            }
            className="w-full mt-2 mb-4"
            variant="outline"
          >
            <Plus size={16} className="mr-2" /> Add Item
          </Button>
        </Card>

        {/* Summary Card */}
        <Card className="mt-4 p-4 shadow-md">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <CalculatorIcon className="mr-2" size={20} /> Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Total Items</span>
              <span className="font-semibold">{itemField.fields.length}</span>
            </div>

            {/* <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium">Unit Amount</span>
              <span className="font-semibold">₹{unitAmount.toFixed(2)}</span>
            </div> */}

            <div className="flex justify-between items-center py-2">
              <span className="text-base font-bold">Total Amount</span>
              <span className="text-lg font-bold text-primary">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full mt-4">
            Save and Continue
          </Button>
        </Card>
      </FormProviders>
    </Page>
  );
}
