import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Node } from '../types';

interface Props {
  node?: Node;
}

const tabs = ['overview', 'problems', 'people', 'venues', 'uvt'] as const;

export default function DetailsPane({ node }: Props) {
  const [active, setActive] = useState<(typeof tabs)[number]>('overview');

  useEffect(() => {
    setActive('overview');
  }, [node]);

  return (
    <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="mb-2 text-xl font-bold">
        {node ? node.id : 'Select a node'}
      </h2>
      {node && (
        <>
          <div className="mb-2 space-x-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`text-sm ${active === t ? 'font-bold' : ''}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-sm"
            >
              {active === 'overview' && (
                <pre>
                  {JSON.stringify(
                    {
                      activities: node.activities,
                      dependencies: node.dependencies,
                      influences: node.influences,
                    },
                    null,
                    2
                  )}
                </pre>
              )}
              {active === 'problems' && (
                <div>
                  {node.problems.map((p) => (
                    <p key={p.title} className="mb-1">
                      <strong>{p.title}</strong> ({p.status}) – {p.hint}
                    </p>
                  ))}
                </div>
              )}
              {active === 'people' && <div>{node.people.join(', ')}</div>}
              {active === 'venues' && <div>{node.venues.join(', ')}</div>}
              {active === 'uvt' && (
                <div>
                  <p>
                    <strong>People:</strong>{' '}
                    {(node.uvt?.people ?? []).join(', ')}
                  </p>
                  <p>
                    <strong>Courses:</strong>{' '}
                    {(node.uvt?.courses ?? []).join(', ')}
                  </p>
                  <p>
                    <strong>Research Groups:</strong>{' '}
                    {(node.uvt?.researchGroups ?? []).join(', ')}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
