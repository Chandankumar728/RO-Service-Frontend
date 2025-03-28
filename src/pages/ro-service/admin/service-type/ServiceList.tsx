
import { useState } from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ServiceForm from './ServiceForm'
import { useApi,  usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, roApi } from '@/lib'
import { I_SERVICE_TYPE_LIST } from './type'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import { Switch } from "@headlessui/react";
import toast from 'react-hot-toast'

export default function HomePage() {
  const [page, setPage] = useState<number>(1)
  const mutate = usePutMutation({})
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [id] = useState<string>('')
  const [edit, setEdit] = useState(false)
  const serviceTypeData = useApi<I_SERVICE_TYPE_LIST>({
    api: `${roApi.getAllService}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllServices',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })


  const handelStatusUpdate = async (serviceId: string) => {
    try {
      const result = await mutate.mutateAsync({
        api: `${roApi?.updateServiceStatus}/${serviceId}`,
        data: {
          id: id
        }
      });
      if (result?.data?.success) {
        serviceTypeData.refetch();
        if(result?.data?.data?.status==1) {
          toast.success(result.data?.message);
        }if(result?.data?.data?.status==0){
          toast.error(result.data?.message);
        }
      } else {
        toast.error(result.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <main className='flex-1'>
      <ServiceForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Role' : 'Add Role'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={serviceTypeData.refetch}
      />
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              refetch={serviceTypeData.refetch}
              isFetching={serviceTypeData.isLoading}
            />
          </div>
          <div>
            <Button
              className='flex items-center gap-2'
              onClick={() => setOpen(true)}
            >
              Add New
            </Button>
          </div>
        </div>
        {/* <Card className='w-full overflow-scroll'> */}
        <Card >
          <CardHeader className='px-7'>
            <CardDescription>
              Service List ({serviceTypeData.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {serviceTypeData.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Role Name</TableHead>
                      <TableHead className=''>Created at</TableHead>
                      <TableHead className=''>Status</TableHead>
                      {/* <TableHead>Action</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceTypeData?.data?.data?.docs?.map((item, index) => (
                      <TableRow key={item?._id}>
                        <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                        <TableCell>{item?.serviceTypeName}</TableCell>
                       
                        <TableCell>
                          {moment(item?.createdAt).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell>
                        <Switch
                            checked={item?.status == 1}
                            onChange={() => handelStatusUpdate(item._id)}
                            className={`${
                              item?.status ? "bg-primary" : "bg-gray-200"
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                item?.status ? "translate-x-6" : "translate-x-1"
                              } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
                          </Switch>
                        </TableCell>
                        {/* <TableCell>
                          <Button
                            onClick={() => handleEdit(item?._id)}
                          >
                            Edit
                          </Button>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className='mb-2 mt-4' />
                <div className='flex w-full justify-end'>
                  <PaginationComponent
                    page={page}
                    perPage={perPage}
                    totalPage={serviceTypeData?.data?.data?.totalDocs}
                    hasNextPage={serviceTypeData?.data?.data?.hasNextPage}
                    hasPrevPage={serviceTypeData?.data?.data?.hasPrevPage}
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
  )
}
