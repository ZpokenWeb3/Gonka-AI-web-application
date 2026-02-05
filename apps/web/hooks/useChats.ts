import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChats, createChat, deleteChat, getChat } from "../lib/chat";

export function useChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data?: { title?: string }) => createChat(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.setQueryData(["chat", response.data.id], response);
    },
  });
}

export function useDeleteChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => deleteChat(chatId),
    onSuccess: (_, chatId) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.removeQueries({ queryKey: ["chat", chatId] });
    },
  });
}

export function useChat(chatId: string) {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChat(chatId),
    enabled: !!chatId,
    staleTime: 1000 * 60 * 5, 
  });
}
