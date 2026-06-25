import React from "react"
import PropTypes from "prop-types"

export const SchoolRegion = ({ region }) => (
  <ul className="list-inline">
    {(region || []).map((t) => (
      <li key={t.value} className="list-inline-item badge">
        <span className="badge badge-info">{t.name}</span>
      </li>
    ))}
  </ul>
)

SchoolRegion.propTypes = {
  region: PropTypes.array,
}
