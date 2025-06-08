import React, { useRef, useEffect } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph';
import { Node, Link } from '../types';

interface Props {
  nodes: Node[];
  links: Link[];
  highlight: string;
  onNodeClick: (node: Node) => void;
}

export default function Graph({ nodes, links, highlight, onNodeClick }: Props) {
  const ref = useRef<ForceGraphMethods>();

  useEffect(() => {
    ref.current?.d3Force('charge')?.strength(-300);
  }, []);

  return (
    <ForceGraph2D
      ref={ref}
      graphData={{ nodes, links }}
      nodeId="id"
      nodeAutoColorBy="kind"
      linkDirectionalParticles={1}
      linkDirectionalParticleSpeed={0.005}
      width={window.innerWidth - 320}
      height={window.innerHeight}
      nodeLabel="id"
      onNodeClick={(node) => onNodeClick(node as Node)}
      nodeVisibility={(node) =>
        highlight === '' ||
        (node as Node).id.toLowerCase().includes(highlight.toLowerCase())
      }
    />
  );
}
