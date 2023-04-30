import { useMemo, useState } from 'react'
import { UsersList } from './components/UserList'
import { useUsers } from './hooks/useUsers'
import { User, SortBy } from './types.d'

const App = () => {
  const { users, isLoading, isError, refetch, fetchNextPage, hasNextPage } =
    useUsers()

  // const [sortedByCountry, setSortedByCountry] = useState(false)
  //  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  // const originalUsers = useRef<User[]>([])
  // useRed -> para guardar el valor que queremos que se comparta entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente

  const toggleShowColors = () => setShowColors(!showColors)

  /*  const toggleSortByCountry = () => {
    setSortedByCountry((prevState) => !prevState)
  } */

  const toggleSortByCountry = () => {
    const newSorted = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorted)
  }

  const handleReset = () => {
    // setUsers(originalUsers.current)
    void refetch()
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  // const handleDelete = (id: string) => {
  //   // const filteredUsers = users.filter(user => user.login.uuid !== id)
  //   //setUsers(filteredUsers)
  // }

  // useEffect(() => {
  //   setLoading(true)
  //   setError(false)

  //   fetchUsers(currentPage)
  //     .then(users => {
  //       setUsers(prevUsers => {
  //         const newUsers = prevUsers.concat(users)
  //         originalUsers.current = newUsers
  //         return newUsers
  //       })
  //     })
  //     .catch(err => {
  //       setError(err)
  //       console.log(err)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [currentPage])

  // Primero filtramos los usuarios y luego los ordenamos, para que tenga un sentido y logica

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users?.filter(user => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  // asi lo haria midudev
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compararPropiedades: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
    }

    return [...filteredUsers].sort((a, b) => {
      const extraerPropiedad = compararPropiedades[sorting]
      return extraerPropiedad(a).localeCompare(extraerPropiedad(b))
    })
  }, [filteredUsers, sorting])

  // forma de hacer un sorted, segun midu no esta mal pero hay una mejor forma
  // recuerda que el sorted muta el array
  /* const sortedUsers = sortedByCountry
    ? [...filteredUsers].sort((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    : filteredUsers */

  /* const sortedUsers = useMemo(() => {
    return sortedByCountry
      ? [...filteredUsers].sort((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filteredUsers
  }, [filteredUsers, sortedByCountry]) */

  // asi lo haria ivanosquis
  /* const sortedUsers = useMemo(() => {
        if(sorting === SortBy.NONE) return filteredUsers
        if(sorting === SortBy.COUNTRY) {
          return [...filteredUsers].sort((a, b) => a.location.country.localeCompare(b.location.country) )
        }
        if(sorting === SortBy.NAME) {
          return [...filteredUsers].sort((a,b) => a.name.first.localeCompare(b.name.first) )
        }
        if(sorting === SortBy.LAST) {
          return [...filteredUsers].sort((a,b) => a.name.last.localeCompare(b.name.last) )
        }
      }, [filteredUsers, sorting]) 
  */

  /*
    const sortedUsers = useMemo(() => {
    return sorting === SortBy.COUNTRY
      ? [...filteredUsers].sort((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filteredUsers
  }, [filteredUsers, sorting])
  */

  // toSorted es lo mismo que el sorted solo que devuelve un array y no muta,
  // es un metodo recien salido del horno
  // const sortedUsers = sortedByCountry
  //  ? users.toSorted((a, b) => {
  //     return a.location.country.localeCompare(b.location.country)
  //    })
  //  : users

  return (
    <>
      <h1>Prueba Tecnica 55k</h1>
      <header>
        <button onClick={toggleShowColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? 'No ordenar por pais'
            : 'Ordenar por pais'}
        </button>
        <button onClick={handleReset}>resetear lista</button>
        <input
          onChange={e => setFilterCountry(e.target.value)}
          type='text'
          placeholder='filtra por pais'
        />
      </header>
      <main>
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            // deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}

        {isLoading && <p>Cargando usuarios!</p>}

        {isError && <p>Ha habido un error!</p>}

        {!isLoading && !isError && users.length === 0 && (
          <p>No hay usuarios!</p>
        )}

        {!isLoading && !isError && hasNextPage === true && (
          <button
            onClick={() => {
              void fetchNextPage()
            }}
          >
            Cargar más usuarios!
          </button>
        )}

        {!isLoading && !isError && hasNextPage === false && (
          <p>Ya no hay más resultados!</p>
        )}
      </main>
    </>
  )
}

export default App
