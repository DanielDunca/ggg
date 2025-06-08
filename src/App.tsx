import React, { useState, useMemo } from 'react';
import data from './data/cs_map.json';
import { Node, Link } from './types';
import Graph from './components/Graph';
import SearchBar from './components/SearchBar';
import DetailsPane from './components/DetailsPane';

export default function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Node | undefined>();

  const nodes = useMemo(() => data.nodes as Node[], []);
  const links = useMemo(() => data.links as Link[], []);

  return (
    <div className="h-screen">
      <SearchBar query={query} onChange={setQuery} />
      <div className="flex h-full">
        <Graph
          nodes={nodes}
          links={links}
          highlight={query}
          onNodeClick={setSelected}
        />
        <DetailsPane node={selected} />
      </div>
    </div>
  );
}
