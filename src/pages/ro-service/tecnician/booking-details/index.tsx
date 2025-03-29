import { useParams, useNavigate } from 'react-router-dom';
import { useApi, usePostMutation } from '@/hooks/useCustomQuery';
import { getErrorMessage, roApi } from '@/lib';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import moment from 'moment';

// Components
import Page from '@/components/helmet-page';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RHFTextField, FormProviders } from '@/components/forms';
import Spinner from '@/components/loaders/Spinner';
import {
  Trash2,
  Phone,
  MessageSquare,
  ClipboardList,
  PlusCircle,
  Calculator,
  MapPin,
  Calendar,
  Tag,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { I_BOOKING_VIEW } from '../../admin/ro-booking-list/type';
import { Progress } from '@/components/ui/progress';
import CancelBooking from '@/components/cancel-booking/CancelBooking';

const schema = yup.object().shape({
  bookingId: yup.string().required('Booking id is required'),
  items: yup.array().of(
    yup.object().shape({
      bookingId: yup.string(),
      itemName: yup.string().required('Item name is required'),
      quantity: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive('Quantity must be greater than 0')
        .typeError('Quantity must be a number')
        .required('Quantity is required'),
      unitPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive('Unit price must be greater than 0')
        .typeError('Unit price must be a number')
        .required('Unit price is required'),
      totalAmount: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive('Total amount must be greater than 0')
        .typeError('Total amount must be a number')
        .required('Total amount is required')
    })
  )
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
    key: 'get-findBookingRoService-detail-view',
    value: [id],
    options: {
      enabled: !!id
    }
  });

  const methods = useForm<FormData>({
    defaultValues: {
      bookingId: id,
      items: [
        {
          bookingId: id,
          itemName: 'Service Charge',
          quantity: 1,
          unitPrice: 500,
          totalAmount: 500
        }
      ]
    },
    resolver: yupResolver(schema)
  });

  const itemField = useFieldArray({
    control: methods.control,
    name: 'items'
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await mutate.mutateAsync({
        api: roApi?.payBooking,
        data: {
          bookingId: data?.bookingId,
          items: data?.items
        }
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
      const items = methods.getValues('items');
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
    methods.setValue(`items[${index}].totalAmount` as any, newTotal);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500 text-white';
      case 'InProgress':
        return 'bg-blue-500 text-white';
      case 'Completed':
        return 'bg-emerald-500 text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="mr-1 h-4 w-4" />;
      case 'InProgress':
        return <Tag className="mr-1 h-4 w-4" />;
      case 'Completed':
        return <CheckCircle2 className="mr-1 h-4 w-4" />;
      case 'Cancelled':
        return <AlertTriangle className="mr-1 h-4 w-4" />;
      default:
        return null;
    }
  };

  const getBookingProgress = (status: string) => {
    switch (status) {
      case 'Pending':
        return 33;
      case 'InProgress':
        return 66;
      case 'Completed':
        return 100;
      case 'Cancelled':
        return 100;
      default:
        return 0;
    }
  };

  if (getBookingDetailsData.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const booking = getBookingDetailsData?.data?.data;
  const status = booking?.status || 'Pending';
  const statusProgress = getBookingProgress(status);

  return (
    <Page title="Booking Details">
      <div className="py-4">
        {/* Header with tracking info */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-5">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="font-bold flex items-center">
                  Booking #{booking?.applicationNo || 'N/A'}
                  <Badge
                    className={`ml-3 ${getStatusColor(
                      status
                    )} px-3 py-1 flex items-center`}
                  >
                    {getStatusIcon(status)}
                    {status}
                  </Badge>
                </h1>
                <p className="mt-1 opacity-90 flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Created {moment(booking?.createdAt).format('DD MMM YYYY')}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-1 flex justify-between text-xs font-medium">
              <span>Booking Created</span>
              <span>In Progress</span>
              <span>{status === 'Cancelled' ? 'Cancelled' : 'Completed'}</span>
            </div>
            <Progress
              value={statusProgress}
              className="h-2"
              style={{
                background: `linear-gradient(to right, #4f46e1 ${statusProgress}%, #e5e7eb ${statusProgress}%)`
              }}
            />
          </div>
        </div>

        {/* Two column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left column - Customer Info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-xl border-none h-full">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <h2 className="text-white font-semibold">
                  Customer Information
                </h2>
              </div>

              <CardContent className="p-6 space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {booking?.fullName || 'N/A'}
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-md bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-600"
                    >
                      <Phone size={14} className="mr-2" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-md bg-green-50 hover:bg-green-100 border-green-200 text-green-600"
                    >
                      <MessageSquare size={14} className="mr-2" />
                      Message
                    </Button>
                  </div>
                </div>

                <div className="pt-2 space-y-4 divide-y">
                  <div className="flex items-start pt-4">
                    <Phone className="mt-1 mr-3 h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Phone Number
                      </p>
                      <p className="font-medium text-sm">
                        {booking?.phoneNumber || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start pt-4">
                    <Calendar className="mt-1 mr-3 h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Appointment
                      </p>
                      <p className="font-medium text-sm">
                        {booking?.assignDate
                          ? `${moment(booking?.assignDate).format(
                              'DD MMM YYYY'
                            )} at ${booking?.aasigntime || 'N/A'}`
                          : 'Not scheduled'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start pt-4">
                    <Tag className="mt-1 mr-3 h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Service Type
                      </p>
                      <p className="font-medium text-sm">
                        {booking?.service?.serviceTypeName || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start pt-4">
                    <MapPin className="mt-1 mr-3 h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Address
                      </p>
                      <p className="font-medium text-sm">
                        {booking?.address || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Service Items & Payments */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Items Form */}
            {status === 'Pending' && (
              <FormProviders
                methods={methods}
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <Card className="border-none shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 flex justify-between items-center">
                    <h2 className="text-white text-lg font-semibold flex items-center">
                      <ClipboardList className="mr-2" size={18} /> Service Items
                    </h2>
                    <CancelBooking
                      id={id ?? ''}
                      refetch={getBookingDetailsData.refetch}
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-red-400 hover:bg-white/20 border-none text-white"
                      >
                        Cancel Booking
                      </Button>
                    </CancelBooking>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {itemField.fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="bg-white rounded-xl border border-gray-100 p-5 transition-all hover:shadow-md"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium text-gray-800 flex items-center">
                            <span className="flex items-center justify-center bg-emerald-100 text-emerald-700 h-7 w-7 rounded-full text-xs mr-2">
                              {index + 1}
                            </span>
                            Service Item
                          </h3>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => itemField.remove(index)}
                              size="sm"
                              className="h-8 w-8 p-0 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <RHFTextField
                              name={`items[${index}].itemName`}
                              label="Item Name"
                              className="bg-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <RHFTextField
                                name={`items[${index}].unitPrice`}
                                label="Unit Price (₹)"
                                type="number"
                                className="bg-white"
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
                                className="bg-white"
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
                              className="bg-white opacity-75"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() =>
                        itemField.append({
                          bookingId: id,
                          itemName: '',
                          quantity: 0,
                          unitPrice: 0,
                          totalAmount: 0
                        })
                      }
                      className="w-full mt-4"
                      variant="outline"
                    >
                      <PlusCircle size={16} className="mr-2" /> Add Another Item
                    </Button>
                  </CardContent>

                  {/* Summary Card */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-t border-indigo-100">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-indigo-100">
                        <span className="text-sm font-medium text-gray-600">
                          Total Items
                        </span>
                        <span className="font-semibold">
                          {itemField.fields.length}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-3">
                        <span className="text-base font-bold text-gray-800">
                          Total Amount
                        </span>
                        <span className="text-lg font-bold text-indigo-600">
                          ₹{totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                    >
                      <CreditCard className="mr-2" size={18} />
                      Complete Payment
                    </Button>
                  </div>
                </Card>
              </FormProviders>
            )}

            {/* Status message for Completed bookings */}
            {status === 'Completed' && (
              <Card className="border-none shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
                  <h2 className="text-white font-semibold">Booking Status</h2>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center flex-col text-center py-10">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                      <CheckCircle2 size={42} className="text-emerald-600" />
                    </div>
                    <h2 className="text-lg font-bold mb-3 text-emerald-700">
                      Booking Completed
                    </h2>
                    <p className="text-gray-600 max-w-md mb-6 text-sm">
                      This booking has been successfully completed. No further
                      actions are required.
                    </p>
                    <Button
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      onClick={() => navigate('/ro-service/tech-booking-list')}
                    >
                      View All Bookings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Status message for Cancelled bookings */}
            {status === 'Cancelled' && (
              <Card className="border-none shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                  <h2 className="text-white font-semibold">Booking Status</h2>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center flex-col text-center py-10">
                    <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                      <AlertTriangle size={42} className="text-red-600" />
                    </div>
                    <h2 className="font-bold mb-3 text-red-700">
                      Booking Cancelled
                    </h2>
                    <p className="text-gray-600 max-w-md mb-6 text-sm">
                      This booking has been cancelled. You cannot edit or delete
                      this booking.
                    </p>
                    <Button
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50"
                      onClick={() => navigate('/ro-service/tech-booking-list')}
                    >
                      View All Bookings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
