import React, { useState, useRef, useEffect } from 'react';
import RecommendedItems from './RecommendedItems/RecommendedItems.jsx';
import OutfitItems from './OutfitItems/OutfitItems.jsx';
import CompareModal from './CompareModal/CompareModal.jsx';
import './ItemsComponent.css';

const ItemsComponent = ({
  currItem,
  currStyles,
  currAvgRating,
  currentStyle,
  setCurrId,
  setCurrItem,
  setCurrStyles,
  setCurrAvgRating,
  setCurrentStyle,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [relatedItemData, setRelatedItemData] = useState({});
  const sectionRef = useRef();

  useEffect(() => {
    if (sectionRef.current) {
      let rect = sectionRef.current.getBoundingClientRect();
      console.log(rect.top); // log the top position
    }
  }, [sectionRef]);
  console.log({ openModal }, relatedItemData.features, currItem.features);
  return (
    <section className="items-comp--section" ref={sectionRef}>
      <RecommendedItems
        currItem={currItem}
        setCurrId={setCurrId}
        setCurrItem={setCurrItem}
        setCurrStyles={setCurrStyles}
        setCurrAvgRating={setCurrAvgRating}
        setCurrentStyle={setCurrentStyle}
        setRelatedItemData={setRelatedItemData}
        setOpenModal={setOpenModal}
      />
      <OutfitItems
        currItem={currItem}
        currStyles={currStyles}
        currentStyle={currentStyle}
        currAvgRating={currAvgRating}
      />
      {openModal && (
        <CompareModal
          currItem={currItem}
          cardItem={relatedItemData}
          setOpenModal={setOpenModal}
        />
      )}
    </section>
  );
};

export default ItemsComponent;
