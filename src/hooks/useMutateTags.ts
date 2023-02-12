import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTag, resetEditedTask } from '../slices/todoSlice'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Tag } from '../types/types'

export const useMutateTags = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const createTagMutation = useMutation(
    (tag: Omit<Tag, 'id'>) =>
      axios.post<Tag>(`${process.env.REACT_APP_REST_API}/tags/`, tag),
    {
      onSuccess: (res) => {
        const previousTags = queryClient.getQueryData<Tag[]>(['tag'])
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(['tags'], [...previousTags, res.data])
        }
        dispatch(resetEditedTag())
      },
    }
  )
}
