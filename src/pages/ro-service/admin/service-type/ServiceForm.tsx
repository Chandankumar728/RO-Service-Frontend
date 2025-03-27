import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFTextArea,
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import { roApi } from '@/lib'
import { I_SERVICE_TYPE_VIEW } from './type'

const schema = yup.object().shape({
  serviceTypeName: yup.string().required('Service name is required'),
  description: yup.string().required('Description is required'),
})
type FormData = yup.InferType<typeof schema>

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  id?: string
  edit?: boolean
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  refetch?: () => void
}

export default function ServiceForm({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetch,
}: Readonly<Props>) {
  const postMutation = usePostMutation({})
  const putMutation = usePutMutation({})
  const { data, isFetching } = useApi<I_SERVICE_TYPE_VIEW>({
    api: `${roApi.getServiceById}/${id}`,
    key: 'getServiceById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: { serviceTypeName: '', description: '' },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${roApi.updateService}/${id}`,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('service not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: roApi.createService,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Service not created successfully')
        }
        methods.reset({ serviceTypeName: '' })
      }
      setOpen(false)
      setEdit!(false)
      refetch!()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (edit && data) {
      methods.reset({
        serviceTypeName: data.data.serviceTypeName,
        description: data.data.description,
      })
    } else {
      methods.reset({ serviceTypeName: '', description: '' })
    }
  }, [edit, data])

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
        <div className='grid grid-cols-1 gap-x-2 gap-y-4'>
          <div>
            <RHFTextField name='serviceTypeName' placeholder='Enter your service name' />
          </div>
          <div>
            <RHFTextArea
              name='description'
              placeholder='Enter your description'
            />
          </div>
          <Separator />
          <div>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type='submit'
              className='h-11 w-full rounded-xl'
            >
              Submit
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  )
}
