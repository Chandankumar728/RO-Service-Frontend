("");
import { useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookingForm from "./BookingForm";
import { useApi, usePutMutation } from "@/hooks/useCustomQuery";
import { getErrorMessage, roApi } from "@/lib";
import { I_BOOKING_LIST } from "./type";
import PaginationComponent from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import SearchBox from "@/components/search-box";
import Spinner from "@/components/loaders/Spinner";
import toast from "react-hot-toast";
import AssignTechnician from "./AssignTechnician";

export default function RoBooking() {
  const [page, setPage] = useState<number>(1);
  const mutate = usePutMutation({});
  const [perPage, setPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const [edit, setEdit] = useState(false);
  const [techOpen, setTechOpen] = useState(false);
  const [techEdit, setTechEdit] = useState(false);
  const [techId, setTechId] = useState("");

  const bookingData = useApi<I_BOOKING_LIST>({
    api: `${roApi.getAllBookingList}?page=${page}&limit=${perPage}&q=${search}`,
    key: "getAllBooking",
    value: [page, perPage],
    options: {
      enabled: true,
    },
  });

  const handleEdit = async (bookingId: string, techId: string) => {
    setTechEdit(true);
    setTechOpen(true);
    setId(bookingId);
    setTechId(techId);
  };

  return (
    <main className="flex-1">
      <BookingForm
        open={open}
        setOpen={setOpen}
        title={edit ? "Edit Booking" : "Add Booking"}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={bookingData.refetch}
      />
      <AssignTechnician
        open={techOpen}
        setOpen={setTechOpen}
        title={"Assigned Technician"}
        id={id}
        edit={techEdit}
        setEdit={setTechEdit}
        techId={techId ?? ""}
        refetch={bookingData.refetch}
      />
      <div className="grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2">
        <div className="flex w-full justify-between gap-2">
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              refetch={bookingData.refetch}
              isFetching={bookingData.isLoading}
            />
          </div>
          <div>
            <Button
              className="flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              Add New
            </Button>
          </div>
        </div>
        {/* <Card className='w-full overflow-scroll'> */}
        <Card>
          <CardHeader className="px-7">
            <CardDescription>
              Booking List ({bookingData.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bookingData.isLoading ? (
              <div className="flex h-32 items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">#</TableHead>
                      <TableHead className="">Application No</TableHead>
                      <TableHead className="">Full Name</TableHead>
                      <TableHead className="">Full Address</TableHead>
                      <TableHead className="">Mobile No</TableHead>
                      <TableHead className="">Additional Info</TableHead>
                      <TableHead className="">Prefered Date</TableHead>
                      <TableHead className="">Assign Technician</TableHead>
                      <TableHead className="">Assign Date</TableHead>
                      <TableHead className="">Assign Time</TableHead>
                      <TableHead className="">Created at</TableHead>
                      <TableHead className="">Status</TableHead>
                      <TableHead className="">Action</TableHead>
                      {/* <TableHead>Action</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="whitespace-nowrap">
                    {bookingData?.data?.data?.docs?.map((booking, index) => (
                      <TableRow key={booking?._id}>
                        <TableCell>
                          {page * perPage - perPage + index + 1}
                        </TableCell>
                        <TableCell>{booking?.applicationNo}</TableCell>
                        <TableCell className="font-semibold">{booking?.fullName}</TableCell>
                        <TableCell>{booking?.address}</TableCell>
                        <TableCell className="font-semibold">{booking?.phoneNumber}</TableCell>
                        <TableCell>{booking?.additionalInfo}</TableCell>
                        <TableCell>{booking?.preferredDate}</TableCell>
                        <TableCell className="text-green-600 font-semibold ">
                          {booking?.technician?.fullName ?? "Not Assigned"}
                        </TableCell>
                        <TableCell className="font-bold">
                          {booking?.assignDate ?? "Not Assigned"}
                        </TableCell>
                        <TableCell>
                          {booking?.assigntime ?? "Not Assigned"}
                        </TableCell>

                        <TableCell>
                          {moment(booking?.createdAt).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`
                              px-3 py-1 rounded-full text-white text-sm
                                ${
                                booking?.status === "Pending"
                                ? "bg-yellow-500"
                                : booking?.status === "Confirmed"
                                ? "bg-blue-500"
                                : booking?.status === "Completed"
                                ? "bg-green-500"
                                : booking?.status === "Cancelled"
                                ? "bg-red-500"
                                : "bg-gray-400"
                                }
                            `}
                          >
                            {booking?.status}
                          </span>
                        </TableCell>

                        <TableCell>
                          <Button
                            size={"sm"}
                            className="text-xs"
                            onClick={() =>
                              handleEdit(booking?._id, booking?.technician?._id)
                            }
                          >
                            Assign Technician
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className="mb-2 mt-4" />
                <div className="flex w-full justify-end">
                  <PaginationComponent
                    page={page}
                    perPage={perPage}
                    totalPage={bookingData?.data?.data?.totalDocs}
                    hasNextPage={bookingData?.data?.data?.hasNextPage}
                    hasPrevPage={bookingData?.data?.data?.hasPrevPage}
                    setPage={setPage}
                    setPerPage={setPerPage}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
