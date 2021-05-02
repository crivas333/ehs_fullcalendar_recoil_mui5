import React from 'react'

const ExamTable = props => (
  <table>
    <thead>
      <tr>
        
        <th>Campo</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {props.DataSource ? (
        props.DataSource.map(data => (
          <tr key={data.id}>
            <td>{data.historyId}</td>
            <td>{data.examType}</td>
            <td>{data.examStatus}</td>
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

export default ExamTable