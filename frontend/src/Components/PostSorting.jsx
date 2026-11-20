import PropTypes from 'prop-types'

export function PostSorting({ fields = [], value, onChange, orderValue, onOrderChange }) {
  return <div className="sorting-controls"><label>Sort by<select value={value} onChange={(e) => onChange(e.target.value)}>{fields.map((field) => <option key={field} value={field}>{field.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)}</option>)}</select></label><label>Order<select value={orderValue} onChange={(e) => onOrderChange(e.target.value)}><option value="descending">Descending</option><option value="ascending">Ascending</option></select></label></div>
}
PostSorting.propTypes = { fields: PropTypes.arrayOf(PropTypes.string).isRequired, value: PropTypes.string.isRequired, onChange: PropTypes.func.isRequired, orderValue: PropTypes.string.isRequired, onOrderChange: PropTypes.func.isRequired }
