import { useInfiniteQuery } from '@tanstack/react-query'
import { type User } from '../types'
import { fetchUsers } from '../services/users'

export const useUsers = () => {
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{
      nextCursor?: number
      users: User[]
    }>(
      ['users'], //esta es la key de la query
      fetchUsers, // y esta es la funcion para traer la info
      {
        getNextPageParam: lastPage => lastPage.nextCursor, // esto se encargar de pasarle la funcion la pagina anterior, ayuda a la paginacion
        refetchOnWindowFocus: false,
      }
    )

  return {
    users: data?.pages.flatMap(page => page.users) || [],
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
  }
}
