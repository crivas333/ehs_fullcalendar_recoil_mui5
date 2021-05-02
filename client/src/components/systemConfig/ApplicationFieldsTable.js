import React from 'react'

const ApplicationFieldsTable = props => (
  <table>
    <thead>
      <tr>
        
        <th>Campo</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {props.appFields.length > 0 ? (
        props.appFields.map(data => (
          <tr key={data.id}>
        
            <td>{data.fieldData}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(data)
                }}
                className="button muted-button"
              >
                Editar
              </button>
              <button
                onClick={() => props.deleteUser(data.id)}
                className="button muted-button"
              >
                Borrar
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No data</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default ApplicationFieldsTable