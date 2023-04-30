import { User, SortBy } from '../types.d'

interface Props {
  changeSorting: (sort: SortBy) => void
  showColors: boolean
  users: User[]
}

export const UsersList: React.FC<Props> = ({
  changeSorting,
  // deleteUser,
  showColors,
  users,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
          <th onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
          <th onClick={() => changeSorting(SortBy.COUNTRY)}>Pais</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'
          return (
            <tr key={user.login.uuid} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>
                <p> {user.name.first} </p>
              </td>
              <td>
                <p> {user.name.last} </p>
              </td>
              <td>
                <p> {user.location.country} </p>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// table, thead, tbody -> clave
// row  --> tr
// td   --> TD
