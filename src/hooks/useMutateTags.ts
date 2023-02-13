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
  const updateTagMutation = useMutation(
    (tag: Tag) =>
      axios.put<Tag>(`${process.env.REACT_APP_REST_API}/tag/${tag.id}/`, tag),
    {
      onSuccess: (res, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>(['tag'])
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            ['tag'],
            previousTags.map((tag) =>
              tag.id === variables.id ? res.data : tag
            )
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )
  const deleteTagMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_API}/tag/${id}/`),
    {
      onSuccess: (res, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>(['tags'])
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            ['tags'],
            previousTags.filter((tag) => tag.id !== variables)
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )
  return { deleteTagMutation, createTagMutation, updateTagMutation }
}
