import React from "react"
import PropTypes from "prop-types"

export const SchoolLevel = ({ level }) => (
  <ul className="list-inline">
    {(level || []).map((t) => (
      <li key={t.value} className="list-inline-item badge">
        <span className="badge badge-info">{t.name}</span>
      </li>
    ))}
  </ul>
)

SchoolLevel.propTypes = {
  level: PropTypes.array,
}
