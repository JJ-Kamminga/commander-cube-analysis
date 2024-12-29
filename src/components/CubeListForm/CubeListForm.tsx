import { fetchCollection } from '@/app/utils/fetchCollection';
import { Card } from '@/app/utils/types';
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

    const collectionCards = await fetchCollection([
      ...cubeList
    ]);

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
          <button type="submit">Submit</button>
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
        <button onClick={handleFetchCardData} disabled={!cubeList.length}>(Re)fetch card data.</button>
        <>
          {
            cardData.length ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Oracle text</th>
                    <th>Colors</th>
                    <th>Color identity</th>
                  </tr>
                </thead>
                <tbody>{cardData.map((card, index) => {
                  return (
                    <tr key={`${card.id}-${index}`}>
                      <td>{card.name}</td>
                      <td>Type: {card.type_line}</td>
                      <td>Oracle text: {card.oracle_text}</td>
                      <td>Colors: {card.colors}</td>
                      <td>Color identity: {card.color_identity}</td>
                    </tr>
                  )
                })}</tbody>
              </table>
            ) : (<></>)
          }
        </>
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