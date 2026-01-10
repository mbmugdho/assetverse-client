import { useMutation } from '@tanstack/react-query'
import { submitContactForm } from '../services/contactServices'

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: submitContactForm,
  })
}