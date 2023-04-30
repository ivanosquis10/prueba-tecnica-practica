export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const API = `https://randomuser.me/api?results=10&seed=ivanosquis&page=${pageParam}`
  return await fetch(API)
    .then(async res => {
      // forma correcta de manejar los errores en fecth
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then(data => {
      // convertimos a numero la pagina que provee la api
      const currentPage = Number(data.info.page)

      // le ponemos un limite de paginacion
      const nextCursor = currentPage >= 3 ? undefined : currentPage + 1

      // devolvemos un objeto con la info necesaria, que serian los usuarios y la siguiente pagina
      return {
        users: data.results,
        nextCursor,
      }
    })
}
