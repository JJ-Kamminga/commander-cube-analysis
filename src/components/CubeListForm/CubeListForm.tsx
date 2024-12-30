'use client';

import { fetchCollection } from '@/app/utils/fetchCollection';
import { Card } from '@/app/utils/types';
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';

const parseList = (cubeTextList: string) => {
  return cubeTextList.split('\n')
    .filter(line => line.trim() !== '')
    .filter(line => !line.startsWith('#'))
    .map(line => line.trim());
};

export const CubeListForm: React.FC = () => {
  const [cubeList, setCubeList] = useState<string[]>([]);
  const [errorLog, setErrorLog] = useState<string[]>([]);
  const [cardData, setCardData] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCubeList = async () => {
      const storedData = localStorage.getItem('latest-list');
      if (storedData) {
        setCubeList(JSON.parse(storedData));
      }
    };
    const fetchCardData = async () => {
      const storedData = localStorage.getItem('card-data');
      if (storedData) {
        setCardData(JSON.parse(storedData));
      }
    };
    fetchCubeList();
    fetchCardData();
  }, []);

  const handleFetchCardData = async () => {
    if (!cubeList.length) return;
    setLoading(true);
    const collectionCards = await fetchCollection([
      ...cubeList
    ]);
    setLoading(false);

    if (collectionCards.error) {
      setErrorLog((errorLog) => [...errorLog, `${collectionCards.error}`]
      );
    };

    if (collectionCards.notFound?.length) {
      setErrorLog(errorLog => [
        ...errorLog,
        collectionCards.notFound ? `${collectionCards.notFound.length} cards not found: ` : 'collectionCards.notFound.map(card => card.name)',
      ])
    };

    setCardData(collectionCards.cards);
    localStorage.setItem('card-data', JSON.stringify(collectionCards.cards));
    console.log(cardData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cubeList = parseList(event.target.elements["cube-list-input"].value);
    console.log(cubeList);
    setCubeList(cubeList => cubeList);
    updateData(cubeList);
  }

  const updateData = (newData) => {
    setCubeList(newData);
    localStorage.setItem('latest-list', JSON.stringify(newData)); // Update stored data
  };

  return (
    <>
      <section>
        <h2>Input cube list</h2>
        <form name="cube list input" onSubmit={handleSubmit}>
          <label htmlFor="cube-list-input">Paste in cube list</label><br />
          <textarea id="cube-list-input" rows={25} defaultValue={cubeList.join('\n')} /><br />
          <Button variant='outlined' type="submit" disabled={loading}>Submit</Button>
        </form>
      </section>
      <section>
        <h2>Fetch data from Scryfall</h2>
        <p>
          {!cubeList.length
            ? (<>Enter a cube list to fetch card data for.</>)
            : cardData.length
              ? (<>Submitted a new list? Click to refetch data.</>)
              : (<>Click to fetch card data.</>)
          }
        </p>
        <Button variant='outlined' onClick={handleFetchCardData} disabled={!cubeList.length || loading}>(Re)fetch card data.</Button>
        <TableContainer>
          {
            loading
              ? (<CircularProgress />)
              : (
                <>
                  {
                    cardData.length ? (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Oracle text</TableCell>
                            <TableCell>Colors</TableCell>
                            <TableCell>Color identity</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>{cardData.map((card, index) => {
                          return (
                            <TableRow key={`${card.id}-${index}`}>
                              <TableCell>{card.name}</TableCell>
                              <TableCell>{card.type_line}</TableCell>
                              <TableCell>{card.card_faces
                                ? card.card_faces.map(face => face.oracle_text).join(' // ')
                                : card.oracle_text
                              }
                              </TableCell>
                              <TableCell>{card.colors}</TableCell>
                              <TableCell>{card.color_identity}</TableCell>
                            </TableRow>
                          )
                        })}</TableBody>
                      </Table>
                    ) : (<></>)
                  }
                </>
              )
          }

        </TableContainer>
      </section >
      <section>
        <h2>Log</h2>
        <ul>
          {errorLog.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </section>
    </>
  )
}