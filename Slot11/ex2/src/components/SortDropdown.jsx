import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'age-asc', label: 'Age: Low to High' },
    { value: 'age-desc', label: 'Age: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Sort by';
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown">
        {getCurrentSortLabel()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {sortOptions.map((option) => (
          <Dropdown.Item
            key={option.value}
            active={sortBy === option.value}
            onClick={() => onSortChange(option.value)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

SortDropdown.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired
};

export default SortDropdown;
