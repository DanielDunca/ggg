
import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph';

import React, { useRef, useEffect } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';

import { Node, Link } from '../types';

interface Props {
  nodes: Node[];
  links: Link[];
  highlight: string;
  onNodeClick: (node: Node) => void;
}

export default function Graph({ nodes, links, highlight, onNodeClick }: Props) {

  const graphRef = useRef<ForceGraphMethods>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    graphRef.current?.d3Force('charge')?.strength(-300);
  }, []);

  return (
    <div ref={containerRef} className="flex-grow">
      {size.width > 0 && (
        <ForceGraph2D
          ref={graphRef}
          graphData={{ nodes, links }}
          nodeId="id"
          nodeAutoColorBy="kind"
          linkDirectionalParticles={1}
          linkDirectionalParticleSpeed={0.005}
          width={size.width}
          height={size.height}
          nodeLabel="id"
          onNodeClick={(node) => onNodeClick(node as Node)}
          nodeVisibility={(node) =>
            highlight === '' ||
            (node as Node).id.toLowerCase().includes(highlight.toLowerCase())
          }
        />
      )}
    </div>

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
