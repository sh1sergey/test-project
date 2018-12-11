import React from 'react';
import SimpleStore from 'simple-store';
import Search from 'search';

function Root() {
  return (
    <SimpleStore>
      <Search />
    </SimpleStore>
  );
}

export default Root;
