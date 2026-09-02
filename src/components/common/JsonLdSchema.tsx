import React, { useEffect } from 'react';

interface JsonLdSchemaProps {
  schema: object | object[] | null;
}

export const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ schema }) => {
  useEffect(() => {
    if (!schema) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);

  return null;
};
