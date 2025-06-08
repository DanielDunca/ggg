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
17s1d3-codex/build-interactive-computer-science-map
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

    <div className="flex h-screen">
      <SearchBar query={query} onChange={setQuery} />
      <Graph
        nodes={nodes}
        links={links}
        highlight={query}
        onNodeClick={setSelected}
      />
      <DetailsPane node={selected} />
main
    </div>
  );
}
