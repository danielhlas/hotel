import SortBy from 'ui/SortBy';
import Filter from 'ui/Filter';
import TableOperations from 'ui/TableOperations';

function CabinTableOperations() {
  return (
    <TableOperations>

      <Filter
        /* komponenta Filter ty propy nepřijímá ani nepoužívá -> zkusit smazat */
        filterField='discount'
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />

    </TableOperations>
  );
}

export default CabinTableOperations;
