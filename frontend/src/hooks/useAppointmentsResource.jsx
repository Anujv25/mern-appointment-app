import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData, postData, updateData, deleteData } from "../services/apiService";

// Fetch appointment
export const useAppointMents = (query) => {
  return useQuery({
    queryKey: ["appointment",query],
    queryFn: () => getData(`/appointments?query=${query??""}`),
  });
};

// Add user
export const useAddAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) => postData("/appointment", newUser),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointment"] }), // Refresh user list after mutation
  });
};

// Update user
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateData(`/appointment/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointment"] }),
  });
};

// Delete user
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteData(`/appointments/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointment"] }),
  });
};
