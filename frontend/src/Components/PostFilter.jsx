import PropTypes from 'prop-types'

export function PostFilter({ field, value, onChange }) {
  return <label className="filter-control">{field}<input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={`Filter by ${field.toLowerCase()}`} /></label>
}
PostFilter.propTypes = { field: PropTypes.string.isRequired, value: PropTypes.string.isRequired, onChange: PropTypes.func.isRequired }
