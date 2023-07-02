import React from 'react';

export function DocumentSnippet({ snippet }) {
  return (
    <div className="document-snippet">
      <h3>Relevant Document Snippet</h3>
      <p>{snippet}</p>
    </div>
  );
}
