import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { useState } from 'react';
import { Spinner } from './Spinner';
import { feedQuery, searchQuery } from '../utils/data';
import { MasonryLayout } from './MasonryLayout';

export const Feed = () => {

  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if(categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    }
  }, [categoryId]);

  if(loading) return <Spinner />

  if(!pins?.length) return <h2>Esta categoría todavia no posee contenido</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}
